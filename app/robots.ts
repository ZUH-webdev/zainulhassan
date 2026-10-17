import type { MetadataRoute } from "next";
import { SITE, isIndexable } from "@/lib/site";

export const dynamic = "force-static";

/**
 * AI crawlers allowed explicitly so the site can be cited by AI answers.
 * To opt out of any of them, move it to BLOCKED_AI_CRAWLERS.
 */
const ALLOWED_AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Google-Extended",
  "ClaudeBot",
  "anthropic-ai",
];
const BLOCKED_AI_CRAWLERS: string[] = [];

export default function robots(): MetadataRoute.Robots {
  // Preview / development deployments must never be indexed.
  if (!isIndexable) return { rules: [{ userAgent: "*", disallow: "/" }] };

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...ALLOWED_AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
      ...BLOCKED_AI_CRAWLERS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
