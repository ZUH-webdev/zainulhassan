import type { CaseStudy } from "./types";

/*
 * Copy for the LeadsMind flagship case study (/case-studies/leadsmind).
 * Fields left as "" or [] are waiting on confirmed details and stay hidden until filled in
 * (see the FILL notes beside them). Never add a client name, metrics or quotes that aren't confirmed.
 */
export const leadsmind: CaseStudy = {
  slug: "leadsmind",
  title: "LeadsMind: Building and Securing an All-in-One CRM, LMS and Marketing Platform",
  metaTitle: "LeadsMind Case Study: All-in-One CRM, LMS and Marketing SaaS",
  metaDescription:
    "How I built and secured LeadsMind, a multi-tenant CRM, LMS and marketing SaaS for African businesses: AI suite, Paystack billing, 157 API routes audited.",
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
      summary: "", // FILL: one-line summary
      bullets: [], // FILL: 3 to 4 real capabilities of this module
      detail: "", // FILL
      image: "",
    },
    {
      id: "calendar",
      title: "Calendar & Meetings",
      summary: "Appointment booking and calendar management.",
      bullets: ["Appointment booking", "Calendar management"], // FILL: extras such as availability, reminders, video links
      detail: "Appointment booking and calendar management.",
      image: "",
    },
    {
      id: "hr",
      title: "HR & Payroll",
      summary: "Staff and HR management with payroll tools.",
      bullets: ["Staff and HR management", "Payroll tools"], // FILL: confirm, e.g. employee records, leave, payroll runs
      detail: "Staff and HR management with payroll tools.",
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
        "Courses are built from modules and lessons, with enrollment and access gating so only enrolled learners reach the content, plus certificates and automations. The AI layer answers learner questions with retrieval over pgvector, grounded in the course material, and writes lesson summaries automatically.",
      image: "/work/leadsmind/lms.webp",
    },
    {
      id: "communication",
      title: "Communication",
      summary: "Messenger, Instagram DMs and WhatsApp in one inbox.",
      bullets: ["Communications Hub for Messenger and Instagram DMs", "WhatsApp in the same inbox", "Built on Meta webhooks", "Telephony"], // FILL: confirm telephony scope
      detail:
        "The Communications Hub brings Messenger and Instagram DMs, received through Meta webhooks, and WhatsApp into one inbox, alongside telephony.",
      image: "/work/leadsmind/communication.webp",
    },
    {
      id: "settings",
      title: "Settings",
      summary: "Workspace, team roles and permissions, billing and integrations.", // FILL: confirm
      bullets: ["Workspace settings", "Team roles and permissions", "Billing", "Integrations"],
      detail: "Workspace settings, team roles and permissions, billing and integrations.",
      image: "",
    },
  ],
  /** Shown as "AI across the platform". */
  features: [
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
  next: { href: "/case-studies/world-teachers-academy", title: "World Teachers Academy: teacher certification site and job portal" },
  datePublished: "2026-10-17",
  dateModified: "2026-10-30",
};
