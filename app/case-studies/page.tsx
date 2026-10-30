import CtaButtons from "@/components/CtaButtons";
import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import PageHeader from "@/components/PageHeader";
import Related from "@/components/Related";
import { allCaseStudies } from "@/content/case-studies";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const path = "/case-studies";
const title = "Case Studies: SaaS and AI Projects Shipped";
const description =
  "SaaS and AI case studies: a CRM and LMS platform for African businesses, a teacher job portal, an AI missed-call assistant and a drone show site.";
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
          {
            "@type": "ItemList",
            "@id": `${absoluteUrl(path)}#case-studies`,
            itemListElement: allCaseStudies.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.name,
              url: absoluteUrl(`/case-studies/${c.slug}`),
            })),
          },
        )}
      />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Case studies"
        title="Case Studies: SaaS and AI Products I Built and Shipped"
        lead="These are real products I built and shipped, with the problems, the technical decisions and the results, plus two concept projects that show how I approach a product from scratch. Each one links to the service it demonstrates, so you can see the work behind the claim before you hire me."
      >
        <CtaButtons location="case-study" />
      </PageHeader>
      <Related
        id="all-case-studies"
        eyebrow="Selected work"
        title="Projects"
        items={allCaseStudies.map((c) => ({
          href: `/case-studies/${c.slug}`,
          kicker: c.kicker,
          title: c.name,
          text: c.summary,
          cta: `Read the ${c.name} case study`,
        }))}
      />
      <PageCta location="case-study" />
    </main>
  );
}
