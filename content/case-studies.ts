import type { Section } from "@/content/blocks";

export type CaseStudy = {
  slug: string;
  name: string;
  kicker: string;
  metaTitle: string;
  description: string;
  h1: string;
  /** Answer-first summary (40-60 words). */
  intro: string;
  summary: string;
  headlineFact: string;
  stack: string[];
  /** Service pages this case study proves. */
  services: string[];
  link?: { label: string; href: string };
  datePublished: string;
  dateModified: string;
  sections: Section[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "leadsmind",
    name: "LeadsMind",
    kicker: "CRM · LMS · Marketing automation",
    metaTitle: "LeadsMind Case Study: CRM and LMS Platform",
    description:
      "How I built and secured LeadsMind, an all-in-one CRM, LMS and marketing platform for African businesses: 157 API routes audited, AI suite, Paystack billing.",
    h1: "LeadsMind: Building and Securing an All-in-One CRM, LMS and Marketing Platform",
    intro:
      "LeadsMind is an all-in-one platform for African businesses that combines a CRM, online courses, funnels, WhatsApp broadcasts and social publishing in one product. I delivered it in milestones: I audited and hardened 157 API routes, built an AI suite, wired real OAuth publishing and migrated billing from Stripe to Paystack.",
    summary: "An all-in-one CRM, LMS and marketing automation platform for African businesses.",
    headlineFact: "157 API routes audited and hardened",
    stack: ["Next.js", "Supabase", "PostgreSQL", "Row Level Security", "pgvector", "Paystack", "OpenAI"],
    services: ["supabase-developer", "ai-developer", "payments-integration"],
    datePublished: "2026-10-17",
    dateModified: "2026-10-17",
    sections: [
      {
        id: "problem",
        title: "The problem",
        blocks: [
          {
            p: "Small and growing businesses usually run sales, marketing and training on several separate tools: one for contacts, one for courses, one for landing pages, one for messaging and one for social media. LeadsMind brings all of that into one product built for African businesses.",
          },
          {
            p: "A platform that holds many businesses' contacts, students and campaigns in one database has one non-negotiable requirement: each business must only ever see its own data. It also needed billing that works for its customers' markets, and AI features that are useful rather than decorative.",
          },
          { p: "[PLACEHOLDER: the client's main problem in their own words, if they agree to share it]" },
        ],
      },
      {
        id: "approach",
        title: "My approach and key technical decisions",
        blocks: [
          {
            p: "I worked in milestones, each ending with working software and a written progress report, so the client always knew what had shipped and what was next.",
          },
          { h3: "Security enforced in the database" },
          {
            p: "I audited and hardened **157 API routes** and fixed Row Level Security across the platform. Tenant isolation is enforced by Postgres policies, not only by checks in the interface, so a missed check in one route cannot expose another business's data. The approach is explained in my guide to [Supabase RLS mistakes](/blog/supabase-rls-mistakes).",
          },
          { h3: "An AI suite grounded in the platform's own data" },
          {
            p: "I built AI modules for revenue forecasting, ad and landing-page copy, and course Q&A. The course Q&A uses retrieval-augmented generation with pgvector, so answers come from the course material itself. See [how I build RAG chatbots](/blog/rag-chatbot-openai-pgvector).",
          },
          { h3: "Real OAuth publishing" },
          {
            p: "Social publishing uses real OAuth connections to LinkedIn, TikTok, YouTube, Facebook and Instagram, so businesses publish to their own accounts from inside LeadsMind.",
          },
          { h3: "Billing that fits the market" },
          {
            p: "I migrated billing from Stripe to Paystack, a better fit for businesses selling in African markets, while keeping plan-based access working for existing customers. I compare the two in [Stripe vs Paystack for SaaS in Africa](/blog/stripe-vs-paystack).",
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            ul: [
              "157 API routes audited and hardened, with RLS fixes across the platform.",
              "AI suite live: forecasting, ad and landing copy, and course Q&A with RAG.",
              "Real OAuth publishing to LinkedIn, TikTok, YouTube, Facebook and Instagram.",
              "Billing migrated from Stripe to Paystack.",
              "Delivered in milestones for a client who left a 5-star review.",
              "[PLACEHOLDER: any measurable outcome you can share, e.g. customers onboarded]",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "world-teachers-academy",
    name: "World Teachers Academy",
    kicker: "EdTech · Job portal",
    metaTitle: "World Teachers Academy: Job Portal Build",
    description:
      "A teacher certification site and Next.js job portal for a South African business, with nightly Adzuna and Reed job ingestion into Supabase and lead capture.",
    h1: "World Teachers Academy: A Teacher Certification Site and Job Portal",
    intro:
      "World Teachers Academy is a teacher certification and placement business in South Africa. I built its site and a teaching job portal on Next.js and Supabase that ingests jobs nightly from Adzuna and Reed and captures each candidate as a lead before sending them on to apply.",
    summary: "A teacher certification site and job portal with nightly ingestion and lead capture.",
    headlineFact: "Nightly job ingestion from Adzuna and Reed",
    stack: ["Next.js", "Supabase", "PostgreSQL", "Vercel", "Resend"],
    services: ["nextjs-developer", "full-stack-developer"],
    datePublished: "2026-10-17",
    dateModified: "2026-10-17",
    sections: [
      {
        id: "problem",
        title: "The problem",
        blocks: [
          {
            p: "A certification business grows by reaching teachers who are actively looking for work. A job portal brings those teachers to the site, but only if the listings stay fresh and the business learns who the candidates are.",
          },
          {
            p: "The site also relied on hardcoded template content for its blog, which made publishing slow and limited how much useful content the business could put out.",
          },
          {
            p: "Both problems pointed to the same need: content that updates itself or can be updated by the team, on a fast site that search engines can crawl.",
          },
          { p: "[PLACEHOLDER: the client's main goal in their own words, if they agree to share it]" },
        ],
      },
      {
        id: "approach",
        title: "My approach and key technical decisions",
        blocks: [
          { h3: "Fresh jobs, automatically" },
          {
            p: "I built nightly ingestion that pulls teaching jobs from the Adzuna and Reed job APIs into Supabase. Storing jobs in Postgres, instead of fetching them live on every page view, keeps listing pages fast and lets the portal search, filter and de-duplicate them.",
          },
          { h3: "The candidate journey" },
          {
            ol: [
              "A teacher finds a listing on the portal, fed by the nightly ingestion.",
              "They click to apply.",
              "The portal captures their details as a lead for World Teachers Academy.",
              "They continue to the original listing to complete their application.",
            ],
          },
          {
            p: "The teacher gets a fresh, searchable list of jobs in one place, and the business gets a growing audience of candidates it can offer certification and placement to. The site never has to host or process the applications itself, which keeps the build simple.",
          },
          { h3: "Lead capture inside the apply flow" },
          {
            p: "Before a candidate is sent to the original listing to apply, the portal captures their details as a lead. The business builds its audience from every application, without adding friction for teachers.",
          },
          { h3: "A database-backed blog" },
          {
            p: "I replaced the hardcoded template content with a blog backed by the database, so the team can publish without a developer.",
          },
          {
            p: "The site runs on Next.js on Vercel, with Supabase for data and Resend for email. This is the same Next.js and Supabase stack I compare in [Supabase vs Firebase for SaaS](/blog/supabase-vs-firebase).",
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            ul: [
              "Nightly job ingestion from Adzuna and Reed into Supabase.",
              "Lead capture built into the apply flow.",
              "Database-backed blog replacing hardcoded template content.",
              "Proof for my [Next.js developer service](/services/nextjs-developer): a fast, crawlable site on Next.js and Supabase.",
              "[PLACEHOLDER: any measurable outcome you can share, e.g. leads captured per month]",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "velocity",
    name: "Velocity",
    kicker: "Own product · AI voice",
    metaTitle: "Velocity: AI Missed Call Recovery App",
    description:
      "Velocity case study: an AI assistant I co-founded that recovers missed calls and books appointments for local businesses, built with React and Twilio.",
    h1: "Velocity: An AI Assistant That Recovers Missed Calls and Books Appointments",
    intro:
      "Velocity is an AI assistant that recovers missed calls and books appointments for local businesses. I co-founded it and built it in public: I designed the dashboard and built the auth and the Twilio integrations. When a call is missed, Velocity replies in seconds and moves the caller towards a booked appointment.",
    summary: "An AI assistant that recovers missed calls and books appointments for local businesses.",
    headlineFact: "Co-founded and live",
    stack: ["React", "Twilio", "Resend"],
    services: ["ai-developer", "full-stack-developer"],
    link: { label: "Visit velocity-ai.site", href: "https://velocity-ai.site" },
    datePublished: "2026-10-17",
    dateModified: "2026-10-17",
    sections: [
      {
        id: "problem",
        title: "The problem",
        blocks: [
          {
            p: "Local businesses miss calls while they are busy serving customers. A missed call is often a missed booking, because the caller simply rings the next business on the list.",
          },
          {
            p: "Velocity responds to that moment automatically, so the business keeps the conversation going even when nobody can pick up the phone.",
          },
          {
            p: "The product had to be useful to busy owners who do not want another complicated tool. That meant the value had to be obvious from the first missed call, and the dashboard had to explain what happened at a glance.",
          },
        ],
      },
      {
        id: "approach",
        title: "My approach and key technical decisions",
        blocks: [
          { h3: "The flow, step by step" },
          {
            ol: [
              "A call to the business goes unanswered.",
              "Velocity detects the missed call through Twilio.",
              "The AI replies to the caller within seconds, while they are still deciding who to call next.",
              "The conversation moves towards booking an appointment.",
              "The business owner sees what happened in the dashboard.",
            ],
          },
          {
            p: "Keeping the product focused on this single job made every design decision easier: if a feature did not help recover a missed call or book an appointment, it waited.",
          },
          { h3: "Twilio at the core" },
          {
            p: "I built the Twilio integrations that detect a missed call and trigger the AI follow-up. The flow is simple to explain: missed call detected, AI replies in seconds, appointment booked.",
          },
          { h3: "A dashboard owners understand" },
          {
            p: "I designed the dashboard and built the auth, so business owners can sign in and see what happened with each call. Transactional email runs through Resend.",
          },
          { h3: "Built in public" },
          {
            p: "As a co-founder I share the process on LinkedIn, which keeps the product honest about what works and what does not.",
          },
        ],
      },
      {
        id: "demonstrates",
        title: "What this project shows",
        blocks: [
          {
            p: "Velocity is my own product, so I made the product decisions as well as the technical ones. For clients, it demonstrates the parts of a build that usually need several people:",
          },
          {
            ul: [
              "Telephony integration with Twilio, including event-driven flows that must react in seconds.",
              "AI that takes action in a real business process, not just a chat window.",
              "Dashboard design and authentication for non-technical business owners.",
              "Taking a product from idea to live as a co-founder.",
            ],
          },
          {
            p: "If you want something similar for your business, see my [AI developer service](/services/ai-developer) or [full stack development service](/services/full-stack-developer).",
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            ul: [
              "Live at velocity-ai.site.",
              "Dashboard design, auth and Twilio integrations built and shipped.",
              "[PLACEHOLDER: any measurable outcome you can share, e.g. calls recovered]",
            ],
          },
        ],
      },
    ],
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
