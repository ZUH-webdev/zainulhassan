/**
 * Single source of truth for contact details and links.
 * Never hardcode a URL or the email inside a component; import from here.
 */
export const SITE = {
  name: "Zain Ul Hassan",
  url: "https://zainulhassan.site",
  email: "zainulhassan5857@gmail.com",
  upwork: "https://www.upwork.com/freelancers/~01143c0f702d75da0d",
  github: "https://github.com/ZUH-webdev/",
  linkedin: "https://www.linkedin.com/in/zain-ul-hassan-dev/",
  youtube: "", // not provided yet: YouTube links render only when this is set
  mailSubject: "Project inquiry from your portfolio",
} as const;

export const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(SITE.mailSubject)}`;

/** Spread on every external link: opens in a new tab safely. */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Profiles for JSON-LD sameAs (YouTube only once it is set). */
export const sameAs: string[] = [SITE.upwork, SITE.github, SITE.linkedin, ...(SITE.youtube ? [SITE.youtube] : [])];

/* ---------- content placeholders still to fill in ---------- */

export const photoNote = "[Replace with your photo]";

export const testimonials = [
  {
    quote: "[Paste your 5-star Upwork review for LeadsMind here]",
    author: "[Client name], [Role]",
    source: "Upwork contract",
  },
  {
    quote: "[Paste a second client review here]",
    author: "[Client name], [Role]",
    source: "Upwork contract",
  },
  {
    quote: "[Paste a third client review here]",
    author: "[Client name], [Role]",
    source: "Upwork contract",
  },
];
