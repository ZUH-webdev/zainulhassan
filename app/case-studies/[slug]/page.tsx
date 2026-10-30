import { notFound } from "next/navigation";
import CaseStudyPager from "@/components/CaseStudyPager";
import CtaButtons from "@/components/CtaButtons";
import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import PageHeader from "@/components/PageHeader";
import Related from "@/components/Related";
import { Blocks } from "@/components/Rich";
import ConceptCaseStudy from "@/components/work/ConceptCaseStudy";
import { caseStudies, caseStudyBySlug } from "@/content/case-studies";
import { serviceBySlug } from "@/content/services";
import { testimonialForCaseStudy } from "@/content/testimonials";
import { work, workBySlug } from "@/content/work";
import { breadcrumbNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { SHOW_TESTIMONIALS, external } from "@/lib/site";

export const dynamicParams = false;

/** Client case studies from content/case-studies.ts plus concept projects from content/work. */
export function generateStaticParams() {
  return [...caseStudies.filter((c) => !c.ownRoute), ...work].map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const path = `/case-studies/${slug}`;
  const c = caseStudyBySlug(slug);
  if (c)
    return buildMetadata({
      title: c.metaTitle,
      description: c.description,
      path,
      type: "article",
      publishedTime: c.datePublished,
      modifiedTime: c.dateModified,
    });
  const w = workBySlug(slug);
  return w ? buildMetadata({ title: w.metaTitle, description: w.metaDescription, path }) : {};
}

/** "The services this project proves" cards. */
function ServiceLinks({ slugs }: { slugs: string[] }) {
  if (slugs.length === 0) return null;
  return (
    <Related
      id="proves"
      eyebrow="Services"
      title="The services this project proves"
      items={slugs.map((slug) => {
        const s = serviceBySlug(slug)!;
        return { href: `/services/${s.slug}`, kicker: "Service", title: s.name, text: s.summary, cta: `See the ${s.name.toLowerCase()} service` };
      })}
    />
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const slug = (await params).slug;
  const path = `/case-studies/${slug}`;
  const c = caseStudyBySlug(slug);
  const w = c ? undefined : workBySlug(slug);
  if (!c && !w) notFound();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/case-studies" },
    { name: c?.name ?? w!.title, path },
  ];

  if (w)
    return (
      <main>
        <JsonLd
          data={graph(
            { ...webPageNode(path, w.title, w.metaDescription), breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` } },
            {
              "@type": "CreativeWork",
              "@id": `${absoluteUrl(path)}#work`,
              name: w.title,
              description: w.pitch,
              creator: { "@id": ids.person },
              mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` },
              keywords: w.stack.join(", "),
            },
            breadcrumbNode(crumbs),
          )}
        />
        <ConceptCaseStudy study={w} crumbs={crumbs} />
        <ServiceLinks slugs={w.services ?? []} />
        <CaseStudyPager slug={slug} />
        <PageCta location="case-study" />
      </main>
    );

  const cs = c!;
  const quote = SHOW_TESTIMONIALS ? testimonialForCaseStudy(cs.slug) : undefined;
  return (
    <main>
      <JsonLd
        data={graph(
          { ...webPageNode(path, cs.h1, cs.description), breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` } },
          {
            "@type": "Article",
            "@id": `${absoluteUrl(path)}#article`,
            headline: cs.h1,
            description: cs.description,
            author: { "@id": ids.person },
            publisher: { "@id": ids.person },
            datePublished: cs.datePublished,
            dateModified: cs.dateModified,
            image: absoluteUrl(`${path}/opengraph-image/og`),
            mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` },
            about: cs.stack,
          },
          breadcrumbNode(crumbs),
        )}
      />

      <PageHeader crumbs={crumbs} eyebrow={cs.kicker} title={cs.h1} lead={cs.intro}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
          {cs.stack.map((t) => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>
        {cs.link && (
          <p className="mono" style={{ margin: "20px 0 0", fontSize: 13 }}>
            <a className="tl" href={cs.link.href} {...external}>
              {cs.link.label}
            </a>
          </p>
        )}
        <CtaButtons location="case-study" />
      </PageHeader>

      <article className="wrap" style={{ paddingTop: 56 }}>
        <div className="prose">
          {cs.sections.map((sec) => (
            <section key={sec.id} id={sec.id} aria-labelledby={`${sec.id}-h`}>
              <h2 id={`${sec.id}-h`} className="ah2">
                {sec.title}
              </h2>
              <Blocks blocks={sec.blocks} />
            </section>
          ))}
          {quote && (
            <section aria-labelledby="testimonial-h">
              <h2 id="testimonial-h" className="ah2">
                What the client said
              </h2>
              <blockquote>
                <p>{quote.quote}</p>
                <cite>
                  {quote.name}, {quote.role}, {quote.company}
                </cite>
              </blockquote>
            </section>
          )}
        </div>
      </article>

      <ServiceLinks slugs={cs.services} />
      <CaseStudyPager slug={slug} />
      <PageCta location="case-study" />
    </main>
  );
}
