/**
 * Service landing pages. One primary search intent per page, and no two pages share a
 * paragraph, heading or FAQ (scripts/seo-check.mts fails the build if they do).
 * Only real facts: no prices, rates, timelines, client names or results that are not on the site.
 */

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  /** Short name used in cards, footer, nav and breadcrumbs. */
  name: string;
  keyword: string;
  /** Page title without brand suffix (at most 42 chars, so the full title stays under 60). */
  metaTitle: string;
  /** Meta description, under 155 chars. */
  description: string;
  h1: string;
  eyebrow: string;
  /** Answer-first intro: who the service is for and the problem it solves. */
  intro: string;
  /** One-line summary for the /services hub and other cards. */
  summary: string;
  serviceType: string;
  audienceTitle: string;
  audience: string[];
  deliverTitle: string;
  /** 5 to 7 concrete deliverables. */
  deliverables: { title: string; text: string }[];
  processTitle: string;
  /** Exactly four steps (the animated process timeline has four slots). */
  process: { title: string; body: string }[];
  stackTitle: string;
  /** Only technologies relevant to this service. */
  stack: { name: string; why: string }[];
  workTitle: string;
  /** The 1 or 2 most relevant case studies, with the fact that makes them relevant. */
  work: { slug: string; fact: string }[];
  faqTitle: string;
  /** Exactly five, unique to this service. */
  faqs: Faq[];
  relatedTitle: string;
  /** 2 or 3 other services, each with descriptive anchor text. */
  related: { slug: string; anchor: string; text: string }[];
  /** Guide(s) linked from the related block. */
  posts: string[];
  /** Closing call to action heading and line. */
  cta: string;
  ctaText: string;
  /** Last substantive content change (sitemap lastModified). */
  dateModified: string;
};

export const AREA_NOTE =
  "I work remotely from Pakistan, with clients in Africa, the US and the MENA region. Every project runs on written progress reports, so decisions do not wait for a shared working hour.";

export const services: Service[] = [
  {
    slug: "ai-developer",
    name: "AI developer",
    keyword: "hire ai developer",
    metaTitle: "Hire an AI Developer for OpenAI and Claude",
    description:
      "Hire an AI developer to add OpenAI and Claude features to your SaaS: answers from your data, generated content and forecasts, with permissions and limits.",
    h1: "Hire an AI Developer to Add OpenAI and Claude to Your Product",
    eyebrow: "AI development",
    intro:
      "This service is for SaaS founders and product teams who want AI to do real work inside their product, not sit beside it as a demo. I add OpenAI and Claude features that read your own data, respect each user's permissions and stay within a budget you set, then ship them to production on your existing stack.",
    summary: "OpenAI and Claude features built into an existing SaaS, wired to your data, permissions and plan limits.",
    serviceType: "AI application development",
    audienceTitle: "Teams that need AI to work inside the product",
    audience: [
      "Most AI requests I get start the same way: a prototype answers well in a playground, then falls apart once it meets real accounts, real data and real usage. The model call is rarely the hard part. The hard parts are deciding which data each prompt may include, keeping latency acceptable, logging what each feature costs and giving users an interface they trust.",
      "I am a good fit if you already run a Next.js or React product and want AI features added to it, or if AI is one important part of a wider SaaS you are planning. If what you need is mainly a conversational assistant that answers from your documents, my AI chatbot development service is the closer match.",
    ],
    deliverTitle: "AI features, from first prompt to production",
    deliverables: [
      {
        title: "Feature design on your real data",
        text: "A short written design for each AI feature: what it reads, what it produces, which model handles it and how users correct a wrong result.",
      },
      {
        title: "OpenAI and Claude integration",
        text: "Server-side calls with streaming, structured outputs checked against a schema, retries and timeouts, so a slow model never freezes your interface.",
      },
      {
        title: "Content and copy generation",
        text: "Generators for ad copy, landing-page text and summaries, with prompt templates stored as data so your team can tune them without a deploy.",
      },
      {
        title: "Forecasts and recommendations",
        text: "Features that read your own records and return a forecast or a suggested next action, like the AI revenue forecast module I built for LeadsMind.",
      },
      {
        title: "Permission-aware prompts",
        text: "Every prompt is assembled on the server from data the signed-in user may read, enforced by Row Level Security in the database rather than by the UI.",
      },
      {
        title: "Usage limits and cost logging",
        text: "Per-plan limits, a log of the model and tokens behind each request, and a simple view of what every feature costs to run.",
      },
    ],
    processTitle: "How an AI feature goes from idea to release",
    process: [
      {
        title: "Pick one job for the model",
        body: "We choose a single, testable job, such as drafting an ad from a product record, and write down what a good and a bad output look like.",
      },
      {
        title: "Prototype on your data",
        body: "I wire the feature to a copy of your real data behind a plain screen, so you judge output quality before any interface work starts.",
      },
      {
        title: "Harden the integration",
        body: "Model calls move behind a small provider-agnostic interface with validation, permission checks, usage limits and logging.",
      },
      {
        title: "Release and review",
        body: "The feature goes live for a few accounts first, and we review logged outputs and costs together before opening it to everyone.",
      },
    ],
    stackTitle: "Tools I use for AI features",
    stack: [
      { name: "OpenAI API", why: "chat, structured outputs and embeddings" },
      { name: "Claude API", why: "long documents and careful writing tasks" },
      { name: "Next.js route handlers", why: "model calls that keep API keys on the server" },
      { name: "Supabase + pgvector", why: "embeddings stored beside your relational data" },
      { name: "TypeScript", why: "typed prompt inputs and validated outputs" },
      { name: "Supabase Edge Functions", why: "background jobs for slow or batch AI work" },
    ],
    workTitle: "AI work I have shipped",
    work: [
      { slug: "leadsmind", fact: "Built the LeadsMind AI suite: revenue forecasting, ad and landing-page copy, and course Q&A with RAG." },
      { slug: "velocity", fact: "Co-founded Velocity, an AI product that follows up missed calls and moves callers towards a booked appointment." },
    ],
    faqTitle: "Questions about hiring an AI developer",
    faqs: [
      {
        q: "Can you add AI to the product we already have?",
        a: "Yes, and that is most of my AI work. I start by reading your data model and how authentication works, then add the feature inside your existing Next.js or React codebase. Users only ever see AI output built from records they are already allowed to access.",
      },
      {
        q: "Should we use OpenAI or Claude?",
        a: "It depends on the job. I compare both on a small set of your real inputs for quality, speed and cost, then pick per feature. The integration sits behind one interface, so switching later is a configuration change rather than a rewrite.",
      },
      {
        q: "How do you stop the AI from leaking another customer's data?",
        a: "Prompts are built on the server, never in the browser, and only from rows the current user can read under Row Level Security. API keys stay in server environment variables. I also document which fields go to which provider, so you can review it.",
      },
      {
        q: "How do you scope an AI feature before knowing how well it will work?",
        a: "The first milestone is a prototype on your real data with a written pass-or-fail definition. If the output is not good enough, you find out early and cheaply, and we change the approach or stop before the larger build starts.",
      },
      {
        q: "What do we receive at handover?",
        a: "The code in your repository, prompts stored where your team can edit them, provider keys in your own accounts, a note on what each feature costs to run, and a written guide to changing models or prompts safely.",
      },
    ],
    relatedTitle: "Other ways I can help with AI and data",
    related: [
      {
        slug: "ai-chatbot-development",
        anchor: "Custom RAG chatbot development",
        text: "For a chat assistant that answers questions from your own documents and cites them.",
      },
      {
        slug: "supabase-developer",
        anchor: "Supabase backend and RLS security",
        text: "For the secure Postgres backend that decides what data each AI feature may read.",
      },
      {
        slug: "saas-mvp-development",
        anchor: "SaaS MVP development with AI built in",
        text: "For a new AI product that still needs sign-up, billing and a dashboard to launch.",
      },
    ],
    posts: ["how-to-hire-an-ai-developer"],
    cta: "Have an AI feature in mind? Let's scope it.",
    ctaText: "Describe the feature and the data it would use. I reply within one working day with questions or a first approach.",
    dateModified: "2026-10-30",
  },
  {
    slug: "ai-chatbot-development",
    name: "AI chatbot development",
    keyword: "ai chatbot development",
    metaTitle: "AI Chatbot Development: Custom RAG Bots",
    description:
      "AI chatbot development: custom RAG chatbots on OpenAI or Claude that answer from your documents, cite sources and only use content each user may see.",
    h1: "AI Chatbot Development: RAG Chatbots That Answer From Your Content",
    eyebrow: "AI chatbot development",
    intro:
      "This service is for businesses whose customers or staff keep asking questions that are already answered somewhere in their own material: course content, help articles, policies or product data. I build a retrieval-augmented (RAG) chatbot that finds the right passages first, answers from them with OpenAI or Claude, and shows where each answer came from.",
    summary: "RAG chatbots that search your own documents first, answer with OpenAI or Claude and cite their sources.",
    serviceType: "AI chatbot development",
    audienceTitle: "When a generic chatbot is not enough",
    audience: [
      "An off-the-shelf chatbot knows the internet, not your business. Ask it about your refund policy, your course syllabus or your product limits and it will guess, confidently. A RAG chatbot works differently: it searches your content for the passages that match the question, answers only from them, and says so when the answer is not there.",
      "Typical uses are a learner assistant inside a course platform, a help-centre assistant on a website, and an internal assistant that answers staff questions from policy documents. I built course Q&A with RAG inside the LeadsMind LMS, where each learner gets answers grounded in the material of the course they are enrolled in.",
    ],
    deliverTitle: "What your chatbot project includes",
    deliverables: [
      {
        title: "Content inventory and chunking",
        text: "A list of every source the chatbot should read, and a chunking approach suited to it, so headings, lists and tables survive the split.",
      },
      {
        title: "Embedding and sync pipeline",
        text: "Content embedded and stored in Supabase Postgres with pgvector, plus a sync job that re-embeds only the passages that changed.",
      },
      {
        title: "Permission-filtered retrieval",
        text: "Search that respects Row Level Security, so a learner, customer or employee only retrieves passages they are allowed to read.",
      },
      {
        title: "Cited answers",
        text: "Responses that link back to the passages they used, so people can check the source and read further.",
      },
      {
        title: "An honest fallback",
        text: "When retrieval finds nothing relevant, the chatbot says it does not know and offers a next step, and the question is logged.",
      },
      {
        title: "A streaming chat window",
        text: "A React chat interface that streams answers as they are written, embedded in your app or site and styled to match it.",
      },
      {
        title: "An evaluation set",
        text: "Real questions paired with expected answers, run before launch and after every change to prompts, chunking or models.",
      },
    ],
    processTitle: "How I build a chatbot that stays accurate",
    process: [
      {
        title: "Collect real questions",
        body: "You send questions customers or staff actually ask. They become the first evaluation set and decide which content we ingest first.",
      },
      {
        title: "Ingest a slice of content",
        body: "I embed one well-defined part of your content and run the questions against it, so retrieval quality is measured before anything else is built.",
      },
      {
        title: "Tune retrieval and answers",
        body: "Chunk sizes, filters, the number of passages and the answer prompt are adjusted until the evaluation results are acceptable to you.",
      },
      {
        title: "Embed, launch, keep learning",
        body: "The chat window goes into your product, sync jobs go live, and unanswered questions feed back into your content and the evaluation set.",
      },
    ],
    stackTitle: "The RAG stack behind your chatbot",
    stack: [
      { name: "pgvector", why: "similarity search inside Postgres" },
      { name: "Supabase", why: "content storage, auth and Row Level Security" },
      { name: "OpenAI API", why: "embeddings and chat completions" },
      { name: "Claude API", why: "answers that need long context" },
      { name: "Supabase Edge Functions", why: "ingestion and re-embedding jobs" },
      { name: "Next.js", why: "answers streamed from the server" },
    ],
    workTitle: "Chatbot and conversational AI work",
    work: [
      { slug: "leadsmind", fact: "Built course Q&A with RAG on pgvector, plus AI lesson summaries, inside the LeadsMind LMS." },
      { slug: "velocity", fact: "Co-founded Velocity, where an AI follows up with callers after a missed call and works towards a booking." },
    ],
    faqTitle: "AI chatbot development questions",
    faqs: [
      {
        q: "What is a RAG chatbot, in plain terms?",
        a: "A chatbot that looks things up before it answers. Your content is split into passages and indexed. For each question, the closest passages are retrieved and the model is asked to answer using only those, which keeps answers tied to your material and lets the chatbot cite them.",
      },
      {
        q: "Can it answer from private, per-customer content?",
        a: "Yes. Passages are stored with the same ownership rules as the rest of your data and filtered by Row Level Security during retrieval. A customer can only retrieve content their account can read, so one customer's documents never appear in another customer's answers.",
      },
      {
        q: "What content can you ingest?",
        a: "Content from where it already lives: database tables, help-centre articles, web pages and documents. Each source gets its own sync job, so editing an article updates the chatbot without a manual upload. Clean, structured sources are quicker to ingest than scattered files, and that shapes the scope.",
      },
      {
        q: "What happens when the answer is not in our content?",
        a: "The chatbot says it could not find an answer and suggests a next step, such as contacting your team. It does not fall back to guessing. Those questions are logged, which gives you a running list of content worth writing.",
      },
      {
        q: "How do we know the chatbot is good enough to launch?",
        a: "We agree on the evaluation set before building. I run it after each change and share which questions were answered correctly, partly or not at all. You decide when the results are good enough, and the same set protects quality after launch.",
      },
    ],
    relatedTitle: "Related AI and backend services",
    related: [
      {
        slug: "ai-developer",
        anchor: "AI feature development with OpenAI and Claude",
        text: "For AI that generates, summarises or forecasts inside your product instead of chatting.",
      },
      {
        slug: "supabase-developer",
        anchor: "Supabase developer for secure data access",
        text: "For the Row Level Security rules that decide what each chatbot user may retrieve.",
      },
    ],
    posts: ["rag-chatbot-openai-pgvector"],
    cta: "Want a chatbot that knows your content? Let's talk.",
    ctaText: "Tell me where your content lives and who will ask the questions. I will reply with how I would approach the first slice.",
    dateModified: "2026-10-30",
  },
  {
    slug: "saas-mvp-development",
    name: "SaaS MVP development",
    keyword: "saas mvp development",
    metaTitle: "SaaS MVP Development for Startups",
    description:
      "SaaS MVP development for startups: a first version with sign-up, organisation accounts and Stripe or Paystack billing, built on Next.js and Supabase.",
    h1: "SaaS MVP Development for Startups and Founders",
    eyebrow: "SaaS MVP development",
    intro:
      "This service is for founders who have a validated problem and need a first version that real customers can sign up to, use and pay for. I turn your idea into a scoped SaaS MVP on Next.js and Supabase, with authentication, organisation accounts and billing done properly, so version two extends version one instead of replacing it.",
    summary: "A first SaaS version with sign-up, organisations, billing and one core workflow, scoped to launch.",
    serviceType: "SaaS MVP development",
    audienceTitle: "Founders with a problem worth building for",
    audience: [
      "You might arrive with a Figma file, a written spec, a spreadsheet you run the process in today, or only a clear description of the customer and their problem. Any of these is enough to start. What matters is that we can name the one workflow that proves people will pay, because that workflow is what the first version is built around.",
      "Agencies hire me for the same work when a client needs a SaaS and they want a dependable senior developer to own it. Either way the aim is a small product with solid foundations, where the data model, tenant isolation and billing will still be right when the second version arrives.",
    ],
    deliverTitle: "What your MVP launches with",
    deliverables: [
      {
        title: "A written MVP scope",
        text: "A list that separates what launches first from what waits, with every item traced back to the workflow it supports.",
      },
      {
        title: "Sign-up and organisation accounts",
        text: "Email and OAuth sign-in, organisations with invited members and roles, and tenant isolation enforced in Postgres.",
      },
      {
        title: "The core workflow",
        text: "The one or two screens and actions your customers are paying for, built and polished before anything else.",
      },
      {
        title: "Subscriptions from launch day",
        text: "Stripe or Paystack plans, checkout and webhooks, with features gated by plan, so the first customer can pay as soon as you open.",
      },
      {
        title: "Admin screens for early support",
        text: "Simple internal views of accounts, plans and activity, so you can help early customers without opening the database.",
      },
      {
        title: "Production launch and handover",
        text: "Deployed to Vercel and Supabase in accounts you own, with environment setup and documentation for whoever builds next.",
      },
    ],
    processTitle: "From idea to a launched MVP",
    process: [
      {
        title: "Scope the first version",
        body: "We write down the customer, the core workflow and what is deliberately left out, then split the build into milestones you approve.",
      },
      {
        title: "Lay the foundations",
        body: "Schema, tenant isolation, auth and billing come first, because they are the expensive parts to change after customers arrive.",
      },
      {
        title: "Build the workflow in slices",
        body: "Each milestone delivers a clickable part of the product on a preview link you can share with co-founders or early customers.",
      },
      {
        title: "Launch and learn",
        body: "We go live, onboard the first customers, and plan the next milestone from what they actually use and ask for.",
      },
    ],
    stackTitle: "A stack chosen for launching fast and lasting",
    stack: [
      { name: "Next.js", why: "marketing site, app and API in one codebase" },
      { name: "Supabase", why: "Postgres, auth, storage and Row Level Security" },
      { name: "TypeScript", why: "fewer regressions as features pile up" },
      { name: "Stripe or Paystack", why: "subscriptions and plan gating" },
      { name: "Tailwind CSS + shadcn/ui", why: "a clean interface without a design bottleneck" },
      { name: "Vercel", why: "a preview link for every change" },
    ],
    workTitle: "Products I took from idea to launch",
    work: [
      { slug: "velocity", fact: "Co-founded Velocity and shipped it: dashboard, auth, and Twilio and Resend integrations, live at velocity-ai.site." },
      { slug: "leadsmind", fact: "Delivered LeadsMind, a multi-tenant CRM, LMS and marketing platform, across 12 milestones; the client left a 5-star review." },
    ],
    faqTitle: "Questions founders ask before an MVP build",
    faqs: [
      {
        q: "What belongs in a SaaS MVP?",
        a: "Sign-up, the workflow that solves the customer's main problem, billing and enough admin to support the first accounts. Reports, extra integrations and settings pages usually wait. The parts that are costly to change later, such as the data model, tenant isolation and billing, are built properly from the first milestone.",
      },
      {
        q: "How do you estimate an MVP without a price list?",
        a: "After a discovery call I write the scope down and split it into milestones, each with its own estimate. Cost follows the number of user roles, workflows, integrations and AI features, so you can see which choices move the estimate and what can wait for version two.",
      },
      {
        q: "Do I own the code and the accounts?",
        a: "Yes. The code lives in your GitHub repository, and Vercel, Supabase and your payment provider run in accounts you own. Nothing depends on my access, so you can continue with me, hire someone else or build a team later.",
      },
      {
        q: "Can you build from my Figma designs?",
        a: "Yes. If you have designs, I build to them. If speed matters more than a custom identity, I design a clean interface with Tailwind and shadcn/ui, and you review the screens at each milestone before they are final.",
      },
      {
        q: "What happens after the MVP launches?",
        a: "Real customers show you what to build next. Because the first version sits on solid foundations, the next milestones add features rather than rework old ones. I can stay on for those, or hand over with documentation so your next developer starts quickly.",
      },
    ],
    relatedTitle: "Services that often join an MVP build",
    related: [
      {
        slug: "payments-integration",
        anchor: "Stripe and Paystack billing for your MVP",
        text: "When charging customers needs more than a single plan and a checkout button.",
      },
      {
        slug: "nextjs-developer",
        anchor: "Next.js development for app and marketing site",
        text: "When you want the public pages and the product in one fast codebase.",
      },
      {
        slug: "ai-developer",
        anchor: "AI features with OpenAI and Claude",
        text: "When AI is part of what the first version promises its customers.",
      },
    ],
    posts: ["saas-mvp-cost"],
    cta: "Ready to scope your MVP? Let's talk.",
    ctaText: "Tell me who the first customer is and what the product does for them. I will reply with the questions that shape the first scope.",
    dateModified: "2026-10-30",
  },
  {
    slug: "nextjs-developer",
    name: "Next.js developer",
    keyword: "hire nextjs developer",
    metaTitle: "Hire a Next.js Developer for Your SaaS",
    description:
      "Hire a Next.js developer for your SaaS: App Router builds, server components, codebase takeovers, performance work and pages search engines can crawl.",
    h1: "Hire a Next.js Developer for Your SaaS",
    eyebrow: "Next.js development",
    intro:
      "This service is for founders and teams who build on Next.js, or want to, and need a senior developer who understands both the framework and the product. I build App Router applications with server components and TypeScript, take over codebases that grew too fast, and make public pages fast and clean enough to rank.",
    summary: "App Router builds, codebase takeovers and performance work for SaaS products on Next.js.",
    serviceType: "Next.js development",
    audienceTitle: "Where a senior Next.js developer makes the difference",
    audience: [
      "Next.js lets one codebase serve the marketing site, the logged-in app and the API, but only when the boundaries are drawn well. I see the same problems in many projects: everything marked as a client component, data fetched again on every request, secrets too close to the browser, and route handlers that trust whoever calls them. Each one costs speed or safety.",
      "You might be starting fresh and want the architecture right from the first commit, or you might have a working product that needs features, a performance pass or a second pair of senior eyes. I also take Figma-to-code work for agencies, delivering React components that slot into an existing Next.js app.",
    ],
    deliverTitle: "Next.js work I take on",
    deliverables: [
      {
        title: "App Router architecture",
        text: "Server components by default, client components only where interaction needs them, and layouts that share data without repeated fetching.",
      },
      {
        title: "Hardened route handlers",
        text: "Typed handlers that validate input and check authorisation on every request. On LeadsMind I audited and hardened 157 of them.",
      },
      {
        title: "Codebase takeover audit",
        text: "A written review of routing, data fetching, auth and database access, with risks and quick wins ranked before I change any code.",
      },
      {
        title: "Performance improvements",
        text: "Static rendering where the data allows it, optimised fonts and images and deferred scripts, measured with Lighthouse before and after.",
      },
      {
        title: "Search-ready public pages",
        text: "Metadata, canonical URLs, sitemaps and structured data generated from your content, with the main text in the server-rendered HTML.",
      },
      {
        title: "Figma to production components",
        text: "Pixel-accurate React components with Tailwind and shadcn/ui, reusable across the marketing site and the app.",
      },
    ],
    processTitle: "How I work on a Next.js codebase",
    process: [
      {
        title: "Read before writing",
        body: "For an existing app I start with the routing tree, data fetching and auth on each route handler, and send you a short written audit.",
      },
      {
        title: "Agree the boundaries",
        body: "We decide what renders on the server, what needs the browser and what can be static, which sets both performance and security.",
      },
      {
        title: "Ship through previews",
        body: "Every change goes to a Vercel preview URL first, so you review real pages rather than screenshots before anything reaches production.",
      },
      {
        title: "Measure and document",
        body: "I compare Lighthouse and build output against the starting point, then document the structure so the next feature is easy to add.",
      },
    ],
    stackTitle: "My Next.js toolkit",
    stack: [
      { name: "Next.js App Router", why: "the framework behind every SaaS I build" },
      { name: "React Server Components", why: "less JavaScript sent to the browser" },
      { name: "TypeScript", why: "types from the database to the UI" },
      { name: "Tailwind CSS + shadcn/ui", why: "consistent, accessible components" },
      { name: "Supabase", why: "the Postgres backend most of my apps use" },
      { name: "Vercel", why: "hosting, previews and edge caching" },
    ],
    workTitle: "Next.js projects in production",
    work: [
      {
        slug: "world-teachers-academy",
        fact: "Built the Next.js site and job portal for World Teachers Academy, with a database-backed blog that replaced hardcoded template content.",
      },
      { slug: "leadsmind", fact: "Audited and hardened 157 Next.js API routes on LeadsMind, alongside Row Level Security fixes across the platform." },
    ],
    faqTitle: "Hiring a Next.js developer: common questions",
    faqs: [
      {
        q: "Do you use the App Router or the Pages Router?",
        a: "The App Router for new projects, because server components and nested layouts make SaaS apps faster and simpler. For an existing Pages Router app I can keep working in it, or migrate route by route when a section is being rebuilt anyway, so the migration never blocks feature work.",
      },
      {
        q: "Can you take over a Next.js codebase another developer started?",
        a: "Yes. I begin with a short written audit of routing, data fetching, authorisation on route handlers and database access. You see the risks and quick wins before I change anything, and the fixes are then scheduled into milestones alongside new features.",
      },
      {
        q: "Why is our Next.js app slow, and can you fix it?",
        a: "The usual causes are client components where server components would do, data fetched on every request that could be cached or static, unoptimised images and fonts, and heavy third-party scripts. I measure first, fix the largest causes, then measure again so you can see the difference.",
      },
      {
        q: "Will marketing pages built in Next.js rank in search?",
        a: "Next.js gives you the tools: static rendering, metadata, sitemaps and structured data. I make sure public pages render their content on the server, so crawlers see it without running JavaScript, with unique titles, descriptions and canonical URLs. This site is built that way.",
      },
      {
        q: "Do you handle the backend, or only the front end?",
        a: "Both, if you need it. Most of my Next.js apps use Supabase for Postgres, auth and storage, with route handlers and Edge Functions for webhooks and background jobs. If you already have a backend team, I can work on the front end only.",
      },
    ],
    relatedTitle: "Related development services",
    related: [
      {
        slug: "full-stack-developer",
        anchor: "Full stack development, database to deploy",
        text: "When one developer should own the whole product, not only the Next.js layer.",
      },
      {
        slug: "supabase-developer",
        anchor: "Supabase backends for Next.js apps",
        text: "When the database, auth and Row Level Security need as much care as the front end.",
      },
      {
        slug: "saas-mvp-development",
        anchor: "SaaS MVP development on Next.js",
        text: "When the Next.js app is a brand-new product that needs to launch.",
      },
    ],
    posts: ["supabase-vs-firebase"],
    cta: "Need a senior Next.js developer? Let's talk.",
    ctaText: "Share the repository or the idea, and what is slowing you down. I will reply with where I would start.",
    dateModified: "2026-10-30",
  },
  {
    slug: "supabase-developer",
    name: "Supabase developer",
    keyword: "supabase developer",
    metaTitle: "Supabase Developer for SaaS and RLS Audits",
    description:
      "Supabase developer for SaaS: Postgres schemas, Row Level Security policies and audits that prove one customer cannot read another customer's data.",
    h1: "Supabase Developer for SaaS Backends and Row Level Security",
    eyebrow: "Supabase development",
    intro:
      "This service is for SaaS teams building on Supabase who need the backend to be secure as well as quick to build on. I design Postgres schemas for multi-tenant products, write Row Level Security policies that keep each customer's data private, and audit live projects to find out what the public anon key can really reach.",
    summary: "Multi-tenant Postgres schemas, Row Level Security policies and security audits for Supabase projects.",
    serviceType: "Supabase backend development and security audit",
    audienceTitle: "Teams who need their Supabase data locked down",
    audience: [
      "Supabase exposes your database through an API that the browser calls directly, using a key anyone can read from your front end. That design is fast to build with, and it makes Row Level Security the only thing standing between one customer's rows and everyone else. A table without RLS, or a policy that checks the wrong column, is a leak waiting to be found.",
      "I work with two kinds of team. Some are starting a product and want the schema and policies designed properly from day one. Others launched quickly, often with AI coding tools or a tight deadline, and now want an independent audit before a customer or a security researcher finds the gaps for them.",
    ],
    deliverTitle: "Supabase work you can hire me for",
    deliverables: [
      {
        title: "Multi-tenant schema design",
        text: "Tables, foreign keys, indexes and membership patterns designed around the queries your product runs most often.",
      },
      {
        title: "Row Level Security policies",
        text: "Select, insert, update and delete policies for every exposed table, with WITH CHECK rules so nobody can write rows into another tenant.",
      },
      {
        title: "Security audit report",
        text: "Every table, view, function and storage bucket checked against who should reach it, with findings ranked by severity.",
      },
      {
        title: "Cross-tenant tests",
        text: "Repeatable tests that sign in as users from two organisations and prove neither can read or change the other's rows.",
      },
      {
        title: "Service-role key review",
        text: "Server code checked for the admin key used where a user-scoped client belongs, which silently bypasses every policy.",
      },
      {
        title: "Storage, auth and Edge Functions",
        text: "Private bucket policies, sign-in flows, and Edge Functions for webhooks and scheduled jobs.",
      },
    ],
    processTitle: "How a Supabase audit or build runs",
    process: [
      {
        title: "Map who should see what",
        body: "We list every role and table and write down, in plain language, who may read and change each one. That list becomes the spec the policies are tested against.",
      },
      {
        title: "Test like an outsider",
        body: "I query the project with the anon key and with real user tokens from different organisations, and record everything that comes back but should not.",
      },
      {
        title: "Fix in small migrations",
        body: "Policies are corrected as SQL migrations in your repository, one area at a time, and checked against the features that depend on them.",
      },
      {
        title: "Leave the tests behind",
        body: "The cross-tenant tests stay in your project, so every future schema change can be checked the same way.",
      },
    ],
    stackTitle: "The Supabase stack I work in",
    stack: [
      { name: "Supabase", why: "Postgres, Auth, Storage, Realtime, Edge Functions" },
      { name: "PostgreSQL", why: "constraints, indexes, views and functions" },
      { name: "Row Level Security", why: "tenant isolation inside the database" },
      { name: "pgvector", why: "embeddings protected by the same policies" },
      { name: "SQL migrations", why: "every policy change versioned and reviewable" },
      { name: "TypeScript", why: "database types generated from the schema" },
    ],
    workTitle: "Supabase projects I have secured and built",
    work: [
      {
        slug: "leadsmind",
        fact: "Audited 157 API routes on LeadsMind and fixed Row Level Security across the platform while the product stayed live.",
      },
      { slug: "world-teachers-academy", fact: "Built the Supabase backend for World Teachers Academy, with nightly job ingestion from Adzuna and Reed." },
    ],
    faqTitle: "Supabase and RLS questions",
    faqs: [
      {
        q: "Is our data exposed if RLS is switched off?",
        a: "If a table sits in a schema the Supabase API exposes, it can be queried with your public anon key. Without Row Level Security and correct policies, that can mean anyone can read or change it. Turning RLS on with no policies blocks everyone, so the policies themselves have to be right.",
      },
      {
        q: "What does an RLS audit deliver?",
        a: "A written report covering every exposed table, view, function and storage bucket: what each one currently allows, what it should allow, and how severe each gap is. You receive the report before any fixes start, so you can prioritise them or hand them to your own team.",
      },
      {
        q: "Can you fix policies on a live product without locking customers out?",
        a: "Yes, that is how I worked on LeadsMind. Each change is a small migration, tested against the screens and API routes that depend on it, and released one area at a time, so customers keep access to their own data throughout.",
      },
      {
        q: "Do you need access to our production database?",
        a: "Not to begin. I can audit from a schema export or a staging project with test data. Fixes arrive as migrations in your repository for you to review and apply, so production access stays with your team unless you choose otherwise.",
      },
      {
        q: "Should a B2B SaaS choose Supabase or Firebase?",
        a: "For most B2B products I recommend Supabase, because organisations, members, plans and invoices are relational data and Postgres handles them naturally. Firebase suits mobile-first apps that need offline sync. My Supabase vs Firebase guide compares the two in detail.",
      },
    ],
    relatedTitle: "Services built on a secure backend",
    related: [
      {
        slug: "nextjs-developer",
        anchor: "Next.js development on top of Supabase",
        text: "When the app that calls your Supabase backend needs building or tidying up.",
      },
      {
        slug: "ai-chatbot-development",
        anchor: "Permission-aware RAG chatbots",
        text: "When you want AI answers that respect the same Row Level Security rules.",
      },
      {
        slug: "saas-mvp-development",
        anchor: "MVP development with security built in",
        text: "When a new product should start with tenant isolation instead of adding it later.",
      },
    ],
    posts: ["supabase-rls-mistakes"],
    cta: "Not sure your data is safe? Let's check.",
    ctaText: "Tell me roughly how many tables and roles your project has. I will reply with how I would audit it and what I need from you.",
    dateModified: "2026-10-30",
  },
  {
    slug: "full-stack-developer",
    name: "Full stack developer",
    keyword: "hire full stack developer",
    metaTitle: "Hire a Full Stack Developer for SaaS",
    description:
      "Hire a senior full stack developer for your SaaS: one person for the React front end, Supabase and Node.js backend, payments, integrations and deploys.",
    h1: "Hire a Senior Full Stack Developer for Your SaaS",
    eyebrow: "Full stack development",
    intro:
      "This service is for founders and agencies who want one senior developer to own a product end to end instead of coordinating a team. I build the React and Next.js front end, the Supabase and Node.js backend, the payments and the integrations, and I act as a technical partner when you need architecture and roadmap decisions made.",
    summary: "One senior developer for the front end, backend, payments, integrations and deploys of your SaaS.",
    serviceType: "Full stack web development",
    audienceTitle: "Why founders hire one developer for the whole stack",
    audience: [
      "When the front end and the backend belong to different people, every feature needs a hand-off, and bugs settle in the gaps between them. A full stack developer takes a feature from the database column to the button that uses it, which keeps decisions quick and leaves nobody waiting on someone else's part.",
      "This suits early products and focused roadmaps, where one experienced person moves faster than a team that has to coordinate. For founders without a technical co-founder, I also help with architecture, sequencing and trade-offs. I co-founded Velocity, so I have made those calls on a product of my own, not only for clients.",
    ],
    deliverTitle: "The full stack, owned by one developer",
    deliverables: [
      {
        title: "Front end",
        text: "React and Next.js interfaces built from Figma or designed with Tailwind and shadcn/ui, fast and accessible on every screen size.",
      },
      {
        title: "Backend and data",
        text: "Supabase and PostgreSQL schemas with Row Level Security, Node.js services, and API routes that check authorisation on every request.",
      },
      {
        title: "Payments",
        text: "Stripe and Paystack subscriptions, webhooks and plan gating, including billing migrations on products that already have paying customers.",
      },
      {
        title: "Third-party integrations",
        text: "Email with Resend, calls and SMS with Twilio, social OAuth publishing, WhatsApp broadcasts and external data feeds.",
      },
      {
        title: "Technical partnership",
        text: "Architecture decisions, a sequenced roadmap and honest trade-offs for founders who do not have a technical co-founder.",
      },
      {
        title: "Ongoing product work",
        text: "Continued milestones after launch, with a written handover whenever the engagement ends.",
      },
    ],
    processTitle: "How I run a full stack engagement",
    process: [
      {
        title: "Understand the whole product",
        body: "We talk through the product, its users and what exists today, and I return a written scope covering data, backend, front end and integrations together.",
      },
      {
        title: "Design the data first",
        body: "The schema and access rules are agreed before the screens, because every later feature depends on them.",
      },
      {
        title: "Ship vertical slices",
        body: "Each milestone delivers a complete feature, from table to interface, that you can test end to end, with a written report on what shipped.",
      },
      {
        title: "Document as we go",
        body: "Environments, secrets and architecture are written down during the build, so handing the product to another developer or a team is straightforward.",
      },
    ],
    stackTitle: "One typed stack, front to back",
    stack: [
      { name: "React + Next.js", why: "interfaces and server rendering" },
      { name: "TypeScript", why: "one language from database types to UI" },
      { name: "Node.js", why: "services, scripts and webhook handlers" },
      { name: "Supabase + PostgreSQL", why: "data, auth, storage and RLS" },
      { name: "Stripe and Paystack", why: "payments and subscriptions" },
      { name: "Resend and Twilio", why: "email, SMS and voice" },
    ],
    workTitle: "End-to-end builds I delivered",
    work: [
      {
        slug: "leadsmind",
        fact: "Built LeadsMind as its solo lead full stack developer: CRM, LMS, funnels, WhatsApp broadcasts, social publishing and billing.",
      },
      {
        slug: "world-teachers-academy",
        fact: "Delivered World Teachers Academy end to end, from job ingestion and lead capture to the blog and deployment.",
      },
    ],
    faqTitle: "Full stack developer FAQs",
    faqs: [
      {
        q: "Should I hire one full stack developer or a small team?",
        a: "For an MVP or a focused roadmap, one senior full stack developer is usually faster, because there is no coordination overhead and no hand-off between front end and backend. A team makes sense when you have genuinely parallel workstreams that one person cannot keep moving.",
      },
      {
        q: "Can you act as our technical co-founder?",
        a: "I can play that role in the work itself: making architecture decisions, sequencing the roadmap and explaining trade-offs in business terms, while building hands-on. Equity or co-founder arrangements are a separate conversation, best had once we have worked together.",
      },
      {
        q: "Do you take front-end-only or backend-only work?",
        a: "Yes. Agencies and product teams often hire me for React and Next.js front ends against an existing API, or for Supabase and Node.js work behind an existing interface. The full stack view still helps, because I can see how each side affects the other.",
      },
      {
        q: "How will I know what is happening each week?",
        a: "Each milestone ends with working software and a written progress report: what shipped, what is next, and any decisions I need from you. I work remotely with clients in Africa, the US and the MENA region, so written updates keep work moving across time zones.",
      },
      {
        q: "Can you take over a product someone else built?",
        a: "Yes. I start with a review of the repository, the database and how authorisation works on each API route, then send a written list of risks and quick wins. On LeadsMind that review covered 157 API routes and led to IDOR fixes, RLS hardening and closed unauthenticated endpoints.",
      },
    ],
    relatedTitle: "Narrower services, if you need one part",
    related: [
      {
        slug: "nextjs-developer",
        anchor: "Next.js developer for the front end and API",
        text: "When most of the work sits in the Next.js app itself.",
      },
      {
        slug: "payments-integration",
        anchor: "Stripe and Paystack integration",
        text: "When the job is billing, subscriptions or a move between providers.",
      },
      {
        slug: "saas-mvp-development",
        anchor: "SaaS MVP development for new products",
        text: "When the product does not exist yet and needs a first version.",
      },
    ],
    posts: ["what-is-mvp-in-software-development"],
    cta: "Need one developer for the whole stack? Let's talk.",
    ctaText: "Tell me what the product does and what exists today. I will reply with how I would split the work into milestones.",
    dateModified: "2026-10-30",
  },
  {
    slug: "payments-integration",
    name: "Payments integration",
    keyword: "stripe and paystack integration developer",
    metaTitle: "Stripe and Paystack Integration Developer",
    description:
      "Stripe and Paystack integration for SaaS billing: subscriptions, verified webhooks, plan gating and provider migrations that keep customers' access.",
    h1: "Stripe and Paystack Payments Integration for SaaS",
    eyebrow: "Payments integration",
    intro:
      "This service is for SaaS teams that need to charge customers reliably, whether for the first time or after outgrowing a basic checkout. I integrate Stripe and Paystack subscriptions, webhooks and plan gating, and I plan migrations between the two. I have moved a live product's billing from Stripe to Paystack.",
    summary: "Stripe and Paystack subscriptions, verified webhooks, plan gating and provider migrations.",
    serviceType: "Payment gateway integration",
    audienceTitle: "When billing needs a specialist's attention",
    audience: [
      "Billing reaches further into a product than it first appears. It decides who can sign up, which features each account can use, what support sees when a customer asks about a charge, and what happens when a card fails at renewal. When it is wired loosely, you get customers who paid but are locked out, and customers who stopped paying but kept access.",
      "I work with products selling globally on Stripe and products selling into African markets such as Nigeria, Ghana, Kenya and South Africa, where Paystack often fits better for local cards, bank transfers and currencies. Some products need both providers, and some need to move from one to the other.",
    ],
    deliverTitle: "Billing pieces I build and fix",
    deliverables: [
      {
        title: "Plans and subscriptions",
        text: "Plans, trials and recurring billing set up in Stripe or Paystack, mirrored in your database as the record your app reads.",
      },
      {
        title: "Verified, idempotent webhooks",
        text: "Handlers that check signatures and can receive the same event twice without applying it twice.",
      },
      {
        title: "Server-side plan gating",
        text: "Feature access enforced from the subscription record on the server and in the database, not only hidden in the UI.",
      },
      {
        title: "Checkout and self-service billing",
        text: "Checkout, upgrades, downgrades, cancellation and invoices that customers manage themselves.",
      },
      {
        title: "Failed-payment handling",
        text: "Grace periods, reminder emails and downgrade rules you choose, triggered by the provider's events.",
      },
      {
        title: "Provider migrations",
        text: "A tested, customer-by-customer plan to move subscriptions between Stripe and Paystack, like the move I delivered for LeadsMind.",
      },
    ],
    processTitle: "How I integrate or migrate billing",
    process: [
      {
        title: "Model the billing rules",
        body: "Plans, currencies, trials and what each plan unlocks are written down first, together with what should happen when a payment fails.",
      },
      {
        title: "Build in test mode",
        body: "Checkout, webhooks and gating are built against the provider's test mode, simulating renewals, failures and cancellations, not only first purchases.",
      },
      {
        title: "Reconcile with your data",
        body: "Subscription state in your database is compared with the provider's records, so support and reporting read one trusted source.",
      },
      {
        title: "Switch over in order",
        body: "New billing goes live for new customers first. In a migration, existing customers move in a controlled order while both webhook handlers keep running.",
      },
    ],
    stackTitle: "Payment tooling I work with",
    stack: [
      { name: "Stripe", why: "global cards, wallets and Stripe Billing" },
      { name: "Paystack", why: "African cards, bank transfers and local currencies" },
      { name: "Next.js route handlers", why: "server-created checkouts and webhook endpoints" },
      { name: "Supabase", why: "subscription records and RLS-based access" },
      { name: "Supabase Edge Functions", why: "scheduled billing and reminder jobs" },
      { name: "Resend", why: "receipts and failed-payment emails" },
    ],
    workTitle: "Billing work in production",
    work: [{ slug: "leadsmind", fact: "Migrated the billing of LeadsMind, a live multi-tenant SaaS, from Stripe to Paystack." }],
    faqTitle: "Payments integration questions",
    faqs: [
      {
        q: "Stripe or Paystack: which should my SaaS use?",
        a: "Start from where your business is registered and where your customers pay. Paystack usually suits businesses selling locally in supported African countries, with the payment methods and currencies those customers expect. Stripe offers broader global coverage and more advanced billing. My Stripe vs Paystack guide covers the trade-offs.",
      },
      {
        q: "Can you move our subscriptions from Stripe to Paystack?",
        a: "Yes, I have done it on a live product. Saved card details cannot be copied between providers, so each customer re-authorises on the new one. I map plans, update your database and webhooks, and move customers in a controlled order while they keep their current access.",
      },
      {
        q: "Can one product use Stripe and Paystack together?",
        a: "Yes. I keep a single subscription model in your database, map each provider's events onto it, and gate features from that one record. The rest of the app never needs to know which provider a customer paid through.",
      },
      {
        q: "How do you handle failed renewals?",
        a: "A failed-payment event moves the account into a grace period you define, triggers reminder emails with a link to update payment details, and only downgrades access when your rules say so. Support can see each account's billing status without opening the provider's dashboard.",
      },
      {
        q: "Do you integrate other payment providers?",
        a: "Stripe and Paystack are the two I use in production. If you need a different provider, tell me on the discovery call and I will be clear about whether I have used it before and what that means for the estimate.",
      },
    ],
    relatedTitle: "Services that pair with billing work",
    related: [
      {
        slug: "saas-mvp-development",
        anchor: "SaaS MVP development with billing from day one",
        text: "When payments are one part of a new product launch.",
      },
      {
        slug: "full-stack-developer",
        anchor: "Full stack development for the whole product",
        text: "When billing changes reach into the database, the app and your support tools.",
      },
    ],
    posts: ["stripe-vs-paystack"],
    cta: "Ready to start charging customers? Let's talk.",
    ctaText: "Tell me which provider you use today, where your customers are and what you want to change. I will reply with how I would approach it.",
    dateModified: "2026-10-30",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
