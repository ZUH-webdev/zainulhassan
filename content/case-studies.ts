import type { Section } from "@/content/blocks";
import { leadsmind } from "@/content/work/leadsmind";

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
  /** Has its own route under app/case-studies/<slug>, so the [slug] template skips it. */
  ownRoute?: boolean;
  datePublished: string;
  dateModified: string;
  sections: Section[];
};

export const caseStudies: CaseStudy[] = [
  {
    // Flagship: rendered by app/case-studies/leadsmind from content/work/leadsmind.ts. This entry feeds listings only.
    slug: leadsmind.slug,
    name: "LeadsMind",
    kicker: "CRM · LMS · Marketing automation",
    metaTitle: leadsmind.metaTitle,
    description: leadsmind.metaDescription,
    h1: leadsmind.title,
    intro: leadsmind.pitch,
    summary: "An all-in-one CRM, LMS and marketing automation platform for African businesses.",
    headlineFact: "157 API routes audited and hardened",
    stack: ["Next.js", "Supabase", "PostgreSQL", "Row Level Security", "pgvector", "OpenAI", "Paystack"],
    services: ["supabase-developer", "ai-developer", "payments-integration"],
    datePublished: leadsmind.datePublished!,
    dateModified: leadsmind.dateModified!,
    ownRoute: true,
    sections: [],
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
      "World Teachers Academy is a South African teacher certification and placement business. I built its site and a teaching job portal on Next.js and Supabase. The portal ingests jobs nightly from Adzuna and Reed and captures each candidate as a lead before redirecting them to the apply link.",
    summary: "A teacher certification site and job portal with nightly ingestion and lead capture.",
    headlineFact: "Nightly job ingestion from Adzuna and Reed",
    stack: ["Next.js", "Supabase", "PostgreSQL", "Vercel", "Resend"],
    services: ["nextjs-developer", "full-stack-developer"],
    datePublished: "2026-10-17",
    dateModified: "2026-10-18",
    sections: [
      {
        id: "problem",
        title: "The problem",
        blocks: [
          {
            p: "A certification business grows by reaching teachers who are looking for work. A job portal brings those teachers to the site, but only if the listings stay current and the business learns who the candidates are.",
          },
          {
            p: "The blog ran on hardcoded template content, so every new post needed a code change. The business needed content that updates itself, or that the team can update, on a site search engines can crawl.",
          },
        ],
      },
      {
        id: "built",
        title: "What I built",
        blocks: [
          {
            ul: [
              "**The main site** for the certification and placement business, on Next.js.",
              "**A teaching job portal** fed by nightly ingestion from the Adzuna and Reed job APIs.",
              "**Lead capture** that records each candidate before redirecting them to the original apply link.",
              "**A Supabase-backed blog** that replaced the hardcoded template content.",
            ],
          },
          { h3: "The candidate journey" },
          {
            ol: [
              "A teacher finds a listing on the portal.",
              "They click to apply.",
              "The portal captures their details as a lead for World Teachers Academy.",
              "They continue to the original listing to complete their application.",
            ],
          },
        ],
      },
      {
        id: "decisions",
        title: "Key technical decisions",
        blocks: [
          { h3: "Store jobs instead of fetching them live" },
          {
            p: "A nightly job pulls listings into Supabase. Serving jobs from Postgres, rather than calling Adzuna and Reed on every page view, keeps listing pages fast and lets the portal search, filter and de-duplicate them.",
          },
          { h3: "Capture the lead, not the application" },
          {
            p: "The portal records the candidate and then sends them to the original listing. The business builds an audience from every click to apply, and the site never has to host or process applications itself.",
          },
          { h3: "Move content into the database" },
          {
            p: "Blog posts live in Supabase, so the team publishes without a developer. It is the same Next.js and Supabase pairing I compare in [Supabase vs Firebase for SaaS](/blog/supabase-vs-firebase).",
          },
        ],
      },
      {
        id: "stack",
        title: "Stack",
        blocks: [
          {
            ul: [
              "**Next.js** for the site, portal and blog.",
              "**Supabase (PostgreSQL)** for jobs, leads and posts.",
              "**Adzuna and Reed APIs** as job sources.",
              "**Resend** for email.",
              "**Vercel** for hosting.",
            ],
          },
        ],
      },
      {
        id: "outcome",
        title: "Outcome",
        blocks: [
          {
            ul: [
              "Job listings refresh every night from Adzuna and Reed without manual work.",
              "Every click to apply creates a lead for the business.",
              "The team publishes blog posts from the database instead of editing template code.",
              "Next on the roadmap: certificate verification with QR codes.",
            ],
          },
          {
            p: "This is the kind of build I deliver through my [Next.js developer service](/services/nextjs-developer).",
          },
        ],
      },
    ],
  },
  {
    slug: "velocity",
    name: "Velocity",
    kicker: "Own product · AI call recovery",
    metaTitle: "Velocity: AI Missed Call Recovery App",
    description:
      "Velocity case study: an AI product I co-founded that recovers missed calls and books appointments for local businesses, built with Next.js, Twilio and Resend.",
    h1: "Velocity: An AI Assistant That Recovers Missed Calls and Books Appointments",
    intro:
      "Velocity is an AI product that recovers missed calls and books appointments for local businesses. I co-founded it and built the dashboard, the auth, and the Twilio and Resend integrations. It is live at velocity-ai.site, and it is the product where I make the business decisions as well as the technical ones.",
    summary: "An AI assistant that recovers missed calls and books appointments for local businesses.",
    headlineFact: "Co-founded and live at velocity-ai.site",
    stack: ["Next.js", "React", "Node.js", "Twilio", "Resend"],
    services: ["ai-developer", "full-stack-developer"],
    link: { label: "Visit velocity-ai.site", href: "https://velocity-ai.site" },
    datePublished: "2026-10-17",
    dateModified: "2026-10-18",
    sections: [
      {
        id: "problem",
        title: "The problem",
        blocks: [
          {
            p: "Local businesses miss calls while they are busy serving customers. A missed call is often a missed booking, because the caller rings the next business on the list.",
          },
          {
            p: "The owners who feel this most do not want another complicated tool. The value had to be obvious from the first missed call, and the dashboard had to show what happened at a glance.",
          },
        ],
      },
      {
        id: "built",
        title: "What I built",
        blocks: [
          {
            ul: [
              "**The dashboard** where owners see each missed call and what happened next.",
              "**Authentication** so each business signs in to its own account.",
              "**Twilio integration** that detects a missed call and starts the AI follow-up.",
              "**Resend integration** for transactional email.",
            ],
          },
          { h3: "The flow, step by step" },
          {
            ol: [
              "A call to the business goes unanswered.",
              "Velocity detects the missed call through Twilio.",
              "The AI follows up with the caller.",
              "The conversation moves towards a booked appointment.",
              "The owner sees the result in the dashboard.",
            ],
          },
        ],
      },
      {
        id: "decisions",
        title: "Key technical decisions",
        blocks: [
          { h3: "One job, done well" },
          {
            p: "Every feature had to help recover a missed call or book an appointment. Anything else waited. That rule kept the first version small enough to ship and easy to explain.",
          },
          { h3: "Telephony events on the server" },
          {
            p: "Twilio events arrive at a Node.js backend, which decides what to do and triggers the follow-up. The Next.js front end only shows results, so call handling never depends on anyone having the dashboard open.",
          },
          { h3: "A dashboard for non-technical owners" },
          {
            p: "The dashboard shows outcomes, not settings: which calls were missed, which callers got a follow-up and which booked. Owners should understand it without training.",
          },
        ],
      },
      {
        id: "stack",
        title: "Stack",
        blocks: [
          {
            ul: [
              "**Next.js and React** for the dashboard.",
              "**Node.js** for the backend that handles call events.",
              "**Twilio** for missed-call detection.",
              "**Resend** for email.",
            ],
          },
        ],
      },
      {
        id: "outcome",
        title: "Outcome",
        blocks: [
          {
            ul: [
              "Live at velocity-ai.site.",
              "Dashboard, auth, and Twilio and Resend integrations built and shipped.",
              "A product I co-founded, so I own the product decisions as well as the code.",
            ],
          },
          {
            p: "If you want something similar for your business, see my [AI developer service](/services/ai-developer) or [full stack development service](/services/full-stack-developer).",
          },
        ],
      },
    ],
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
