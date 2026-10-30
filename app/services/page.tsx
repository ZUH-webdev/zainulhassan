import CtaButtons from "@/components/CtaButtons";
import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import PageHeader from "@/components/PageHeader";
import Related from "@/components/Related";
import { caseStudies } from "@/content/case-studies";
import { AREA_NOTE, services } from "@/content/services";
import { breadcrumbNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const path = "/services";
const title = "Hire a Developer for SaaS and AI Builds";
const description =
  "Services for SaaS and AI products: MVPs, AI features and chatbots, Next.js and Supabase builds, RLS security audits and Stripe or Paystack billing.";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path },
];

export const metadata = buildMetadata({ title, description, path });

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        data={graph(
          { ...webPageNode(path, title, description, "CollectionPage"), breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` } },
          breadcrumbNode(crumbs),
          {
            "@type": "ItemList",
            "@id": `${absoluteUrl(path)}#services`,
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: s.name,
                serviceType: s.serviceType,
                url: absoluteUrl(`/services/${s.slug}`),
                provider: { "@id": ids.person },
              },
            })),
          },
        )}
      />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Services"
        title="Hire a Developer for SaaS and AI Products"
        lead="I build and secure SaaS and AI products as a senior full stack developer: MVPs, AI features and chatbots, Next.js and Supabase builds, Row Level Security audits and Stripe or Paystack billing. Pick the service closest to what you need, or tell me about your project."
      >
        <CtaButtons location="services-hub" />
      </PageHeader>

      <Related
        id="all-services"
        eyebrow="What I offer"
        title="Services"
        items={services.map((s) => ({
          href: `/services/${s.slug}`,
          kicker: s.eyebrow,
          title: s.h1.replace(/:.*/, ""),
          text: s.summary,
          cta: "See the service",
        }))}
      />

      <section className="wrap sec" aria-labelledby="where">
        <div className="eyebrow rv">Where I work</div>
        <h2 id="where" className="h2 rv d1">
          Serving clients in Africa, the US and the MENA region
        </h2>
        <div className="prose" style={{ marginTop: 24 }}>
          <p>{AREA_NOTE}</p>
        </div>
      </section>

      <Related
        id="proof"
        eyebrow="Proof"
        title="Case studies"
        items={caseStudies.map((c) => ({
          href: `/case-studies/${c.slug}`,
          kicker: c.kicker,
          title: c.name,
          text: `${c.summary} ${c.headlineFact}.`,
          cta: "Read the case study",
        }))}
      />

      <PageCta location="services-hub" />
    </main>
  );
}
