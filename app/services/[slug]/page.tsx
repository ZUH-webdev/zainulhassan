import { notFound } from "next/navigation";
import CtaButtons from "@/components/CtaButtons";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import PageHeader from "@/components/PageHeader";
import Process from "@/components/Process";
import Related from "@/components/Related";
import { caseStudyCard } from "@/content/case-studies";
import { postBySlug } from "@/content/blog";
import { serviceBySlug, services } from "@/content/services";
import { AREA_SERVED, breadcrumbNode, faqNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: s.metaTitle, description: s.description, path: `/services/${s.slug}` });
}

/** Every heading and paragraph comes from the service's own content, so no two service pages share copy. */
export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.name, path },
  ];

  return (
    <main>
      <JsonLd
        data={graph(
          { ...webPageNode(path, s.h1, s.description), breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` } },
          {
            "@type": "Service",
            "@id": `${absoluteUrl(path)}#service`,
            name: s.h1,
            serviceType: s.serviceType,
            description: s.intro,
            url: absoluteUrl(path),
            provider: { "@id": ids.person },
            areaServed: AREA_SERVED,
          },
          faqNode(path, s.faqs),
          breadcrumbNode(crumbs),
        )}
      />

      <PageHeader crumbs={crumbs} eyebrow={s.eyebrow} title={s.h1} lead={s.intro}>
        <CtaButtons location="service-page" hire />
      </PageHeader>

      <section className="wrap sec" aria-labelledby="audience">
        <div className="eyebrow rv">Who it&apos;s for</div>
        <h2 id="audience" className="h2 rv d1">
          {s.audienceTitle}
        </h2>
        <div className="prose" style={{ marginTop: 24 }}>
          {s.audience.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="wrap sec" aria-labelledby="deliverables">
        <div className="eyebrow rv">What I deliver</div>
        <h2 id="deliverables" className="h2 rv d1">
          {s.deliverTitle}
        </h2>
        <div className="cards">
          {s.deliverables.map((d, i) => (
            <div key={d.title} className="card rv">
              <div className="big-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="disp" style={{ fontWeight: 700, fontSize: 24, letterSpacing: "-.02em", margin: "0 0 10px", position: "relative" }}>
                {d.title}
              </h3>
              <p style={{ margin: 0, color: "#9A9DA6", fontSize: 16, position: "relative" }}>{d.text}</p>
              <div className="sweep"></div>
            </div>
          ))}
        </div>
      </section>

      <Process id="how-i-work" eyebrow="How I work" title={s.processTitle} steps={s.process} />

      <section className="wrap sec" aria-labelledby="stack">
        <div className="eyebrow rv">Tech stack</div>
        <h2 id="stack" className="h2 rv d1">
          {s.stackTitle}
        </h2>
        <ul className="slist">
          {s.stack.map((t) => (
            <li key={t.name} className="sitem rv">
              <span className="sname">{t.name}</span>
              <span className="swhy">{t.why}</span>
            </li>
          ))}
        </ul>
      </section>

      <Related
        id="related-work"
        eyebrow="Related work"
        title={s.workTitle}
        items={s.work.map((w) => {
          const c = caseStudyCard(w.slug)!;
          return { href: `/case-studies/${c.slug}`, kicker: c.kicker, title: c.name, text: w.fact, cta: `Read the ${c.name} case study` };
        })}
      />
      {s.workLink && (
        <div className="wrap">
          <p className="mono relwork rv" style={{ margin: "28px 0 0", fontSize: 13, color: "#9A9DA6" }}>
            Related work:{" "}
            <a className="tl" href={s.workLink.href}>
              {s.workLink.label}
            </a>
          </p>
        </div>
      )}

      <Faq items={s.faqs} title={s.faqTitle} />

      <Related
        id="related-services"
        eyebrow="Related services"
        title={s.relatedTitle}
        items={[
          ...s.related.map((r) => ({ href: `/services/${r.slug}`, kicker: "Service", title: r.anchor, text: r.text, cta: "Explore this service" })),
          ...s.posts.map((slug) => {
            const p = postBySlug(slug)!;
            return { href: `/blog/${p.slug}`, kicker: "Guide", title: p.title, text: p.description, cta: "Read the guide" };
          }),
        ]}
      />

      <PageCta location="service-page" title={s.cta} text={s.ctaText} hire />
    </main>
  );
}
