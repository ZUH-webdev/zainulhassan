/**
 * Service landing pages. One primary keyword per page (no two pages share an intent).
 * Only real facts; anything not yet confirmed is a bracketed [PLACEHOLDER: ...].
 */

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  /** Short name used in cards, footer and breadcrumbs. */
  name: string;
  keyword: string;
  /** Page title without brand suffix (33-43 chars so the full title is 50-60). */
  metaTitle: string;
  description: string;
  h1: string;
  eyebrow: string;
  /** 40-60 word answer-first paragraph. */
  intro: string;
  /** One-line summary for hub cards. */
  summary: string;
  serviceType: string;
  audienceTitle: string;
  audience: string[];
  deliverables: { title: string; text: string }[];
  stack: { name: string; why: string }[];
  engagement: string[];
  proof: { slug: string; fact: string }[];
  faqs: Faq[];
  related: string[];
  posts: string[];
};

const UPWORK_PROOF =
  "On Upwork I am Top Rated with a 100% Job Success Score, which comes from saying what I will deliver and then delivering it, milestone by milestone.";

export const ENGAGEMENT_COMMON = [
  "Fixed-price milestones through Upwork, the way I delivered LeadsMind: each milestone ends with working software you can test, plus a written progress report.",
  "[PLACEHOLDER: other engagement models you offer, e.g. hourly contracts or a monthly retainer]",
  "[PLACEHOLDER: your typical starting budget or day rate]",
];

export const AREA_NOTE =
  "I work remotely from Bahawalpur, Pakistan, and serve clients in Africa, the US and the MENA region. My working hours overlap with all three, and every project runs on written updates, so time zones never block progress.";

export const services: Service[] = [
  {
    slug: "ai-developer",
    name: "AI developer",
    keyword: "hire ai developer",
    metaTitle: "Hire an AI Developer for Your Product",
    description:
      "Hire an AI developer who ships: OpenAI and Claude API integrations, RAG over your own data, and AI features inside real SaaS products. Top Rated on Upwork.",
    h1: "Hire an AI Developer to Build and Ship Your AI Product",
    eyebrow: "AI development",
    intro:
      "I am an AI developer who builds AI features into real, paying SaaS products. I integrate the OpenAI and Claude APIs, build retrieval-augmented generation (RAG) over your own data with pgvector, and ship it with auth, billing and security done properly, from first prototype to production.",
    summary: "OpenAI and Claude integrations, RAG over your data, AI features inside production SaaS.",
    serviceType: "AI application development",
    audienceTitle: "Who hires me as their AI developer",
    audience: [
      "Founders and agencies who need AI that works inside a product, not a demo that falls apart when real users arrive. Most of my AI work sits inside full SaaS platforms, so the model call is only one part of the job: data access, permissions, cost control, latency and a clean interface matter just as much.",
      "If you already have a product, I can add AI features to your existing Next.js or React codebase. If you are starting from zero, I can build the whole AI product, from the database schema to deployment.",
    ],
    deliverables: [
      {
        title: "LLM API integration",
        text: "OpenAI and Claude API integrations with streaming responses, structured outputs, retries and sensible timeouts, wired into your product's existing auth and data model.",
      },
      {
        title: "RAG over your own content",
        text: "Retrieval-augmented generation with embeddings stored in Supabase Postgres via pgvector, so answers are grounded in your documents, courses or knowledge base instead of the model's guesses.",
      },
      {
        title: "AI content and copy tools",
        text: "Generators for ad copy, landing-page copy and other marketing content, built with prompt templates your team can adjust without a redeploy.",
      },
      {
        title: "Forecasting and recommendations",
        text: "AI-assisted forecasting and recommendation features that read from your own data, like the AI revenue forecast module I built for LeadsMind.",
      },
      {
        title: "Guardrails and cost control",
        text: "Per-user and per-organisation access checks before any data reaches a prompt, usage limits tied to plans, and logging so you can see what each feature costs.",
      },
      {
        title: "A production-ready release",
        text: "Deployed on Vercel and Supabase with environment-separated keys, error handling and a written handover, so your team can run and extend it.",
      },
    ],
    stack: [
      { name: "OpenAI API", why: "chat, structured outputs and embeddings" },
      { name: "Claude API", why: "long-context reasoning and writing tasks" },
      { name: "Supabase + pgvector", why: "vector search next to your relational data" },
      { name: "Next.js", why: "server-side AI calls that never expose API keys" },
      { name: "TypeScript", why: "typed prompts, inputs and outputs" },
      { name: "Edge Functions", why: "background jobs and webhooks close to the database" },
    ],
    engagement: [...ENGAGEMENT_COMMON, "[PLACEHOLDER: typical timeline range for an AI feature, e.g. X to Y weeks]"],
    proof: [
      { slug: "leadsmind", fact: "Built an AI suite: revenue forecasting, ad and landing copy, and course Q&A with RAG." },
      { slug: "velocity", fact: "Co-founded an AI assistant that recovers missed calls and books appointments." },
      { slug: "world-teachers-academy", fact: "Automated nightly job ingestion from Adzuna and Reed into Supabase." },
    ],
    faqs: [
      {
        q: "What does an AI developer actually build for a SaaS product?",
        a: "Usually features that read your data and produce something useful: answers grounded in your content (RAG), generated copy, summaries, forecasts or recommendations. The model call is the small part. Most of the work is data access, permissions, prompt design, cost limits and a reliable interface around it.",
      },
      {
        q: "Do you work with OpenAI, Claude, or both?",
        a: "Both. I pick the model per feature based on quality, latency and cost, and I keep the integration behind a small interface so you can switch providers later without rewriting the feature. Many products end up using more than one model for different jobs.",
      },
      {
        q: "Can you add AI to my existing app?",
        a: "Yes. Most of my AI work is added to existing Next.js and React codebases. I start by reading your data model and auth, then add the feature behind your existing permissions so users only ever see AI output built from data they are allowed to access.",
      },
      {
        q: "How do you keep our data private when using AI APIs?",
        a: "API keys stay on the server, prompts only include data the current user is allowed to see, and access is enforced in the database with Row Level Security rather than only in the UI. I also document exactly which data is sent to which provider, so you can review it.",
      },
      {
        q: "How long does an AI feature take to build?",
        a: "It depends on the data and how many screens the feature touches. A focused feature on clean data is far quicker than one that needs new pipelines. [PLACEHOLDER: your typical range, e.g. X to Y weeks]. You get a fixed scope and timeline after the discovery call.",
      },
      {
        q: "Do you work with startups outside the US?",
        a: "Yes. I work remotely from Pakistan with clients in Africa, the US and the MENA region. LeadsMind serves African businesses and World Teachers Academy is a South African business, so I am used to local payment providers and regional requirements.",
      },
    ],
    related: ["ai-chatbot-development", "saas-mvp-development", "supabase-developer"],
    posts: ["how-to-hire-an-ai-developer", "rag-chatbot-openai-pgvector"],
  },
  {
    slug: "saas-mvp-development",
    name: "SaaS MVP development",
    keyword: "mvp development for startups",
    metaTitle: "MVP Development for Startups and SaaS",
    description:
      "MVP development for startups: a production-ready SaaS first version with auth, multi-tenant data, billing and a real dashboard, built in testable milestones.",
    h1: "MVP Development for Startups: Launch a SaaS People Can Pay For",
    eyebrow: "SaaS MVP development",
    intro:
      "I build SaaS MVPs for startups: a first version real customers can sign up to, use and pay for. That means authentication, multi-tenant data, billing and a dashboard people actually want to use, built in testable milestones on Next.js and Supabase, not a throwaway demo.",
    summary: "A production-ready first version with auth, multi-tenant data, billing and a real dashboard.",
    serviceType: "SaaS MVP development",
    audienceTitle: "Who this is for",
    audience: [
      "Founders with a validated idea who need a senior developer to turn it into a product, and agencies who need a reliable builder for a client's SaaS. You might have a Figma file, a spec, or only a clear description of the problem. Any of these is a good starting point.",
      "An MVP should be small, but it should not be fragile. I keep the scope tight and the foundations solid, so version two builds on version one instead of replacing it.",
    ],
    deliverables: [
      {
        title: "Scope you can defend",
        text: "A written scope that separates what launches first from what waits, so the budget goes to the features that prove (or disprove) the idea.",
      },
      {
        title: "Auth and multi-tenancy",
        text: "Sign-up, login, teams or organisations, and roles, with tenant isolation enforced in Postgres through Row Level Security.",
      },
      {
        title: "Billing from day one",
        text: "Stripe or Paystack subscriptions, webhooks and plan gating, so you can charge your first customers as soon as you launch.",
      },
      {
        title: "A dashboard people use",
        text: "A clean, fast interface built with React, Tailwind and shadcn/ui, from the landing page to the logged-in dashboard.",
      },
      {
        title: "Optional AI features",
        text: "If AI is core to the product, I build it in from the start: OpenAI or Claude integrations and RAG over your users' data.",
      },
      {
        title: "Launch and handover",
        text: "Deployment to Vercel and Supabase, production environment setup, and documentation so you or a future hire can keep shipping.",
      },
    ],
    stack: [
      { name: "Next.js", why: "one codebase for marketing site, app and API" },
      { name: "Supabase", why: "Postgres, auth, storage and RLS in one place" },
      { name: "TypeScript", why: "fewer bugs as the MVP grows" },
      { name: "Stripe / Paystack", why: "subscriptions and plan gating" },
      { name: "Tailwind + shadcn/ui", why: "a polished interface without a design bottleneck" },
      { name: "Vercel", why: "previews for every change and simple deploys" },
    ],
    engagement: [...ENGAGEMENT_COMMON, "[PLACEHOLDER: typical MVP timeline, e.g. X to Y weeks]"],
    proof: [
      { slug: "leadsmind", fact: "Delivered an all-in-one CRM, LMS and marketing platform in milestones; the client left a 5-star review." },
      { slug: "velocity", fact: "Co-founded and built an AI product in public, now live." },
      { slug: "world-teachers-academy", fact: "Shipped a job portal with lead capture built into the apply flow." },
    ],
    faqs: [
      {
        q: "How long does it take to build a SaaS MVP?",
        a: "It depends on how many core workflows the first version needs, and how many integrations sit behind them. A single-workflow MVP is far quicker than a multi-role platform. [PLACEHOLDER: your typical MVP range, e.g. X to Y weeks]. After a discovery call you get a written scope with milestones and dates.",
      },
      {
        q: "What does an MVP include?",
        a: "The smallest set of features that lets real customers get value and pay: sign-up, the one or two workflows that solve their problem, billing and basic admin. Nice-to-haves wait until users ask for them. The foundations, like data model and security, are built properly from the start.",
      },
      {
        q: "How much does a SaaS MVP cost?",
        a: "Cost follows scope: number of user roles, workflows, integrations, AI features and design polish. I quote a fixed price per milestone once the scope is written down. [PLACEHOLDER: your typical MVP budget range]. My guide to MVP costs explains each cost driver in detail.",
      },
      {
        q: "Which payment providers do you integrate?",
        a: "Stripe and Paystack. Stripe suits most US and global products. Paystack is often the better fit for businesses selling in African markets such as Nigeria, Ghana, Kenya and South Africa. I have also migrated a live product's billing from Stripe to Paystack.",
      },
      {
        q: "Will I own the code?",
        a: "Yes. The code lives in your GitHub repository and the services run in accounts you own: Vercel, Supabase, Stripe or Paystack. You keep full access and can hand the project to any developer later.",
      },
      {
        q: "Can you work from my designs or should you design it?",
        a: "Either. I build from Figma designs, or I design a clean interface myself with Tailwind and shadcn/ui when speed matters more than a custom visual identity.",
      },
    ],
    related: ["nextjs-developer", "supabase-developer", "payments-integration"],
    posts: ["saas-mvp-cost", "what-is-mvp-in-software-development"],
  },
  {
    slug: "nextjs-developer",
    name: "Next.js developer",
    keyword: "hire nextjs developer",
    metaTitle: "Hire a Next.js Developer for Your SaaS",
    description:
      "Hire a Next.js developer with 4+ years of production experience: App Router, server components, Supabase backends and fast, accessible front ends.",
    h1: "Hire a Next.js Developer for Fast, Production-Ready SaaS",
    eyebrow: "Next.js development",
    intro:
      "I am a Next.js developer who builds complete SaaS products with the App Router, server components and TypeScript. I handle the front end, the API routes and the Supabase backend behind them, so you get one senior developer who owns the whole request, from the button click to the database row.",
    summary: "App Router, server components and TypeScript, from landing page to dashboard to API.",
    serviceType: "Next.js development",
    audienceTitle: "When to hire a Next.js developer like me",
    audience: [
      "You are starting a SaaS and want Next.js because it covers the marketing site, the app and the API in one codebase. Or you already run on Next.js and need someone senior to add features, fix performance, or clean up a codebase that grew too fast.",
      "I also take Figma-to-code work: pixel-accurate React with Tailwind and shadcn/ui that stays fast, accessible and consistent across every page.",
    ],
    deliverables: [
      {
        title: "App Router architecture",
        text: "Server components by default, client components only where interaction needs them, and data fetching that keeps pages fast and crawlable.",
      },
      {
        title: "API routes you can trust",
        text: "Typed route handlers with input validation and authorisation on every route. On LeadsMind I audited and hardened 157 of them.",
      },
      {
        title: "Figma to code",
        text: "React components built with Tailwind and shadcn/ui, matching the design and reusable across the product.",
      },
      {
        title: "Performance and SEO",
        text: "Static rendering where possible, optimised fonts and images, and metadata, sitemaps and structured data for pages that need to rank.",
      },
      {
        title: "Integrations",
        text: "Supabase, Stripe, Paystack, Resend, Twilio, OpenAI and Claude, and OAuth publishing to LinkedIn, TikTok, YouTube, Facebook and Instagram.",
      },
      {
        title: "Deploys on Vercel",
        text: "Preview deployments for every change, production environment variables kept out of the client, and a clean path to production.",
      },
    ],
    stack: [
      { name: "Next.js (App Router)", why: "my main framework for every SaaS I build" },
      { name: "React", why: "component-driven interfaces" },
      { name: "TypeScript", why: "end-to-end type safety" },
      { name: "Tailwind CSS + shadcn/ui", why: "fast, consistent UI" },
      { name: "Supabase", why: "Postgres backend with auth and RLS" },
      { name: "Vercel", why: "hosting, previews and edge network" },
    ],
    engagement: [...ENGAGEMENT_COMMON, "[PLACEHOLDER: typical timeline for a Next.js feature or build]"],
    proof: [
      { slug: "leadsmind", fact: "Audited and hardened 157 Next.js API routes, with RLS fixes across the platform." },
      { slug: "world-teachers-academy", fact: "Built a Next.js job portal with a database-backed blog replacing hardcoded content." },
      { slug: "velocity", fact: "Designed and built the product dashboard, auth and Twilio integrations." },
    ],
    faqs: [
      {
        q: "Why choose Next.js for a SaaS?",
        a: "One codebase covers the public marketing pages, which need to be fast and indexable, the logged-in app, and the server-side API. Server components keep secrets and heavy logic on the server, and Vercel makes previews and deploys simple. It is the framework I use for every SaaS I build.",
      },
      {
        q: "Can you take over an existing Next.js codebase?",
        a: "Yes. I start with a short audit: routing, data fetching, auth on API routes, and database access. You get a written list of risks and quick wins before I change anything, then I work through it in milestones.",
      },
      {
        q: "Do you use the App Router or the Pages Router?",
        a: "The App Router for new projects. For existing Pages Router apps I can either keep working in it or migrate route by route, depending on what makes sense for your timeline and budget.",
      },
      {
        q: "Do you also handle the backend?",
        a: "Yes. I usually pair Next.js with Supabase for Postgres, auth, storage and Row Level Security, and add Edge Functions or route handlers for background jobs and webhooks. You get one developer for the full stack.",
      },
      {
        q: "Do you work with startups outside the US?",
        a: "Yes. I work remotely from Pakistan with clients in Africa, the US and the MENA region, with written progress reports at every milestone so time zones never slow the project down.",
      },
    ],
    related: ["full-stack-developer", "saas-mvp-development", "supabase-developer"],
    posts: ["supabase-vs-firebase", "saas-mvp-cost"],
  },
  {
    slug: "supabase-developer",
    name: "Supabase developer",
    keyword: "hire supabase developer",
    metaTitle: "Hire a Supabase Developer and RLS Expert",
    description:
      "Hire a Supabase developer for backend builds and RLS security audits. I audited 157 API routes and fixed RLS on a live SaaS so customer data stays private.",
    h1: "Hire a Supabase Developer for Secure SaaS Backends and RLS Audits",
    eyebrow: "Supabase development",
    intro:
      "I am a Supabase developer who designs Postgres schemas, writes Row Level Security policies and audits existing Supabase projects for data leaks. On LeadsMind I audited 157 API routes and fixed RLS across the platform, so each customer's data stays theirs, enforced by the database, not just the UI.",
    summary: "Schema design, Row Level Security policies and security audits for Supabase projects.",
    serviceType: "Supabase backend development and security audit",
    audienceTitle: "Who this is for",
    audience: [
      "Teams building on Supabase who need a senior backend developer, and teams who already launched and are not sure their data is safe. Supabase exposes your database through an API, so Row Level Security is the line between one customer's data and everyone else's.",
      "If you built quickly with AI coding tools or a tight deadline, an audit is the fastest way to find out what your anon key can really read and write.",
    ],
    deliverables: [
      {
        title: "Supabase RLS security audit",
        text: "Every table, view, function and storage bucket checked against who should access it, with a written report ranked by severity.",
      },
      {
        title: "Policy fixes and tests",
        text: "Remediated policies for select, insert, update and delete, including WITH CHECK rules, and tests that prove one tenant cannot reach another's rows.",
      },
      {
        title: "API route audit",
        text: "Server routes checked for missing authorisation and for service-role keys used where a user-scoped client belongs.",
      },
      {
        title: "Schema and data model",
        text: "Postgres tables, relations, indexes and multi-tenant patterns designed for the queries your product runs most.",
      },
      {
        title: "Auth, storage and Edge Functions",
        text: "Supabase Auth flows, storage policies for private files, and Edge Functions for webhooks and scheduled jobs.",
      },
      {
        title: "Vector search",
        text: "pgvector tables and similarity search for AI features, protected by the same RLS rules as the rest of your data.",
      },
    ],
    stack: [
      { name: "Supabase", why: "Postgres, Auth, Storage, Realtime, Edge Functions" },
      { name: "PostgreSQL", why: "relational data, constraints and SQL" },
      { name: "Row Level Security", why: "tenant isolation inside the database" },
      { name: "pgvector", why: "embeddings next to your relational data" },
      { name: "Next.js", why: "server-side clients that respect RLS" },
      { name: "TypeScript", why: "generated database types" },
    ],
    engagement: [
      ...ENGAGEMENT_COMMON,
      "[PLACEHOLDER: fixed price or timeline for a Supabase RLS audit, e.g. by number of tables]",
    ],
    proof: [
      { slug: "leadsmind", fact: "157 API routes audited and hardened, with RLS fixes across the platform." },
      { slug: "world-teachers-academy", fact: "Nightly job ingestion from Adzuna and Reed into Supabase." },
      { slug: "velocity", fact: "Built the dashboard, auth and Twilio integrations for an AI voice product." },
    ],
    faqs: [
      {
        q: "What is a Supabase RLS security audit?",
        a: "A review of every table, view, function and storage bucket in your Supabase project to confirm that each user can only read and change the rows they should. I test with real user tokens and the anon key, document every gap by severity, and fix the policies.",
      },
      {
        q: "Is my Supabase data exposed if RLS is off?",
        a: "Tables in schemas exposed through the Supabase API are reachable with your public anon key. Without Row Level Security enabled and correct policies, that can mean anyone with the key can read or modify the data. Enabling RLS with no policies blocks access, so the policies must be right, not just switched on.",
      },
      {
        q: "Can you fix RLS on a live product without downtime?",
        a: "Yes. That is what I did on LeadsMind. Policies are changed in small, tested migrations, checked against the routes and features that depend on them, and rolled out one area at a time so customers are not locked out of their own data.",
      },
      {
        q: "Do you build new Supabase backends too?",
        a: "Yes. I design the schema, policies, auth flows, storage rules and Edge Functions for new products, usually alongside a Next.js front end, so security is built in rather than added later.",
      },
      {
        q: "How long does an RLS audit take?",
        a: "It scales with the number of tables, functions and API routes. [PLACEHOLDER: your typical audit timeline]. You get a written report before any fixes start, so you can prioritise.",
      },
      {
        q: "Do you work with teams outside the US?",
        a: "Yes. I work remotely from Pakistan with clients in Africa, the US and the MENA region, and every audit is delivered as a written report you can share with your team.",
      },
    ],
    related: ["nextjs-developer", "saas-mvp-development", "ai-developer"],
    posts: ["supabase-rls-mistakes", "supabase-vs-firebase"],
  },
  {
    slug: "ai-chatbot-development",
    name: "AI chatbot development",
    keyword: "ai chatbot development",
    metaTitle: "AI Chatbot Development: Custom RAG Bots",
    description:
      "AI chatbot development for businesses: custom RAG chatbots on OpenAI or Claude that answer from your own content, respect permissions and cite sources.",
    h1: "AI Chatbot Development: Custom RAG Chatbots for Your Business",
    eyebrow: "AI chatbot development",
    intro:
      "I build custom AI chatbots that answer from your own content. Using retrieval-augmented generation (RAG) with OpenAI or Claude and pgvector, the chatbot searches your documents, courses or help articles, answers with that context, and only uses data the current user is allowed to see.",
    summary: "RAG chatbots on OpenAI or Claude that answer from your content and respect permissions.",
    serviceType: "AI chatbot development",
    audienceTitle: "Who needs a custom AI chatbot",
    audience: [
      "Businesses with a lot of their own knowledge, such as course material, help docs, policies or product data, who want customers or staff to get accurate answers instantly. A generic chatbot does not know your content. A RAG chatbot does.",
      "I built course Q&A with RAG inside LeadsMind, so learners get answers grounded in the course material they are enrolled in.",
    ],
    deliverables: [
      {
        title: "Content ingestion",
        text: "Your documents, pages or database content split into chunks, embedded and stored in Supabase Postgres with pgvector, with a job to keep it in sync.",
      },
      {
        title: "Retrieval that respects permissions",
        text: "Similarity search filtered by Row Level Security, so each user only retrieves content they have access to.",
      },
      {
        title: "Answers with sources",
        text: "Responses grounded in the retrieved passages, with links to the source so users can verify and read more.",
      },
      {
        title: "Chat interface",
        text: "A streaming chat UI embedded in your app or site, built with React and matching your product's design.",
      },
      {
        title: "Guardrails",
        text: "Clear fallbacks when the answer is not in your content, limits on usage per plan, and logging of questions you cannot yet answer.",
      },
      {
        title: "Evaluation set",
        text: "A list of real questions with expected answers, used to check quality before launch and after every change.",
      },
    ],
    stack: [
      { name: "OpenAI API", why: "embeddings and chat completions" },
      { name: "Claude API", why: "long-context answers when needed" },
      { name: "pgvector", why: "vector similarity search in Postgres" },
      { name: "Supabase", why: "storage, auth and RLS for the knowledge base" },
      { name: "Next.js", why: "streaming responses from the server" },
      { name: "Edge Functions", why: "ingestion and re-embedding jobs" },
    ],
    engagement: [...ENGAGEMENT_COMMON, "[PLACEHOLDER: typical chatbot timeline, e.g. X to Y weeks]"],
    proof: [
      { slug: "leadsmind", fact: "Built course Q&A with RAG as part of an AI module suite." },
      { slug: "velocity", fact: "Co-founded an AI assistant that replies to missed calls in seconds." },
      { slug: "world-teachers-academy", fact: "Built the data pipelines that keep job content fresh nightly." },
    ],
    faqs: [
      {
        q: "What is a RAG chatbot?",
        a: "A chatbot that retrieves relevant passages from your own content before answering, then asks the language model to answer using those passages. It keeps answers grounded in your material, reduces made-up answers, and lets the chatbot show where each answer came from.",
      },
      {
        q: "Which AI models do you use for chatbots?",
        a: "OpenAI and Claude models, chosen per project for answer quality, speed and cost. Embeddings and chat can come from different providers, and I keep the integration swappable so you are not locked into one vendor.",
      },
      {
        q: "Can the chatbot answer from private or per-customer data?",
        a: "Yes. Content is stored in Supabase with Row Level Security, so retrieval only returns passages the signed-in user is allowed to read. This is the same approach I use for multi-tenant SaaS data.",
      },
      {
        q: "What happens when the answer is not in our content?",
        a: "The chatbot says it does not know and suggests a next step, such as contacting support, instead of inventing an answer. Unanswered questions are logged so you can see which content to add.",
      },
      {
        q: "How long does it take to build a custom AI chatbot?",
        a: "It depends mostly on how clean and accessible your content is, and where the chatbot needs to live. [PLACEHOLDER: your typical chatbot timeline]. You get a fixed scope after the discovery call.",
      },
      {
        q: "Do you work with businesses outside the US?",
        a: "Yes. I work remotely from Pakistan with clients in Africa, the US and the MENA region.",
      },
    ],
    related: ["ai-developer", "supabase-developer", "saas-mvp-development"],
    posts: ["rag-chatbot-openai-pgvector", "how-to-hire-an-ai-developer"],
  },
  {
    slug: "full-stack-developer",
    name: "Full stack developer",
    keyword: "hire full stack developer",
    metaTitle: "Hire a Full Stack Developer for SaaS",
    description:
      "Hire a senior full stack developer for your SaaS: React and Next.js front ends, Supabase and Node.js backends, payments and deploys. Top Rated on Upwork.",
    h1: "Hire a Senior Full Stack Developer for Your SaaS",
    eyebrow: "Full stack development",
    intro:
      "I am a senior full stack developer for founders and agencies. I build the React and Next.js front end, the Node.js and Supabase backend, the payments and the deploys, so one person owns your product end to end. I also act as a technical co-founder when you need architecture and roadmap decisions.",
    summary: "React and Next.js front ends, Supabase and Node.js backends, payments and deploys.",
    serviceType: "Full stack web development",
    audienceTitle: "Who hires a full stack developer like me",
    audience: [
      "Founders who need one senior developer instead of a team, and agencies who need a dependable builder they can hand a whole project to. You get one point of contact who understands the database, the API and the interface, so decisions are fast and nothing falls between two developers.",
      "For founders without a technical partner, I can also help with architecture decisions, the roadmap and hiring input, and keep building hands-on.",
    ],
    deliverables: [
      {
        title: "Front end",
        text: "React and Next.js interfaces built from Figma or designed with Tailwind and shadcn/ui: fast, accessible and consistent.",
      },
      {
        title: "Backend and database",
        text: "Supabase and PostgreSQL schemas, Row Level Security, Node.js services and API routes with authorisation on every request.",
      },
      {
        title: "Payments and billing",
        text: "Stripe and Paystack subscriptions, webhooks and plan gating, including billing migrations on live products.",
      },
      {
        title: "Integrations",
        text: "Email with Resend, voice and SMS with Twilio, social OAuth publishing, job feeds like Adzuna and Reed, and AI APIs.",
      },
      {
        title: "Security",
        text: "API route audits and RLS reviews so customer data stays private, the work I did across 157 routes on LeadsMind.",
      },
      {
        title: "Technical co-founder support",
        text: "Architecture decisions, roadmap planning and hiring input for founders who need a senior technical partner.",
      },
    ],
    stack: [
      { name: "React + Next.js", why: "front end and server rendering" },
      { name: "TypeScript", why: "one typed language across the stack" },
      { name: "Node.js", why: "services, scripts and integrations" },
      { name: "Supabase + PostgreSQL", why: "data, auth, storage and RLS" },
      { name: "Stripe / Paystack", why: "payments and subscriptions" },
      { name: "Vercel", why: "deploys and preview environments" },
    ],
    engagement: [...ENGAGEMENT_COMMON, "[PLACEHOLDER: availability, e.g. hours per week you can commit]"],
    proof: [
      { slug: "leadsmind", fact: "Full stack delivery of CRM, LMS, funnels, WhatsApp broadcasts and social publishing." },
      { slug: "world-teachers-academy", fact: "End-to-end job portal with ingestion, lead capture and a blog." },
      { slug: "velocity", fact: "Co-founded and built an AI product, from dashboard to Twilio integration." },
    ],
    faqs: [
      {
        q: "What does a full stack developer do?",
        a: "A full stack developer builds both the parts users see, the front end, and the parts they do not, such as the API, database and integrations. For a SaaS that means one person can take a feature from the database schema to the button that uses it, without hand-offs.",
      },
      {
        q: "Should I hire a full stack developer or a team?",
        a: "For an MVP or a product with a focused roadmap, one senior full stack developer is usually faster and cheaper than a team, because there is no coordination overhead. A team makes sense when parallel workstreams are truly needed.",
      },
      {
        q: "Do you also work as a React developer only?",
        a: "Yes. I take front-end-only work in React and Next.js, including Figma-to-code builds with Tailwind and shadcn/ui, for agencies and product teams that already have a backend.",
      },
      {
        q: "How do you communicate progress?",
        a: "Working software at every milestone, plus a written progress report covering what shipped, what is next and any decisions I need from you. You always know where things stand.",
      },
      {
        q: "Do you work with clients outside the US?",
        a: "Yes. I work remotely from Pakistan with clients in Africa, the US and the MENA region.",
      },
    ],
    related: ["nextjs-developer", "saas-mvp-development", "payments-integration"],
    posts: ["saas-mvp-cost", "supabase-vs-firebase"],
  },
  {
    slug: "payments-integration",
    name: "Payments integration",
    keyword: "stripe and paystack integration developer",
    metaTitle: "Stripe and Paystack Integration Developer",
    description:
      "Stripe and Paystack integration developer for SaaS billing: subscriptions, webhooks, plan gating and migrations, including a live Stripe to Paystack move.",
    h1: "Stripe and Paystack Integration for SaaS Billing",
    eyebrow: "Payments integration",
    intro:
      "I integrate Stripe and Paystack into SaaS products: subscriptions, webhooks, plan gating and customer billing screens. I have migrated a live product's billing from Stripe to Paystack, so I know how to move paying customers between providers without breaking access to the features they pay for.",
    summary: "Subscriptions, webhooks, plan gating and billing migrations on Stripe and Paystack.",
    serviceType: "Payment gateway integration",
    audienceTitle: "Who this is for",
    audience: [
      "SaaS teams adding billing for the first time, and products selling into African markets where Paystack is often the better fit for local cards, bank transfers and currencies. Billing touches signup, access control and support, so it needs to be built carefully.",
      "If you are planning to switch providers, I can plan and run the migration so customers keep access throughout.",
    ],
    deliverables: [
      {
        title: "Subscriptions and plans",
        text: "Plans, trials and recurring billing set up in Stripe or Paystack and mirrored in your database.",
      },
      {
        title: "Webhooks done right",
        text: "Signature-verified webhook handlers that update subscription status reliably, safe to receive the same event twice.",
      },
      {
        title: "Plan gating",
        text: "Feature access tied to the customer's current plan, enforced on the server and in the database, not only in the UI.",
      },
      {
        title: "Checkout and billing UI",
        text: "Checkout flows, upgrade and downgrade, invoices and a billing page customers can manage themselves.",
      },
      {
        title: "Billing migrations",
        text: "A tested plan to move customers between providers, like the Stripe-to-Paystack migration I delivered for LeadsMind.",
      },
      {
        title: "Multi-currency setup",
        text: "Prices and currencies configured for where your customers are, with the provider that supports them.",
      },
    ],
    stack: [
      { name: "Stripe", why: "global subscriptions and Billing" },
      { name: "Paystack", why: "African cards, transfers and local currencies" },
      { name: "Next.js route handlers", why: "secure checkout and webhooks" },
      { name: "Supabase", why: "subscription state and RLS-based access" },
      { name: "Edge Functions", why: "scheduled billing jobs" },
      { name: "TypeScript", why: "typed events and payloads" },
    ],
    engagement: [...ENGAGEMENT_COMMON, "[PLACEHOLDER: typical billing integration timeline]"],
    proof: [
      { slug: "leadsmind", fact: "Migrated a live SaaS's billing from Stripe to Paystack." },
      { slug: "velocity", fact: "Co-founded and shipped an AI product, from dashboard and auth to Twilio integrations." },
      { slug: "world-teachers-academy", fact: "Built lead capture into a South African business's apply flow." },
    ],
    faqs: [
      {
        q: "Should I use Stripe or Paystack for my SaaS?",
        a: "If your business and most customers are in Africa, especially Nigeria, Ghana, Kenya or South Africa, Paystack usually supports the local payment methods and currencies your customers expect. Stripe offers broader global coverage and more advanced billing features. My Stripe vs Paystack guide compares them in detail.",
      },
      {
        q: "Can you migrate my subscriptions from Stripe to Paystack?",
        a: "Yes, I have done it on a live product. A migration needs a plan for each customer's next payment, because saved card details cannot simply be copied between providers. I map plans, update your database and webhooks, and move customers in a controlled order.",
      },
      {
        q: "Do you handle webhooks and failed payments?",
        a: "Yes. Webhooks are verified, idempotent and update subscription status in your database. Failed payments move customers through a grace period and clear messaging rather than an instant lockout, based on the rules you choose.",
      },
      {
        q: "Which payment providers do you integrate?",
        a: "Stripe and Paystack, the two providers I use in production. If you need another provider, tell me in the discovery call and I will be clear about whether I have used it before.",
      },
      {
        q: "Do you work with businesses outside Africa?",
        a: "Yes. I serve clients in Africa, the US and the MENA region, and Stripe covers most products sold internationally.",
      },
    ],
    related: ["saas-mvp-development", "full-stack-developer", "supabase-developer"],
    posts: ["stripe-vs-paystack", "saas-mvp-cost"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const UPWORK_FACTS = UPWORK_PROOF;
