import { notFound } from "next/navigation";
import CtaButtons from "@/components/CtaButtons";
import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import PageHeader from "@/components/PageHeader";
import Related from "@/components/Related";
import { Blocks } from "@/components/Rich";
import { caseStudies, caseStudyBySlug } from "@/content/case-studies";
import { serviceBySlug } from "@/content/services";
import { breadcrumbNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { external } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const c = caseStudyBySlug((await params).slug);
  if (!c) return {};
  return buildMetadata({
    title: c.metaTitle,
    description: c.description,
    path: `/case-studies/${c.slug}`,
    type: "article",
    publishedTime: c.datePublished,
    modifiedTime: c.dateModified,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const c = caseStudyBySlug((await params).slug);
  if (!c) notFound();
  const path = `/case-studies/${c.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/case-studies" },
    { name: c.name, path },
  ];

  return (
    <main>
      <JsonLd
        data={graph(
          { ...webPageNode(path, c.h1, c.description), breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` } },
          {
            "@type": "Article",
            "@id": `${absoluteUrl(path)}#article`,
            headline: c.h1,
            description: c.description,
            author: { "@id": ids.person },
            publisher: { "@id": ids.person },
            datePublished: c.datePublished,
            dateModified: c.dateModified,
            image: absoluteUrl(`${path}/opengraph-image`),
            mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` },
            about: c.stack,
          },
          breadcrumbNode(crumbs),
        )}
      />

      <PageHeader crumbs={crumbs} eyebrow={c.kicker} title={c.h1} lead={c.intro}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
          {c.stack.map((t) => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>
        {c.link && (
          <p className="mono" style={{ margin: "20px 0 0", fontSize: 13 }}>
            <a className="tl" href={c.link.href} {...external}>
              {c.link.label}
            </a>
          </p>
        )}
        <CtaButtons location="case-study" />
      </PageHeader>

      <article className="wrap" style={{ paddingTop: 56 }}>
        <div className="prose">
          {c.sections.map((sec) => (
            <section key={sec.id} id={sec.id} aria-labelledby={`${sec.id}-h`}>
              <h2 id={`${sec.id}-h`} className="ah2">
                {sec.title}
              </h2>
              <Blocks blocks={sec.blocks} />
            </section>
          ))}
          <section aria-labelledby="testimonial-h">
            <h2 id="testimonial-h" className="ah2">
              What the client said
            </h2>
            <blockquote>
              <p>[CLIENT TESTIMONIAL]</p>
              <cite>[Client name], [Role]</cite>
            </blockquote>
          </section>
        </div>
      </article>

      <Related
        id="proves"
        eyebrow="Services"
        title="The services this project proves"
        items={c.services.map((slug) => {
          const s = serviceBySlug(slug)!;
          return { href: `/services/${s.slug}`, kicker: "Service", title: s.h1.replace(/:.*/, ""), text: s.summary, cta: "See the service" };
        })}
      />

      <Related
        id="more-work"
        eyebrow="More work"
        title="Other case studies"
        items={caseStudies
          .filter((o) => o.slug !== c.slug)
          .map((o) => ({ href: `/case-studies/${o.slug}`, kicker: o.kicker, title: o.name, text: o.summary, cta: "Read the case study" }))}
      />

      <PageCta location="case-study" />
    </main>
  );
}
