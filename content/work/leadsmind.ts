import type { CaseStudy } from "./types";

/*
 * Copy for the LeadsMind flagship case study (/case-studies/leadsmind).
 * Fields left as "" or [] are waiting on confirmed details and stay hidden until filled in
 * (see the FILL notes beside them). Never add a client name, metrics or quotes that aren't confirmed.
 */
export const leadsmind: CaseStudy = {
  slug: "leadsmind",
  title: "LeadsMind: an all-in-one CRM, LMS and marketing platform I built",
  /** Used as the full <title>, without the brand suffix (under 60 chars). */
  metaTitle: "LeadsMind Case Study: CRM, LMS and Marketing SaaS",
  metaDescription:
    "How I built LeadsMind, a CRM, LMS and marketing platform with its own AI assistant, LENA, across 11 modules on Next.js and Supabase.",
  badge: "Client project",
  pitch:
    "An all-in-one CRM, LMS and marketing-automation platform built for African businesses, replacing a stack of separate tools with one workspace.",
  type: "Multi-tenant SaaS platform",
  role: "Lead full-stack developer (solo)",
  engagement: "12 milestones",
  timeline: "", // FILL: duration
  stack: [
    "Next.js",
    "TypeScript",
    "Supabase (Postgres, Auth, RLS, Edge Functions, pgvector)",
    "Craft.js",
    "OpenAI API",
    "Paystack",
    "Meta Graph API",
    "WhatsApp Business API",
    "Tailwind CSS",
  ],
  demoUrl: "",
  images: [], // screenshots live in `gallery`, which carries alt text
  problem:
    "Small and mid-sized businesses across Africa run sales in one tool, email and WhatsApp in another, invoices in a spreadsheet, courses somewhere else, and staff records on paper. Nothing talks to anything, so leads fall through the cracks and owners spend their day switching tabs. LeadsMind brings sales, marketing, finance, learning, HR and communication into one workspace with AI built in.",
  modules: [
    {
      id: "dashboard",
      title: "Dashboard",
      summary: "A live snapshot of the business over the last 30 days.",
      bullets: [
        "Revenue, leads captured, active deals and conversion rate",
        "One-click quick actions: lead, invoice, campaign, appointment, automation, quote",
        "Revenue trend and lead growth charts",
        "Global search and an AI assistant",
      ],
      detail:
        "The dashboard opens on the last 30 days: total revenue, leads captured, active deals and conversion rate. Quick actions create a new lead, invoice, campaign, appointment, automation or quote in one click, next to revenue trend and lead growth charts. Global search and the AI assistant sit on the same screen.",
      image: "/work/leadsmind/dashboard.webp",
    },
    {
      id: "crm",
      title: "CRM & Sales",
      summary: "Pipeline, quotes and funnels in one place, with contacts that segment themselves.",
      bullets: ["Lead and deal pipeline", "Quotes", "Funnel Builder for sales funnels", "Smart Tags Engine for automatic tagging and segments"],
      detail:
        "Leads and deals move through one pipeline, quotes are created from the same records, and the Funnel Builder turns them into sales funnels. The Smart Tags Engine tags and segments contacts automatically, so nobody maintains lists by hand.",
      image: "/work/leadsmind/crm.webp",
    },
    {
      id: "marketing",
      title: "Marketing",
      summary: "Campaigns, WhatsApp broadcasts and landing pages without a second tool.",
      bullets: [
        "Campaign tools",
        "WhatsApp Broadcasts",
        "Drag-and-drop website and landing-page builder (Craft.js)",
        "AI copy for landing pages and ads, within each platform's character limits",
      ],
      detail:
        "Campaign tools and WhatsApp Broadcasts sit next to a drag-and-drop website and landing-page builder built on Craft.js. AI writes landing-page and ad copy that respects each ad platform's character limits.",
      image: "/work/leadsmind/marketing.webp",
    },
    {
      id: "social",
      title: "Social",
      summary: "Publish to five networks from one scheduler.",
      bullets: [
        "Real OAuth for LinkedIn, TikTok, YouTube, Facebook and Instagram",
        "Scheduled publishing through a cron-based worker",
        "Unified comment inbox",
        "Engagement analytics",
      ],
      detail:
        "Businesses connect LinkedIn, TikTok, YouTube, Facebook and Instagram through each network's official OAuth flow and publish to their own accounts. A cron-based worker publishes scheduled posts outside the request path, comments from every network land in one inbox, and engagement analytics sit on top.",
      image: "/work/leadsmind/social.webp",
    },
    {
      id: "finance",
      title: "Finance & Accounting",
      summary: "Invoices for the business, and subscription billing for the platform itself.",
      bullets: ["Invoicing", "Finance screens", "SaaS subscription billing on Paystack, migrated from Stripe"],
      detail:
        "Invoicing and finance screens cover the business's own money. The platform's subscription billing runs on Paystack: I migrated it from Stripe for wider African payment coverage.",
      image: "/work/leadsmind/finance.webp",
    },
    {
      id: "commerce",
      title: "Commerce & Ops",
      summary: "Run products, orders and fulfillment from the same workspace as your CRM.",
      bullets: ["Products", "Orders", "Shipments", "Affiliates (with sub-options)", "Inventory"],
      detail:
        "Commerce & Ops brings the operational side of a business into LeadsMind. Teams manage their product catalog and inventory, process orders, track shipments, and run an affiliate program, all connected to the customer records in the CRM.",
      image: "/work/leadsmind/commerce-ops.webp",
    },
    {
      id: "calendar",
      title: "Calendar & Meetings",
      summary: "Booking pages, waitlists and Instant Meet, built on each person's availability.",
      bullets: ["Booking Pages", "Waitlists", "Instant Meet", "Availability"],
      detail:
        "Calendar & Meetings lets teams take bookings without back-and-forth. Customers book through shareable booking pages based on each person's availability, waitlists capture demand when slots are full, and Instant Meet starts a meeting on the spot.",
      image: "/work/leadsmind/calendar-meetings.webp",
    },
    {
      id: "hr",
      title: "HR & Payroll",
      summary: "Staff and HR management with payroll tools.",
      bullets: ["Staff and HR management", "Payroll tools"], // FILL: confirm, e.g. employee records, leave, payroll runs
      detail:
        "HR & Payroll covers staff and HR management, with payroll tools. It replaces the paper staff records many of the businesses LeadsMind serves were relying on, in the same workspace as their sales and finance.",
      image: "",
    },
    {
      id: "lms",
      title: "LMS",
      summary: "A full learning platform with AI built into the lessons.",
      bullets: [
        "Courses, modules and lessons",
        "Enrollment and access gating",
        "Certificates and automations",
        "Course Q&A with retrieval over pgvector",
        "Automatic lesson summaries",
      ],
      detail:
        "Courses are built from modules and lessons, with enrollment and access gating so only enrolled learners reach the content, plus certificates and automations. The AI layer answers learner questions with retrieval over pgvector, grounded in the course material, and writes lesson summaries automatically. A follow-up audit of the LMS covered RLS gaps, enrollment gating, certificate rules and automations.",
      image: "/work/leadsmind/lms.webp",
    },
    {
      id: "communication",
      title: "Communication",
      summary: "Messenger, Instagram DMs and WhatsApp in one inbox.",
      bullets: ["Communications Hub for Messenger and Instagram DMs", "WhatsApp in the same inbox", "Built on Meta webhooks", "Telephony"], // FILL: confirm telephony scope
      detail:
        "The Communications Hub brings Messenger and Instagram DMs, received through Meta webhooks, and WhatsApp into one inbox, alongside telephony. The Meta webhooks had been failing silently; I traced and fixed the failures so messages are not lost.",
      image: "/work/leadsmind/communication.webp",
    },
    {
      id: "settings",
      title: "Settings",
      summary: "Workspace, team roles and permissions, billing and integrations.", // FILL: confirm
      bullets: ["Workspace settings", "Team roles and permissions", "Billing", "Integrations"],
      detail:
        "Settings is where each business manages its workspace, its team's roles and permissions, its billing and its integrations. The billing shown here is the LeadsMind subscription itself, which runs on Paystack after the migration from Stripe.",
      image: "",
    },
  ],
  /** Shown as "AI across the platform". */
  features: [
    { title: "LENA, the in-product AI assistant", description: "" },
    { title: "Revenue forecasting", description: "" },
    { title: "Campaign recommendations", description: "" },
    { title: "Video and hashtag generation", description: "" },
    { title: "Landing-page copy", description: "" },
    { title: "Ad copy with platform-specific character limits", description: "" },
    { title: "Image generation", description: "" },
    { title: "Course Q&A with retrieval over pgvector", description: "" },
    { title: "Lesson summaries", description: "" },
  ],
  security: [
    "Full security audit and remediation across 157 API routes: closed IDOR vulnerabilities, hardened row level security and removed unauthenticated endpoints.",
    "Tenant isolation enforced at the database level with RLS, so a missed check in one route cannot expose another business's data.",
    "Follow-up audit of the Courses/LMS module covering RLS gaps, enrollment gating, certificate rules and automations.",
  ],
  challenges: [
    {
      challenge: "Meta webhooks for Messenger and Instagram DMs were failing silently.",
      solution: "I traced the silent failures and fixed them, so messages are never lost.",
    },
    {
      challenge: "Real publishing to five social platforms, each with its own OAuth flow and rules.",
      solution: "All five sit behind one scheduling and analytics layer, so a business schedules once and publishes everywhere.",
    },
    {
      challenge: "Moving billing from Stripe to Paystack on a live product.",
      solution: "Migrated without disrupting existing workspaces.",
    },
    {
      // FILL: confirm, or delete this entry if you'd rather not mention it
      challenge: "Taking over the LMS backend scope mid-project.",
      solution: "Delivered it on schedule.",
    },
  ],
  howIWorked:
    "Delivered as a 12-milestone engagement, with a formal PDF report sent to the client at each milestone so scope, progress and next steps were always visible.",
  architecture:
    "The Next.js app and its API routes run on Supabase: Postgres with row level security for tenant isolation, Auth, Edge Functions, and pgvector for retrieval. External services connect through the API routes and webhooks: Meta and WhatsApp for messaging, the social networks for publishing, Paystack for billing and OpenAI for the AI features.",
  decisions: [],
  /** Shown under an "In development" label, never as delivered. */
  roadmap: ["Audio Learning & Podcast platform", "Realtor module"],
  review: "5-star Upwork review, August 2026",
  clientQuote: "", // FILL: exact review text, only if the client allows it
  gallery: [
    { src: "/work/leadsmind/commerce-ops.webp", alt: "LeadsMind Commerce & Ops module with products, orders, shipments, affiliates and inventory" },
    { src: "/work/leadsmind/calendar-meetings.webp", alt: "LeadsMind Calendar & Meetings module with booking pages, waitlists, Instant Meet and availability" },
    {
      src: "/work/leadsmind/dashboard.webp",
      alt: "LeadsMind dashboard with 30-day revenue, leads captured, active deals and conversion rate, plus revenue trend and lead growth charts (demo data)",
    },
    { src: "/work/leadsmind/crm.webp", alt: "LeadsMind CRM and sales screen showing the lead and deal pipeline (demo data)" },
    { src: "/work/leadsmind/marketing.webp", alt: "LeadsMind marketing module with the drag-and-drop landing-page builder (demo data)" },
    { src: "/work/leadsmind/social.webp", alt: "LeadsMind social module with scheduled posts across connected social accounts (demo data)" },
    { src: "/work/leadsmind/finance.webp", alt: "LeadsMind finance screen with invoices (demo data)" },
    { src: "/work/leadsmind/lms.webp", alt: "LeadsMind LMS course builder with modules and lessons (demo data)" },
    { src: "/work/leadsmind/communication.webp", alt: "LeadsMind Communications Hub inbox with Messenger, Instagram and WhatsApp conversations (demo data)" },
  ],
  results: [], // FILL: real, verifiable outcomes only
  cta: "Need a platform like this built?",
  next: null, // previous/next links come from CaseStudyPager
  whatIs:
    "LeadsMind is an all-in-one CRM, LMS and marketing-automation platform for small and mid-sized businesses across Africa. It brings sales, marketing, social publishing, finance, learning, HR and communication into one multi-tenant workspace with AI built in, so a business stops juggling a separate tool for each job. It runs on Next.js and Supabase, with Paystack for billing.",
  builtBy: "Built by [Zain Ul Hassan](/about), lead full-stack developer, working solo across a 12-milestone engagement.",
  officialSite: { label: "leadsmind.io", href: "https://leadsmind.io" },
  notes: {
    ai: "This is the kind of work I take on as an [AI developer adding OpenAI features to SaaS products](/services/ai-developer). The retrieval behind course Q&A follows the approach in my guide to [building a RAG chatbot with OpenAI and pgvector](/blog/rag-chatbot-openai-pgvector).",
    security:
      "Database-level tenant isolation and RLS audits are the core of my [Supabase developer and RLS audit service](/services/supabase-developer). The patterns this audit turned up are written up in [Supabase RLS mistakes that leak customer data](/blog/supabase-rls-mistakes).",
    "hard-problems":
      "The billing move is unpacked in [Stripe vs Paystack for SaaS in Africa](/blog/stripe-vs-paystack), and it is the kind of change my [Stripe and Paystack payments integration service](/services/payments-integration) handles.",
    "how-i-worked":
      "Building a multi-tenant product in milestones, with auth, billing and tenant isolation in place from the start, is also how I run [SaaS MVP development](/services/saas-mvp-development) for founders.",
  },
  assistant: {
    id: "lena",
    title: "LENA: the AI product assistant I built into LeadsMind",
    intro:
      "LENA is the in-app assistant that lives in every LeadsMind workspace. I built it and trained it on LeadsMind's features, so users can ask how a feature works, find out why something isn't behaving as expected, and get help without leaving the product.",
    features: [
      { title: "Ask anything about the product", text: "Answers questions about how LeadsMind features work.", detail: "" },
      {
        title: "Live diagnostics",
        text: "Troubleshoots issues and can scan the workspace for problems directly.",
        detail: "", // FILL: one sentence on what the scan checks (e.g. integrations, automations, settings)
      },
      {
        title: "Contact support",
        text: "A one-click path from the chat to the support team, so users never have to hunt for help.",
        detail: "", // FILL: how it routes (e.g. creates a ticket or sends an email)
      },
      { title: "Book a meeting", text: "Users can book a call from inside the assistant without leaving the app.", detail: "" },
    ],
    launcher:
      "The LeadsMind AI assistant opens from a persistent assistant button on every screen, with an active status indicator, so help is always one click away.",
    built: "", // FILL: one or two sentences on the approach (grounding, model, accuracy, guardrails)
    note:
      "Assistants that know a product and answer from its own content are what I build as an [AI chatbot developer for product assistants](/services/ai-chatbot-development), alongside the wider [AI features I add to SaaS products](/services/ai-developer).",
    image: {
      src: "/work/leadsmind/lena-chat.webp",
      alt: "LENA, the LeadsMind AI product assistant, showing Live diagnostics, Contact support and Book a meeting",
    },
  },
  faqs: [
    {
      q: "What is LeadsMind?",
      a: "LeadsMind is an all-in-one CRM, LMS and marketing-automation platform built for small and mid-sized businesses across Africa. It brings sales, marketing, social publishing, finance, learning, HR and communication into one multi-tenant workspace with AI built in. This page is an independent case study by the developer who built it; the product itself is at leadsmind.io.",
    },
    {
      q: "What modules does LeadsMind include?",
      a: "Dashboard, CRM & Sales, Marketing, Social, Finance & Accounting, Commerce & Ops, Calendar & Meetings, HR & Payroll, LMS, Communication and Settings, all inside one workspace per business. Commerce & Ops covers LeadsMind inventory and orders alongside products, shipments and affiliates, and Calendar & Meetings adds LeadsMind booking pages, waitlists and Instant Meet. An Audio Learning & Podcast platform and a Realtor module are in development and not yet delivered.",
    },
    {
      q: "What is LENA in LeadsMind?",
      a: "LENA is the LeadsMind AI assistant: the in-product assistant I built and trained on LeadsMind's features. It answers questions about how the product works, helps troubleshoot issues, and connects users to the support team or lets them book a meeting, all from inside the chat.",
    },
    {
      q: "Can users get human support from inside LeadsMind?",
      a: "Yes. The LENA AI assistant includes Contact support and Book a meeting actions inside the chat, so users can reach the support team or book a call without leaving the app.",
    },
    {
      q: "What technology is LeadsMind built on?",
      a: "Next.js with TypeScript and Tailwind CSS for the app and its API routes, and Supabase for Postgres with row level security, Auth, Edge Functions and pgvector. The landing-page builder uses Craft.js, the AI features use the OpenAI API, billing runs on Paystack, and messaging connects through the Meta Graph API and the WhatsApp Business API.",
    },
    {
      q: "Who built the LeadsMind platform?",
      a: "Zain Ul Hassan, as the solo lead full-stack developer. The build was delivered as a 12-milestone engagement with a formal PDF report sent to the client at each milestone, and the client left a 5-star review on Upwork in August 2026.",
    },
    {
      q: "How were security and tenant isolation handled in LeadsMind?",
      a: "Tenant isolation is enforced in the database with row level security, so a missed check in one API route cannot expose another business's data. A full security audit of 157 API routes closed IDOR vulnerabilities, hardened RLS and removed unauthenticated endpoints, and a follow-up audit of the LMS covered RLS gaps, enrollment gating, certificate rules and automations.",
    },
    {
      q: "How was the LeadsMind AI layer built?",
      a: "The AI features use the OpenAI API: revenue forecasting, campaign recommendations, video and hashtag generation, landing-page copy, ad copy within each platform's character limits, and image generation. In the LMS, learner questions are answered with retrieval over pgvector, grounded in the course material, and lesson summaries are written automatically.",
    },
  ],
  datePublished: "2026-10-17",
  dateModified: "2026-10-30",
};
