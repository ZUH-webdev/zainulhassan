import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ClientCaseStudy from "@/components/work/ClientCaseStudy";
import { flutron as s } from "@/content/work/flutron";
import { breadcrumbNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const path = `/work/${s.slug}`;
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/#work" },
  { name: s.client, path },
];

export async function generateMetadata(): Promise<Metadata> {
  const base = buildMetadata({
    title: s.metaTitle,
    description: s.metaDescription,
    path,
    type: "article",
    publishedTime: s.datePublished,
    modifiedTime: s.dateModified,
  });
  const image = { url: absoluteUrl(s.hero.src), width: s.hero.width, height: s.hero.height, alt: s.hero.alt };
  return {
    ...base,
    openGraph: { ...base.openGraph, images: [image] },
    twitter: { ...base.twitter, images: [image] },
  };
}

export default function FlutronCaseStudy() {
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
            image: absoluteUrl(s.hero.src),
            datePublished: s.datePublished,
            dateModified: s.dateModified,
            author: { "@id": ids.person },
            publisher: { "@id": ids.person },
            mainEntityOfPage: { "@id": `${url}#webpage` },
            about: {
              "@type": "CreativeWork",
              "@id": `${url}#work`,
              name: `${s.client} website`,
              url: s.siteUrl,
              creator: { "@id": ids.person },
              ...(s.stack.length > 0 ? { keywords: s.stack.join(", ") } : {}),
            },
          },
          breadcrumbNode(crumbs),
        )}
      />
      <ClientCaseStudy study={s} crumbs={crumbs} />
    </main>
  );
}
