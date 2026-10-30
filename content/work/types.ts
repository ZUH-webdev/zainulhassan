/**
 * Case study shape for /work/[slug].
 * Empty strings and empty arrays hide their section on the page.
 */
export type CaseStudy = {
  slug: string;
  title: string;
  /** Meta title without the brand suffix (50-60 chars with it). */
  metaTitle: string;
  /** Meta description, 120-160 chars. */
  metaDescription: string;
  /** Short label shown above the title: "Concept project" or "Client project". */
  badge: string;
  pitch: string;
  type: string;
  role: string;
  timeline: string;
  stack: string[];
  demoUrl: string;
  /** Screenshot paths under /public. */
  images: string[];
  problem: string;
  features: { title: string; description: string }[];
  /** Ordered steps of the product or customer process. */
  process?: string[];
  architecture: string;
  decisions: { title: string; why: string }[];
  challenges: { challenge: string; solution: string }[];
  roadmap: string[];
  /** Verified outcomes only, never estimates. */
  results?: string[];

  /* Flagship fields (e.g. LeadsMind). Optional, so concept projects are unaffected. */
  /** Meta row value, e.g. "12 milestones". */
  engagement?: string;
  /** Product modules: a card in the "at a glance" grid plus a detail block. A module with no summary is hidden. */
  modules?: { id: string; title: string; summary: string; bullets: string[]; detail: string; image: string }[];
  security?: string[];
  howIWorked?: string;
  /** Review badge text. Never name the client. */
  review?: string;
  /** Exact review text, only with the client's permission. Rendered without attribution. */
  clientQuote?: string;
  /** Screenshots under /public. Files that don't exist yet are skipped at build time. */
  gallery?: { src: string; alt: string }[];
  cta?: string;
  next?: { href: string; title: string } | null;
  datePublished?: string;
  dateModified?: string;
};

/**
 * Client case study shape for dedicated /work/<slug> pages (e.g. /work/flutron).
 * Same rule as above: empty strings and empty arrays hide their item or section, so
 * unconfirmed copy can sit in the data file as "" and never reach the page.
 */
export type ClientCaseStudy = {
  slug: string;
  client: string;
  /** Live site, linked from the hero and credited in JSON-LD. */
  siteUrl: string;
  /** Meta title without the brand suffix (50-60 chars with it). */
  metaTitle: string;
  /** Meta description, 120-155 chars. */
  metaDescription: string;
  eyebrow: string;
  title: string;
  summary: string;
  /** Short line for cards on the homepage and the case studies index. */
  kicker: string;
  cardBody: string;
  cardBullets: string[];
  role: string;
  timeline: string;
  /** Optional screenshot; when omitted the page shows no hero image and uses the default OG image. */
  hero?: { src: string; alt: string; width: number; height: number };
  challenge: string;
  /** `detail` is appended to `body` when set. */
  features: { title: string; body: string; detail: string }[];
  process: { intro: string; steps: { title: string; body: string }[] };
  stack: string[];
  decisions: { title: string; why: string }[];
  /** Tiles with an empty value are skipped; no tiles hides the section. */
  results: { value: string; label: string }[];
  cta: string;
  next: { href: string; title: string } | null;
  datePublished: string;
  dateModified: string;
};
