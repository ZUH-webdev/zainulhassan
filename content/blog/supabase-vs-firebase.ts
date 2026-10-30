import type { Post } from "./types";

export const post: Post = {
  slug: "supabase-vs-firebase",
  shortTitle: "Supabase vs Firebase",
  title: "Next.js + Supabase vs Firebase for SaaS: Which Should You Choose?",
  metaTitle: "Supabase vs Firebase for SaaS in Next.js",
  description:
    "Supabase vs Firebase for a Next.js SaaS: Postgres vs documents, RLS vs Security Rules, pricing models, lock-in, and a checklist to pick the right one.",
  keyword: "supabase vs firebase",
  datePublished: "2026-10-17",
  dateModified: "2026-10-30",
  service: "supabase-developer",
  caseStudy: "world-teachers-academy",
  related: ["supabase-rls-mistakes", "saas-mvp-cost", "rag-chatbot-openai-pgvector"],
  intro:
    "For most B2B SaaS products built with Next.js, I choose Supabase over Firebase, because SaaS data is relational (organisations, users, plans, invoices) and Supabase gives you a full PostgreSQL database with SQL, joins and Row Level Security. Firebase is a strong choice for mobile-first apps that need offline sync and a flexible document model.",
  sections: [
    {
      id: "at-a-glance",
      title: "Supabase vs Firebase at a glance",
      blocks: [
        {
          table: {
            head: ["", "Supabase", "Firebase"],
            rows: [
              ["Database", "PostgreSQL (relational, SQL)", "Cloud Firestore (NoSQL documents)"],
              ["Access control", "Row Level Security policies in SQL", "Firebase Security Rules"],
              ["Queries", "Joins, aggregates, full SQL", "Document and collection queries"],
              ["Auth", "Supabase Auth", "Firebase Authentication"],
              ["Server logic", "Edge Functions, database functions", "Cloud Functions"],
              ["Vector search", "pgvector extension", "Firestore vector search"],
              ["Open source / self-host", "Yes", "No (Google-managed)"],
              ["Offline-first mobile sync", "Not built in", "Built into the client SDKs"],
            ],
          },
        },
      ],
    },
    {
      id: "data-model",
      title: "Data model: relational vs documents",
      blocks: [
        {
          p: "A typical SaaS has organisations with members, members with roles, plans with features, and records that belong to an organisation. That is relational data, and Postgres handles it naturally: foreign keys keep it consistent, and one SQL query can join it for a dashboard.",
        },
        {
          p: "Firestore stores documents in collections. It is flexible and scales well for simple reads, but relational questions such as \"revenue per plan per month across organisations\" need denormalised copies of data or extra queries. That is manageable, but it moves complexity into your application code.",
        },
      ],
    },
    {
      id: "security",
      title: "Security: RLS vs Security Rules",
      blocks: [
        {
          p: "Both platforms let the client talk to the database directly, so both depend on server-enforced rules. Supabase uses PostgreSQL Row Level Security, written in SQL and applied to every query. Firebase uses its own [Security Rules](https://firebase.google.com/docs/rules) language.",
        },
        {
          p: "For multi-tenant SaaS I prefer RLS, because tenant isolation lives next to the data and works the same for API calls, server code using user sessions, and SQL views created with security_invoker. The flip side is that RLS must be written carefully. I cover the common errors in [Supabase RLS mistakes that leak customer data](/blog/supabase-rls-mistakes).",
        },
      ],
    },
    {
      id: "pricing",
      title: "Pricing models",
      blocks: [
        {
          p: "The two platforms bill differently. Firestore charges largely by document reads, writes and deletes, so a chatty dashboard can become expensive as usage grows. Supabase plans are based mainly on project resources such as compute, database size, storage and bandwidth. Neither is always cheaper; it depends on your access patterns. Check the current [Supabase pricing](https://supabase.com/pricing) and [Firebase pricing](https://firebase.google.com/pricing) against your expected usage.",
        },
      ],
    },
    {
      id: "nextjs",
      title: "How each fits a Next.js app",
      blocks: [
        {
          p: "Supabase fits the Next.js App Router well: server components and route handlers can query Postgres with the user's session so RLS applies, and the same database powers the marketing pages, the app and background jobs. You can also generate TypeScript types from your schema.",
        },
        {
          p: "Firebase works with Next.js too, and its client SDKs are excellent for real-time and offline features. Server-side, you typically use the Admin SDK, which bypasses Security Rules, so authorisation in server code needs extra care.",
        },
      ],
    },
    {
      id: "lock-in",
      title: "Lock-in and portability",
      blocks: [
        {
          p: "Supabase is open source and built on standard PostgreSQL, so your data and most of your SQL can move to any Postgres host. Firebase is a proprietary Google platform, and moving off Firestore means rewriting your data layer.",
        },
      ],
    },
    {
      id: "auth",
      title: "Authentication",
      blocks: [
        {
          p: "Both platforms ship complete authentication: email and password, magic links, OAuth providers such as Google and GitHub, and phone sign-in. The difference is where the user lives. In Supabase, users are stored in your Postgres database, so your own tables can reference them with foreign keys and your RLS policies can read the signed-in user directly. In Firebase, users live in Firebase Authentication, separate from Firestore, and your Security Rules read the user from the request.",
        },
        {
          p: "For B2B SaaS, the Supabase model makes organisation membership simple to express: a memberships table that links users to organisations, and policies that check it.",
        },
      ],
    },
    {
      id: "realtime",
      title: "Realtime features",
      blocks: [
        {
          p: "Both support live updates. Firestore's realtime listeners are central to how Firebase apps are built, and they work offline on mobile. Supabase Realtime can stream database changes to clients, and also offers broadcast messages and presence for features like live cursors or who-is-online lists. For dashboards, notifications and collaborative screens in a SaaS, either is enough; for offline-first mobile apps, Firebase has the edge.",
        },
      ],
    },
    {
      id: "migrating",
      title: "Moving from Firebase to Supabase",
      blocks: [
        {
          p: "If you started on Firebase and your data has become relational, moving is possible but it is a project, not a switch. The main steps are exporting users, reshaping Firestore documents into tables, moving files from Firebase Storage, and rewriting Security Rules as RLS policies. Supabase publishes [migration guides](https://supabase.com/docs/guides/platform/migrating-to-supabase) for these steps. Plan it as a milestone with a test migration before the real one.",
        },
      ],
    },
    {
      id: "ai",
      title: "AI features",
      blocks: [
        {
          p: "Both now support vector search. With Supabase, embeddings live in the same Postgres database as your relational data via pgvector, protected by the same RLS policies, which makes permission-aware retrieval straightforward. I walk through it in [how to build a RAG chatbot with OpenAI and pgvector](/blog/rag-chatbot-openai-pgvector).",
        },
      ],
    },
    {
      id: "mistakes",
      title: "Mistakes that hurt on either platform",
      blocks: [
        {
          p: "Neither platform is safe or fast by default. The same handful of problems shows up in projects on both, and they are worth checking whichever you choose:",
        },
        {
          ul: [
            "**Admin credentials in the wrong place.** Firebase's Admin SDK and Supabase's service-role key both bypass your access rules. Use them only in server code that has already checked who the user is, and never ship them to the browser.",
            "**Rules that only check sign-in.** A rule or policy that allows any signed-in user is not tenant isolation. Each check has to compare the record's owner or organisation with the current user.",
            "**Copies of data that drift.** Denormalising in Firestore, or caching counts in Postgres, means two places to update. Decide which copy is the source of truth and update the other from it.",
            "**Missing indexes.** Slow dashboards on Supabase are often a missing index on the column your policies and queries filter by; on Firestore, composite queries need their indexes declared.",
            "**Testing only as the owner.** Test with a second account in a different organisation. If it can see the first account's data, your rules are wrong.",
          ],
        },
      ],
    },
    {
      id: "real-project",
      title: "What the choice looked like on a real project",
      blocks: [
        {
          p: "On the [World Teachers Academy job portal](/case-studies/world-teachers-academy), jobs are ingested every night from Adzuna and Reed into Supabase, candidates are captured as leads before they reach the apply link, and the blog is stored in the database instead of hardcoded templates. Jobs, sources, leads and posts relate to each other, and the business wants to ask questions across them, which is exactly the relational shape Postgres is built for.",
        },
        {
          p: "Scheduled ingestion also fits Supabase well: a job writes new listings straight into tables that the Next.js site reads on the server, with no separate sync layer in between.",
        },
      ],
    },
    {
      id: "checklist",
      title: "A checklist to decide in ten minutes",
      blocks: [
        { p: "Answer these about your product. Mostly yes on the first four points to Supabase; mostly yes on the last two points to Firebase." },
        {
          ol: [
            "Do customers sign up as organisations with members and roles?",
            "Will you need reports that combine data across several record types, such as revenue per plan per month?",
            "Do you want the option to move your database to another host later?",
            "Will AI features search your users' own data, with the same permissions as the rest of the app?",
            "Is the product mainly a mobile app that must work offline and sync later?",
            "Is your data mostly self-contained documents, such as user profiles or chat messages, with few relationships between them?",
          ],
        },
      ],
    },
    {
      id: "recommendation",
      title: "My recommendation",
      blocks: [
        {
          ul: [
            "**Choose Supabase** for B2B SaaS, dashboards, multi-tenant products, reporting and AI over relational data.",
            "**Choose Firebase** for mobile-first consumer apps that need offline sync and simple, document-shaped data.",
          ],
        },
        {
          p: "I build SaaS products on Next.js and Supabase, including [LeadsMind, an all-in-one CRM and LMS platform](/case-studies/leadsmind), and World Teachers Academy. If you are starting a product, see my [Next.js developer service](/services/nextjs-developer); if you already run on Supabase and want the schema or policies reviewed, see my [Supabase developer service](/services/supabase-developer).",
        },
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      blocks: [
        {
          p: "The choice comes down to the shape of your data and where your users are. Relational, multi-tenant data with reporting and AI on top points to Supabase and Postgres. Offline-first mobile apps with document-shaped data point to Firebase. Whichever you pick, the security work is the same in spirit: rules enforced by the platform, tested with a second account, and admin credentials kept on the server.",
        },
      ],
    },
  ],
  sources: [
    { label: "Supabase documentation", href: "https://supabase.com/docs" },
    { label: "Firebase Security Rules", href: "https://firebase.google.com/docs/rules" },
    { label: "Supabase pricing", href: "https://supabase.com/pricing" },
    { label: "Firebase pricing", href: "https://firebase.google.com/pricing" },
  ],
};
