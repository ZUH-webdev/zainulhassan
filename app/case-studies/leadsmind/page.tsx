import type { Metadata } from "next";
import CaseStudyPager from "@/components/CaseStudyPager";
import JsonLd from "@/components/JsonLd";
import FlagshipCaseStudy from "@/components/work/FlagshipCaseStudy";
import { leadsmind as s } from "@/content/work/leadsmind";
import { breadcrumbNode, faqNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { SITE, sameAs } from "@/lib/site";

/* Flagship layout. This static route takes precedence over /case-studies/[slug], which skips entries with `ownRoute`. */
const path = `/case-studies/${s.slug}`;
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Case studies", path: "/case-studies" },
  { name: "LeadsMind", path },
];

/* Full title as specified for this page (no brand suffix, under 60 chars). */
export const metadata: Metadata = buildMetadata({
  title: s.metaTitle,
  absoluteTitle: s.metaTitle,
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
            "@type": "Article",
            "@id": `${url}#article`,
            headline: s.title,
            description: s.metaDescription,
            url,
            image: absoluteUrl(`${path}/opengraph-image`),
            author: { "@type": "Person", "@id": ids.person, name: SITE.name, url: absoluteUrl("/about"), sameAs },
            publisher: { "@id": ids.person },
            datePublished: s.datePublished,
            dateModified: s.dateModified,
            inLanguage: "en",
            // The assistant's name (e.g. "LENA") from its section title.
            keywords: [...s.stack, ...(s.assistant ? [s.assistant.title.replace(/:.*/, "")] : [])].join(", "),
            mainEntityOfPage: { "@id": `${url}#webpage` },
            // The product this case study is about. No ratings or offers: this is not the product's own page.
            about: {
              "@type": "SoftwareApplication",
              name: "LeadsMind",
              applicationCategory: "BusinessApplication",
              ...(s.officialSite ? { url: s.officialSite.href } : {}),
            },
          },
          ...(s.faqs?.length ? [faqNode(path, s.faqs)] : []),
          breadcrumbNode(crumbs),
        )}
      />
      <FlagshipCaseStudy study={s} crumbs={crumbs} />
      <CaseStudyPager slug={s.slug} />
    </main>
  );
}
