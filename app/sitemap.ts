import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { allCaseStudies } from "@/content/case-studies";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";
import { SITE_UPDATED } from "@/lib/site";

export const dynamic = "force-static";

const latest = (dates: string[]) => dates.reduce((d, x) => (x > d ? x : d), SITE_UPDATED);

/**
 * Canonical, 200-status URLs only (no redirects such as the old /work/* paths).
 * lastModified comes from content dates, never from the build time; a hub page
 * changes whenever one of the pages it lists changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = latest(posts.map((p) => p.dateModified));
  const latestCase = latest(allCaseStudies.map((c) => c.dateModified));
  const latestService = latest(services.map((s) => s.dateModified));

  return [
    { url: absoluteUrl("/"), lastModified: latest([latestPost, latestCase, latestService]), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified: latestService, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: s.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: absoluteUrl("/case-studies"), lastModified: latestCase, changeFrequency: "monthly", priority: 0.7 },
    ...allCaseStudies.map((c) => ({
      url: absoluteUrl(`/case-studies/${c.slug}`),
      lastModified: c.dateModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: absoluteUrl("/blog"), lastModified: latestPost, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: absoluteUrl("/about"), lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/hire"), lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.6 },
  ];
}
