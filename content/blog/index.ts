import { wordCount } from "@/content/blocks";
import { post as hireAi } from "./hire-ai-developer";
import { post as rag } from "./rag-chatbot";
import { post as cost } from "./saas-mvp-cost";
import { post as rls } from "./supabase-rls-mistakes";
import { post as vsFirebase } from "./supabase-vs-firebase";
import { post as stripePaystack } from "./stripe-vs-paystack";
import type { Post } from "./types";
import { post as whatIsMvp } from "./what-is-mvp";

export type { Post } from "./types";

/** Newest first (ties keep this order). */
export const posts: Post[] = [cost, whatIsMvp, rls, hireAi, vsFirebase, rag, stripePaystack].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished),
);

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const readingMinutes = (p: Post) => Math.max(1, Math.round(wordCount(p.intro, p.sections) / 220));
