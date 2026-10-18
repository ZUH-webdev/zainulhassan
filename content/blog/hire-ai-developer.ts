import type { Post } from "./types";

export const post: Post = {
  slug: "how-to-hire-an-ai-developer",
  title: "How to Hire an AI Developer: What to Look For and What to Avoid",
  metaTitle: "How to Hire an AI Developer: What to Check",
  description:
    "How to hire an AI developer who ships: the skills that matter beyond prompts, questions to ask, red flags to avoid, and how to start with a small milestone.",
  keyword: "how to hire an ai developer",
  datePublished: "2026-10-17",
  dateModified: "2026-10-18",
  service: "ai-developer",
  related: ["rag-chatbot-openai-pgvector", "saas-mvp-cost", "what-is-mvp-in-software-development"],
  intro:
    "To hire an AI developer who ships, look for someone who has put AI features into products real users pay for, not only demos. The model call is the easy part. The skills that matter are data access and permissions, retrieval over your own content, cost control, evaluation and a reliable interface around the AI. Start with a small paid milestone to prove it.",
  sections: [
    {
      id: "what-ai-developers-do",
      title: "What an AI developer actually does",
      blocks: [
        {
          p: "For most businesses, \"AI developer\" does not mean someone who trains models from scratch. It means an engineer who builds products on top of models from providers such as OpenAI and Anthropic: chatbots grounded in your content, writing and analysis tools, classifiers, forecasting and automations.",
        },
        {
          p: "That work is mostly software engineering. The developer connects the model to your data, decides what each user is allowed to send it, handles failures and slow responses, keeps costs predictable, and builds the screens people use. A great prompt inside a fragile product is still a fragile product.",
        },
      ],
    },
    {
      id: "skills",
      title: "Skills to look for",
      blocks: [
        {
          ul: [
            "**Shipped AI features in production.** Ask for live products, not notebooks.",
            "**Retrieval-augmented generation (RAG).** Embeddings, vector search and grounding answers in your data. See [how a RAG chatbot works](/blog/rag-chatbot-openai-pgvector).",
            "**Security and permissions.** AI must only see data the current user can access. In Supabase this means [Row Level Security](/blog/supabase-rls-mistakes).",
            "**Model-agnostic design.** The ability to switch between OpenAI and Claude models as quality and prices change.",
            "**Cost awareness.** Token budgets, caching and usage limits per plan.",
            "**Evaluation.** A repeatable way to check answer quality before and after changes.",
            "**Full stack skills.** Someone who can also build the interface, API and database ships faster than a specialist who needs a team around them.",
          ],
        },
      ],
    },
    {
      id: "questions",
      title: "Questions to ask before you hire",
      blocks: [
        {
          ol: [
            "Show me an AI feature you built that real users use. What went wrong after launch?",
            "How do you stop the AI from seeing data a user should not access?",
            "How would you ground answers in our content, and what happens when the answer is not there?",
            "How do you estimate and control monthly AI costs?",
            "How would you test that a prompt change made answers better, not worse?",
            "Which parts would you build first, and what would you leave out of version one?",
          ],
        },
        {
          p: "Good answers are specific and mention trade-offs. Vague answers about \"leveraging cutting-edge AI\" are a warning sign.",
        },
      ],
    },
    {
      id: "red-flags",
      title: "Red flags to avoid",
      blocks: [
        {
          ul: [
            "Only demos and tutorials in the portfolio, no products with users.",
            "Promising perfect accuracy. Language models make mistakes, and good developers design for it.",
            "API keys in front-end code, or plans to send your whole database to a model.",
            "Suggesting fine-tuning or custom models before trying retrieval on your existing content.",
            "No written scope, milestones or way to measure success.",
          ],
        },
      ],
    },
    {
      id: "evaluate-portfolio",
      title: "How to evaluate an AI portfolio",
      blocks: [
        {
          p: "A portfolio of AI work is easy to fake with screenshots of a chat window. Look for evidence that the work survived contact with real users:",
        },
        {
          ul: [
            "**A live product you can use**, or a case study that names the product, the problem and what changed.",
            "**The boring parts described**: authentication, permissions, billing, error handling. Developers who mention them have shipped.",
            "**Specific technical choices with reasons**, such as why retrieval instead of fine-tuning, or why one model for a task and another for a different one.",
            "**Client feedback tied to delivery**: on Upwork, look at job success scores and whether reviews mention deadlines and communication, not only skill.",
          ],
        },
        {
          p: "Ask the developer to walk you through one feature from database to screen. The way they explain trade-offs tells you more than the demo does.",
        },
      ],
    },
    {
      id: "first-week",
      title: "What a good first week looks like",
      blocks: [
        {
          p: "A strong AI developer spends the first days understanding your data and users, not writing prompts. Expect questions about where the content lives, who can see what, and what a good answer looks like. By the end of the first milestone you should have something you can try with your own data, a short written summary of what works and what does not yet, and a clear plan for the next step.",
        },
      ],
    },
    {
      id: "where-to-hire",
      title: "Where to hire an AI developer",
      blocks: [
        {
          p: "Freelance marketplaces such as Upwork let you see verified work history, client reviews and job success scores, and pay in milestones with escrow. Vetted talent networks pre-screen developers for a premium. Agencies give you a team, at agency rates and with more coordination.",
        },
        {
          p: "For a focused AI feature or an AI-first MVP, one senior full stack developer with production AI experience is usually the fastest route: one person owns the data, the model integration and the interface.",
        },
      ],
    },
    {
      id: "start-small",
      title: "Start with a small, paid milestone",
      blocks: [
        {
          p: "The lowest-risk way to hire is a paid first milestone with a clear deliverable, such as a working retrieval prototype on a slice of your real content. You learn how the developer communicates, how they handle ambiguity and whether the AI can do the job, before committing the full budget.",
        },
        {
          p: "That is how I work: milestone-based contracts, each ending with working software and a written progress report. I am Top Rated on Upwork with a 100% Job Success Score, and I have built AI features into production SaaS, including forecasting, copy generation and course Q&A with RAG for [LeadsMind](/case-studies/leadsmind). If you are looking to hire, see my [AI developer service](/services/ai-developer).",
        },
      ],
    },
  ],
  sources: [
    { label: "OpenAI API documentation", href: "https://platform.openai.com/docs" },
    { label: "Anthropic Claude documentation", href: "https://docs.anthropic.com/" },
  ],
};
