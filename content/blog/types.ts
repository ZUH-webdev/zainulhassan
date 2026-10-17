import type { Section } from "@/content/blocks";

export type Post = {
  slug: string;
  /** H1 shown on the page. */
  title: string;
  /** Title tag without brand suffix (33-43 chars). */
  metaTitle: string;
  description: string;
  keyword: string;
  datePublished: string;
  dateModified: string;
  /** Matching service page slug. */
  service: string;
  related: string[];
  /** Answer-first opening paragraph. */
  intro: string;
  sections: Section[];
  sources: { label: string; href: string }[];
};
