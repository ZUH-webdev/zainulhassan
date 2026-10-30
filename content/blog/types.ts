import type { Section } from "@/content/blocks";

export type Post = {
  slug: string;
  /** H1 shown on the page. */
  title: string;
  /** Short descriptive label for footer and other compact link lists. */
  shortTitle: string;
  /** Title tag without brand suffix (at most 42 chars, so the full title stays under 60). */
  metaTitle: string;
  description: string;
  keyword: string;
  datePublished: string;
  dateModified: string;
  /** Matching service page slug. */
  service: string;
  /** Case study linked from the "Keep reading" block. */
  caseStudy: string;
  related: string[];
  /** Answer-first opening paragraph. */
  intro: string;
  sections: Section[];
  sources: { label: string; href: string }[];
};
