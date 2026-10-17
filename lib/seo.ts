import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const BRAND = "Zain Ul Hassan";

type BuildMetadataInput = {
  /** Page title without the brand suffix (the suffix is added here). Ignored when `absoluteTitle` is set. */
  title: string;
  description: string;
  /** Route path, e.g. "/services/ai-developer" ("/" for home). */
  path: string;
  /** Full title used as-is (home page). */
  absoluteTitle?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export const absoluteUrl = (path: string) => (path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`);

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${BRAND}`;
  const url = absoluteUrl(path);
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: BRAND,
      locale: "en_US",
      title: fullTitle,
      description,
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime, authors: [`${SITE.url}/about`] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
