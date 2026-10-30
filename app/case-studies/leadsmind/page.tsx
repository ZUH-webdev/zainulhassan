import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FlagshipCaseStudy from "@/components/work/FlagshipCaseStudy";
import { leadsmind as s } from "@/content/work/leadsmind";
import { breadcrumbNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

/* Flagship layout. This static route takes precedence over /case-studies/[slug], which skips entries with `ownRoute`. */
const path = `/case-studies/${s.slug}`;
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Case studies", path: "/case-studies" },
  { name: "LeadsMind", path },
];

export const metadata: Metadata = buildMetadata({
  title: s.metaTitle,
  description: s.metaDescription,
  path,
  type: "article",
  publishedTime: s.datePublished,
  modifiedTime: s.dateModified,
});

export default function LeadsMindCaseStudy() {
  const url = absoluteUrl(path);
  return (
    <main>
      <JsonLd
        data={graph(
          { ...webPageNode(path, s.title, s.metaDescription), breadcrumb: { "@id": `${url}#breadcrumb` } },
          {
            "@type": "CreativeWork",
            "@id": `${url}#work`,
            name: s.title,
            headline: s.title,
            description: s.metaDescription,
            url,
            image: absoluteUrl(`${path}/opengraph-image`),
            author: { "@id": ids.person },
            creator: { "@id": ids.person },
            publisher: { "@id": ids.person },
            datePublished: s.datePublished,
            dateModified: s.dateModified,
            inLanguage: "en",
            keywords: s.stack.join(", "),
            mainEntityOfPage: { "@id": `${url}#webpage` },
          },
          breadcrumbNode(crumbs),
        )}
      />
      <FlagshipCaseStudy study={s} crumbs={crumbs} />
    </main>
  );
}
