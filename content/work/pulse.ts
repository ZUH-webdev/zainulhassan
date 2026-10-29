import type { CaseStudy } from "./types";

export const pulse: CaseStudy = {
  slug: "pulse",
  title: "Pulse",
  metaTitle: "Pulse: AI Customer Feedback Hub Case Study",
  metaDescription:
    "Pulse is a concept SaaS that uses AI to cluster scattered customer feedback into ranked product decisions. The problem, architecture and key trade-offs.",
  badge: "Concept project",
  pitch: "An AI feedback hub that turns scattered customer comments into clear, ranked product decisions.",
  type: "Concept SaaS",
  role: "Product design and full-stack development",
  timeline: "",
  stack: ["Next.js", "TypeScript", "Supabase (Postgres, Auth, RLS)", "OpenAI API", "Stripe", "Tailwind CSS"],
  demoUrl: "",
  images: [],
  problem:
    "Product teams collect feedback in support inboxes, reviews, surveys and chat, then lose it. Nobody has time to read hundreds of comments, so decisions get made on whoever shouted loudest. Pulse explores how a small team could see what customers actually want, in one place, without reading everything by hand.",
  features: [
    { title: "One feedback inbox", description: "Collect comments from forms, email forwarding and CSV import into a single searchable stream." },
    { title: "AI theme clustering", description: "Similar comments are grouped into themes automatically, with a plain-language summary for each." },
    { title: "Sentiment and urgency scoring", description: "Every item is scored so churn risks and urgent bugs rise to the top." },
    { title: "Ranked roadmap view", description: "Themes are ranked by volume, sentiment and customer value so the team can see what to build next." },
    { title: "Team workspaces", description: "Multi-tenant workspaces with role-based access, enforced at the database level with row level security." },
    { title: "Subscription billing", description: "Plan limits and upgrades handled through Stripe, with usage checks on the server." },
  ],
  architecture:
    "Next.js App Router frontend and API routes on top of Supabase Postgres. Each workspace's data is isolated by row level security policies. Incoming feedback is stored first, then processed asynchronously: embeddings are generated and stored with pgvector, similar items are clustered, and an LLM writes the theme summaries. Stripe webhooks keep plan state in sync.",
  decisions: [
    { title: "Row level security over app-only checks", why: "Tenant isolation lives in the database, so a bug in an API route cannot leak another workspace's data." },
    { title: "Process feedback asynchronously", why: "AI calls are slow and can fail, so ingestion stays instant and analysis retries in the background." },
    { title: "Embeddings plus an LLM summary", why: "Embeddings group comments cheaply and consistently, and the LLM is used only where language quality matters." },
  ],
  challenges: [
    { challenge: "Themes that kept changing as new feedback arrived.", solution: "Assign new items to existing themes first and only create a new theme when similarity falls below a threshold." },
    { challenge: "Keeping AI costs predictable.", solution: "Batch requests, cache results by content hash, and enforce monthly usage limits per plan." },
  ],
  roadmap: [
    "Integrations with helpdesk and review platforms",
    "Weekly digest emails with the top rising themes",
    "Public voting board for customers",
  ],
};
