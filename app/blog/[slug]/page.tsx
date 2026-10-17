import { notFound } from "next/navigation";
import CtaButtons from "@/components/CtaButtons";
import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import PageHeader from "@/components/PageHeader";
import Related from "@/components/Related";
import { Blocks } from "@/components/Rich";
import { postBySlug, posts, readingMinutes } from "@/content/blog";
import { serviceBySlug } from "@/content/services";
import { breadcrumbNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { external } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const p = postBySlug((await params).slug);
  if (!p) return {};
  return buildMetadata({
    title: p.metaTitle,
    description: p.description,
    path: `/blog/${p.slug}`,
    type: "article",
    publishedTime: p.datePublished,
    modifiedTime: p.dateModified,
  });
}

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function PostPage({ params }: Props) {
  const p = postBySlug((await params).slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: p.title, path },
  ];
  const service = serviceBySlug(p.service)!;
  const minutes = readingMinutes(p);

  return (
    <main>
      <JsonLd
        data={graph(
          { ...webPageNode(path, p.title, p.description), breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` } },
          {
            "@type": "BlogPosting",
            "@id": `${absoluteUrl(path)}#article`,
            headline: p.title,
            description: p.description,
            datePublished: p.datePublished,
            dateModified: p.dateModified,
            author: { "@id": ids.person },
            publisher: { "@id": ids.person },
            image: absoluteUrl(`${path}/opengraph-image`),
            mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` },
            keywords: p.keyword,
            timeRequired: `PT${minutes}M`,
            inLanguage: "en",
          },
          breadcrumbNode(crumbs),
        )}
      />

      <PageHeader crumbs={crumbs} eyebrow="Guide" title={p.title}>
        <p className="mono pmeta">
          By <a href="/about">Zain Ul Hassan</a> · Published <time dateTime={p.datePublished}>{fmt(p.datePublished)}</time> ·
          Updated <time dateTime={p.dateModified}>{fmt(p.dateModified)}</time> · {minutes} min read
        </p>
        <CtaButtons location="blog-post" />
      </PageHeader>

      <article className="wrap postgrid" style={{ paddingTop: 24 }}>
        <div className="prose">
          <p className="answer">{p.intro}</p>

          {/* <1024px: collapsible table of contents */}
          <details className="toc tocm">
            <summary className="mono">On this page</summary>
            <ol>
              {p.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </details>

          {p.sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`} className="ah2">
                {s.title}
              </h2>
              <Blocks blocks={s.blocks} />
            </section>
          ))}

          {p.sources.length > 0 && (
            <section aria-labelledby="sources-h">
              <h2 id="sources-h" className="ah2">
                Sources
              </h2>
              <ul>
                {p.sources.map((src) => (
                  <li key={src.href}>
                    <a href={src.href} {...external}>
                      {src.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* >=1024px: sticky sidebar table of contents */}
        <aside className="toca">
          <nav className="toc" aria-labelledby="toc-h">
            <p id="toc-h" className="mono">
              On this page
            </p>
            <ol>
              {p.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </article>

      <Related
        id="next"
        eyebrow="Keep reading"
        title="Related service and articles"
        items={[
          {
            href: `/services/${service.slug}`,
            kicker: "Service",
            title: service.h1.replace(/:.*/, ""),
            text: service.summary,
            cta: "See the service",
          },
          ...p.related.map((slug) => {
            const r = postBySlug(slug)!;
            return { href: `/blog/${r.slug}`, kicker: "Guide", title: r.title, text: r.description, cta: "Read the article" };
          }),
        ]}
      />

      <PageCta location="blog-post" />
    </main>
  );
}
