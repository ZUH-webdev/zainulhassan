import type { CaseStudy } from "./types";

export const sentinel: CaseStudy = {
  slug: "sentinel",
  title: "Sentinel",
  metaTitle: "Sentinel: Supabase Security Scanner Concept",
  metaDescription:
    "Sentinel is a concept SaaS that audits Supabase and Postgres apps for missing RLS, weak policies and exposed endpoints. The problem, architecture and decisions.",
  badge: "Concept project",
  pitch: "A security scanner that audits Supabase and Postgres apps for exposed data, weak access rules and risky endpoints.",
  type: "Concept SaaS",
  role: "Product design and full-stack development",
  timeline: "",
  stack: ["Next.js", "TypeScript", "Supabase (Postgres, Auth, Edge Functions)", "Node.js", "OpenAI API", "Tailwind CSS"],
  demoUrl: "",
  images: [],
  problem:
    "Fast-moving teams ship apps on Supabase and forget to lock them down. Tables without row level security, permissive policies and unprotected API routes are easy to miss and costly when found by someone else. Sentinel explores an automated way to find those gaps and explain exactly how to fix them.",
  features: [
    { title: "Row level security audit", description: "Detects tables with RLS disabled or policies that let any signed-in user read or write other users' rows." },
    { title: "Endpoint exposure check", description: "Flags API routes and functions that respond without authentication or ownership checks." },
    { title: "Severity-ranked findings", description: "Each issue is rated critical, high, medium or low, with the reason it matters." },
    { title: "Plain-language fixes", description: "Every finding includes a clear explanation and a suggested SQL or code fix." },
    { title: "Read-only by design", description: "Scans run with a limited, read-only connection and never modify the target project." },
    { title: "Shareable PDF report", description: "Export a clean report for a client, a founder or a compliance review." },
  ],
  architecture:
    "A Next.js dashboard triggers scan jobs that run in Edge Functions. A scanner inspects the target's schema, policies and exposed routes using a restricted read-only credential, stores findings in Postgres, and an LLM rewrites each finding into a clear explanation and fix. Credentials are encrypted at rest and never logged.",
  decisions: [
    { title: "Read-only access only", why: "A security tool must never become a risk itself, so it cannot change anything in the project it scans." },
    { title: "Deterministic checks first, AI second", why: "Rules find the issues reliably, and the LLM is used only to explain and suggest fixes, which keeps results trustworthy." },
    { title: "Severity scoring", why: "Teams act on a short ranked list, not a wall of warnings." },
  ],
  challenges: [
    { challenge: "Avoiding false positives that would make users ignore the tool.", solution: "Every rule checks the actual policy expression rather than just whether RLS is on, and findings show the evidence behind them." },
    { challenge: "Handling sensitive connection credentials safely.", solution: "Encrypt at rest, scope them to read-only, and redact them from logs and error reports." },
  ],
  roadmap: [
    "Scheduled re-scans with change alerts",
    "CI integration to block deploys that introduce new issues",
    "Support for additional databases beyond Supabase",
  ],
};
