/**
 * Real client testimonials. Add an entry only with the client's permission, quoted exactly as they wrote it.
 * They appear on the homepage (and on the matching case study when `project.href` is `/case-studies/<slug>`)
 * once SHOW_TESTIMONIALS in lib/site.ts is set to true.
 *
 * Three Upwork reviews were quoted on the site before, without names. Add them back here once each
 * client confirms their name, role and company:
 *  - "It was a real pleasure working with Zain. Not only is he knowledgeable, but he is also proactive in
 *    suggesting ideas based on his expertise. He is professional, committed, and has a really fast turnaround.
 *    I will definitely work with him again!"
 *  - "Great guy to work with and I really can vouch for Zain 100%."
 *  - "Amazing work, reliable, cooperative, will work together again."
 */

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  /** The project this review is about: a case study path (e.g. "/case-studies/leadsmind") or an external URL. */
  project?: { label: string; href: string };
};

export const testimonials: Testimonial[] = [];

/** The published quote for a case study, if one exists. */
export const testimonialForCaseStudy = (slug: string) =>
  testimonials.find((t) => t.project?.href === `/case-studies/${slug}`);
