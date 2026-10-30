import { pulse } from "./pulse";
import { sentinel } from "./sentinel";
import type { CaseStudy } from "./types";

export type { CaseStudy, ClientCaseStudy } from "./types";

/** Concept projects rendered by /case-studies/[slug]. Client case studies (e.g. flutron) have their own route. */
export const work: CaseStudy[] = [pulse, sentinel];

export const workBySlug = (slug: string) => work.find((w) => w.slug === slug);
