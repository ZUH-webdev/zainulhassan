import type { Post } from "./types";

export const post: Post = {
  slug: "rag-chatbot-openai-pgvector",
  shortTitle: "Building a RAG chatbot",
  title: "How to Build a RAG Chatbot for Your Business with OpenAI and pgvector",
  metaTitle: "How to Build a RAG Chatbot with pgvector",
  description:
    "Build a RAG chatbot that answers from your own content: chunking, OpenAI embeddings, pgvector search in Supabase, permission-aware retrieval and testing.",
  keyword: "rag chatbot",
  datePublished: "2026-10-17",
  dateModified: "2026-10-18",
  service: "ai-chatbot-development",
  caseStudy: "leadsmind",
  related: ["how-to-hire-an-ai-developer", "supabase-rls-mistakes", "supabase-vs-firebase"],
  intro:
    "A RAG (retrieval-augmented generation) chatbot answers questions by first searching your own content for relevant passages, then asking a language model to answer using only those passages. To build one: split your content into chunks, create embeddings with OpenAI, store them in Postgres with pgvector, retrieve the closest chunks for each question, and generate an answer with sources.",
  sections: [
    {
      id: "why-rag",
      title: "Why RAG instead of a plain chatbot",
      blocks: [
        {
          p: "A language model on its own only knows what it learned in training. It does not know your courses, policies or product documentation, and when it does not know, it may guess. RAG gives the model the relevant parts of your content at the moment it answers, so answers are grounded in your material and can link to the source.",
        },
        {
          p: "It is also cheaper and easier to keep current than fine-tuning: when your content changes, you re-embed the changed pages instead of retraining anything.",
        },
      ],
    },
    {
      id: "architecture",
      title: "The architecture",
      blocks: [
        {
          ol: [
            "**Ingest**: collect content and split it into chunks of a few hundred words, keeping the title and URL with each chunk.",
            "**Embed**: turn each chunk into a vector with an embedding model.",
            "**Store**: save chunks and vectors in Postgres using the pgvector extension.",
            "**Retrieve**: embed the user's question and find the most similar chunks the user is allowed to read.",
            "**Generate**: send the question and the retrieved chunks to a chat model with instructions to answer only from them.",
            "**Cite and log**: show sources, and log unanswered questions.",
          ],
        },
      ],
    },
    {
      id: "store",
      title: "Step 1: Store embeddings in Postgres with pgvector",
      blocks: [
        {
          p: "Supabase supports the [pgvector extension](https://supabase.com/docs/guides/database/extensions/pgvector). The vector size must match your embedding model. OpenAI's `text-embedding-3-small` returns 1,536 dimensions by default.",
        },
        {
          code: `create extension if not exists vector;

create table public.doc_chunks (
  id bigint generated always as identity primary key,
  org_id uuid not null,
  source_url text not null,
  title text,
  content text not null,
  embedding vector(1536)
);

alter table public.doc_chunks enable row level security;

create index on public.doc_chunks
  using hnsw (embedding vector_cosine_ops);`,
          lang: "sql",
        },
        {
          p: "The HNSW index keeps similarity search fast as the table grows. The `org_id` column and RLS keep each customer's knowledge base private.",
        },
      ],
    },
    {
      id: "chunking",
      title: "Chunking: the step that decides answer quality",
      blocks: [
        {
          p: "How you split content matters more than which model you pick. Chunks that are too large dilute the match with unrelated text; chunks that are too small lose the context needed to answer. A few rules that hold up in practice:",
        },
        {
          ul: [
            "Split on the content's own structure, such as headings, sections or lessons, before falling back to a fixed size.",
            "Keep a small overlap between neighbouring chunks so sentences that span a boundary are not lost.",
            "Store the title, URL and section heading with each chunk, and include them in the text you embed.",
            "Re-run your evaluation questions whenever you change the chunking, because quality can shift in either direction.",
          ],
        },
      ],
    },
    {
      id: "embed",
      title: "Step 2: Create embeddings",
      blocks: [
        {
          p: "Embed each chunk with the [OpenAI embeddings API](https://platform.openai.com/docs/guides/embeddings) and insert it. Run this on the server or in a background job, never in the browser.",
        },
        {
          code: `import OpenAI from "openai";

const openai = new OpenAI();

export async function embed(text: string) {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return res.data[0].embedding;
}`,
          lang: "ts",
        },
      ],
    },
    {
      id: "retrieve",
      title: "Step 3: Retrieve the closest chunks",
      blocks: [
        {
          p: "pgvector's `<=>` operator returns cosine distance, so smaller means more similar. A SQL function lets your app call the search through Supabase. Because it runs with the caller's permissions (the default, security invoker), RLS still filters the rows.",
        },
        {
          code: `create or replace function public.match_chunks(
  query_embedding vector(1536),
  match_count int default 5
)
returns table (id bigint, title text, source_url text, content text, similarity float)
language sql stable
as $$
  select id, title, source_url, content,
         1 - (embedding <=> query_embedding) as similarity
  from public.doc_chunks
  order by embedding <=> query_embedding
  limit match_count;
$$;`,
          lang: "sql",
        },
      ],
    },
    {
      id: "generate",
      title: "Step 4: Generate a grounded answer",
      blocks: [
        {
          p: "Send the question with the retrieved chunks, and tell the model to answer only from them and to say when the answer is not there. Ask it to reference which sources it used, then render those as links.",
        },
        {
          ul: [
            "Keep the system prompt short and specific: role, rules, and the format of the answer.",
            "Put each chunk in the prompt with its title and URL so the model can cite it.",
            "Stream the response to the interface so users see the answer as it is written.",
            "Use OpenAI or Claude for the answer. The retrieval layer does not care which model generates the text.",
          ],
        },
      ],
    },
    {
      id: "production",
      title: "Making it production-ready",
      blocks: [
        {
          ul: [
            "**Permissions**: retrieval must respect who the user is. RLS on the chunks table is the simplest reliable way. See [Supabase RLS mistakes](/blog/supabase-rls-mistakes).",
            "**Freshness**: re-embed content when it changes, with a background job.",
            "**Cost**: cache embeddings, limit chunks per prompt, and set usage limits per plan.",
            "**Evaluation**: keep a list of real questions with expected answers and check them after every change.",
            "**Fallbacks**: when similarity is low, say so and offer a human contact instead of guessing.",
          ],
        },
      ],
    },
    {
      id: "failure-modes",
      title: "Why RAG chatbots give bad answers",
      blocks: [
        {
          p: "When a RAG chatbot answers badly, the cause is usually in retrieval, not in the model. Check these before you change prompts or switch providers:",
        },
        {
          ul: [
            "**The right passage was never retrieved.** Log the chunks sent with each question. If the answer is not in them, fix chunking or the content itself before touching the prompt.",
            "**The passage was retrieved but ranked too low.** Raise the match count, or add a keyword filter alongside vector search for product names and codes, which embeddings can blur.",
            "**The content contradicts itself.** Two versions of the same policy produce two answers. Remove or mark outdated pages so only one version is embedded.",
            "**The question needs data, not documents.** \"How many orders did I place last month?\" is a database query, not a retrieval job. Route those questions to a SQL function the user is allowed to call.",
          ],
        },
        {
          p: "Each fix should be checked against your evaluation questions, so an improvement on one question does not quietly break three others.",
        },
      ],
    },
    {
      id: "in-practice",
      title: "RAG in a real product",
      blocks: [
        {
          p: "I built course Q&A with RAG inside [LeadsMind](/case-studies/leadsmind), so learners get answers grounded in the course material they are enrolled in. If you want a chatbot that answers from your own content, see my [AI chatbot development service](/services/ai-chatbot-development).",
        },
      ],
    },
  ],
  sources: [
    { label: "Supabase: pgvector extension", href: "https://supabase.com/docs/guides/database/extensions/pgvector" },
    { label: "pgvector on GitHub", href: "https://github.com/pgvector/pgvector" },
    { label: "OpenAI: Embeddings guide", href: "https://platform.openai.com/docs/guides/embeddings" },
  ],
};
