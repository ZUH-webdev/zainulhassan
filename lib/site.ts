/**
 * Single source of truth for contact details and links.
 * Never hardcode a URL or the email inside a component; import from here.
 */
/**
 * Absolute base URL, resolved at build time (no domain is hardcoded):
 * 1. NEXT_PUBLIC_SITE_URL (set this to your production domain)
 * 2. Vercel's production domain (set automatically on Vercel)
 * 3. http://localhost:3000 for local builds
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/+$/, "");

/** Index only production. Vercel preview/development deployments are noindex. */
export const isIndexable = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

export const SITE = {
  name: "Zain Ul Hassan",
  url: siteUrl,
  email: "zainulhassan5857@gmail.com",
  upwork: "https://www.upwork.com/freelancers/~01143c0f702d75da0d",
  github: "https://github.com/ZUH-webdev",
  linkedin: "https://www.linkedin.com/in/zain-ul-hassan-dev/",
  youtube: "", // not provided yet: YouTube links render only when this is set
  mailSubject: "Project inquiry from your portfolio",
} as const;

export const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(SITE.mailSubject)}`;

/** Spread on every external link: opens in a new tab safely. */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Same one-sentence bio everywhere (site, Upwork, LinkedIn, GitHub) for a consistent entity. */
export const BIO =
  "Zain Ul Hassan is a Senior Full Stack Developer building AI-powered SaaS applications with Next.js, Supabase and the OpenAI and Claude APIs, Top Rated on Upwork with a 100% Job Success Score.";

export const TRUST = ["Top Rated on Upwork", "100% Job Success", "4+ years"] as const;

/** Date the site content was last substantively updated (used for sitemap lastModified). */
export const SITE_UPDATED = "2026-10-17";

/** Profiles for JSON-LD sameAs (YouTube only once it is set). */
export const sameAs: string[] = [SITE.upwork, SITE.github, SITE.linkedin, ...(SITE.youtube ? [SITE.youtube] : [])];

/** Portrait used in the About section and as the Person schema image. */
export const PHOTO = { src: "/ZUH.png", width: 1254, height: 1254 } as const;

/**
 * Show real client testimonials (content/testimonials.ts) on the homepage and on case studies.
 * Keep false until every entry there is real and published with the client's permission.
 * While false, the homepage shows the "Track record" section instead.
 */
export const SHOW_TESTIMONIALS = false;
