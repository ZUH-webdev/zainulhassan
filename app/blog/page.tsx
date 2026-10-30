import CtaButtons from "@/components/CtaButtons";
import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import PageHeader from "@/components/PageHeader";
import Related from "@/components/Related";
import { posts, readingMinutes } from "@/content/blog";
import { breadcrumbNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const path = "/blog";
const title = "Blog: SaaS, AI and Supabase Development";
const description =
  "Practical guides on building SaaS and AI products: MVP scope and cost, Supabase security, RAG chatbots, hiring AI developers and Stripe or Paystack.";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path },
];

export const metadata = buildMetadata({ title, description, path });

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

export default function BlogPage() {
  return (
    <main>
      <JsonLd
        data={graph(
          { ...webPageNode(path, title, description, "CollectionPage"), breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` } },
          {
            "@type": "Blog",
            "@id": `${absoluteUrl(path)}#blog`,
            name: "Zain Ul Hassan's blog",
            url: absoluteUrl(path),
            author: { "@id": ids.person },
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absoluteUrl(`/blog/${p.slug}`),
              datePublished: p.datePublished,
              dateModified: p.dateModified,
              author: { "@id": ids.person },
            })),
          },
          breadcrumbNode(crumbs),
        )}
      />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Blog"
        title="Guides on Building SaaS and AI Products"
        lead="Practical, first-hand guides on building SaaS and AI products: how to scope and price an MVP, secure Supabase with Row Level Security, build RAG chatbots, hire an AI developer and choose between Stripe and Paystack."
      >
        <CtaButtons location="blog" />
      </PageHeader>
      <Related
        id="posts"
        eyebrow="Latest"
        title="All articles"
        items={posts.map((p) => ({
          href: `/blog/${p.slug}`,
          kicker: `${fmt(p.datePublished)} · ${readingMinutes(p)} min read`,
          title: p.title,
          text: p.description,
          cta: "Read the article",
        }))}
      />
      <PageCta location="blog" />
    </main>
  );
}
