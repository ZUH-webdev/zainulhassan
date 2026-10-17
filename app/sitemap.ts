import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";
import { SITE_UPDATED } from "@/lib/site";

export const dynamic = "force-static";

/** lastModified comes from content dates, never from the build time. */
export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts.reduce((d, p) => (p.dateModified > d ? p.dateModified : d), SITE_UPDATED);
  const latestCase = caseStudies.reduce((d, c) => (c.dateModified > d ? c.dateModified : d), SITE_UPDATED);

  return [
    { url: absoluteUrl("/"), lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: absoluteUrl("/case-studies"), lastModified: latestCase, changeFrequency: "monthly", priority: 0.7 },
    ...caseStudies.map((c) => ({
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
    { url: absoluteUrl("/contact"), lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.6 },
  ];
}
