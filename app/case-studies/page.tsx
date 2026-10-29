import CtaButtons from "@/components/CtaButtons";
import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import PageHeader from "@/components/PageHeader";
import Related from "@/components/Related";
import { caseStudies } from "@/content/case-studies";
import { work } from "@/content/work";
import { flutron } from "@/content/work/flutron";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const path = "/case-studies";
const title = "Case Studies: SaaS and AI Projects Shipped";
const description =
  "Case studies of SaaS and AI products I built and shipped: a CRM and LMS platform for African businesses, a teacher job portal and an AI missed-call assistant.";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Case studies", path },
];

export const metadata = buildMetadata({ title, description, path });

export default function CaseStudiesPage() {
  return (
    <main>
      <JsonLd
        data={graph(
          { ...webPageNode(path, title, description, "CollectionPage"), breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` } },
          breadcrumbNode(crumbs),
        )}
      />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Case studies"
        title="Case Studies: SaaS and AI Products I Built and Shipped"
        lead="These are real products I built and shipped, with the problems, the technical decisions and the results. Each one links to the service it demonstrates, so you can see the work behind the claim before you hire me."
      >
        <CtaButtons location="case-study" />
      </PageHeader>
      <Related
        id="all-case-studies"
        eyebrow="Selected work"
        title="Projects"
        items={[
          ...caseStudies.map((c) => ({
            href: `/case-studies/${c.slug}`,
            kicker: c.kicker,
            title: c.name,
            text: `${c.summary} ${c.headlineFact}.`,
            cta: "Read the case study",
          })),
          {
            href: `/work/${flutron.slug}`,
            kicker: "Client site · Drone light shows",
            title: flutron.client,
            text: flutron.cardBody,
            cta: "Read the case study",
          },
          ...work.map((w) => ({
            href: `/work/${w.slug}`,
            kicker: `${w.badge} · ${w.type}`,
            title: w.title,
            text: w.pitch,
            cta: "Read the case study",
          })),
        ]}
      />
      <PageCta location="case-study" />
    </main>
  );
}
