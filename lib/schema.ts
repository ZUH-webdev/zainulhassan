import { absoluteUrl } from "@/lib/seo";
import { BIO, PHOTO, SITE, sameAs } from "@/lib/site";

/* Stable @ids so every page's @graph points at the same entities. */
export const ids = {
  person: `${SITE.url}/#person`,
  website: `${SITE.url}/#website`,
  service: `${SITE.url}/#professional-service`,
};

type Node = Record<string, unknown>;

export const personNode = (): Node => ({
  "@type": "Person",
  "@id": ids.person,
  name: SITE.name,
  alternateName: "Zain",
  jobTitle: "Senior Full Stack Developer",
  description: BIO,
  url: absoluteUrl("/about"),
  email: `mailto:${SITE.email}`,
  sameAs,
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Row Level Security",
    "OpenAI API",
    "Claude API",
    "Retrieval-augmented generation",
    "SaaS development",
    "Stripe",
    "Paystack",
  ],
  address: { "@type": "PostalAddress", addressCountry: "PK" },
  image: {
    "@type": "ImageObject",
    url: absoluteUrl(PHOTO.src),
    width: PHOTO.width,
    height: PHOTO.height,
    caption: "Zain Ul Hassan, Senior Full Stack Developer",
  },
});

export const websiteNode = (): Node => ({
  "@type": "WebSite",
  "@id": ids.website,
  name: SITE.name,
  url: absoluteUrl("/"),
  inLanguage: "en",
  publisher: { "@id": ids.person },
});

export const AREA_SERVED = ["Africa", "United States", "Middle East"];

export const professionalServiceNode = (): Node => ({
  "@type": "ProfessionalService",
  "@id": ids.service,
  name: "Zain Ul Hassan, AI SaaS Developer",
  url: absoluteUrl("/"),
  description: BIO,
  areaServed: AREA_SERVED,
  provider: { "@id": ids.person },
  serviceType: [
    "AI application development",
    "SaaS MVP development",
    "Next.js development",
    "Supabase development",
    "AI chatbot development",
    "Full stack development",
    "Payments integration",
  ],
  sameAs,
  email: SITE.email,
});

export type Crumb = { name: string; path: string };

export const breadcrumbNode = (crumbs: Crumb[]): Node => ({
  "@type": "BreadcrumbList",
  "@id": `${absoluteUrl(crumbs[crumbs.length - 1].path)}#breadcrumb`,
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const faqNode = (path: string, faqs: { q: string; a: string }[]): Node => ({
  "@type": "FAQPage",
  "@id": `${absoluteUrl(path)}#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const webPageNode = (path: string, name: string, description: string, type = "WebPage"): Node => ({
  "@type": type,
  "@id": `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name,
  description,
  isPartOf: { "@id": ids.website },
  inLanguage: "en",
});

/** One @graph per page: site-wide WebSite + Person, plus page-specific nodes. */
export const graph = (...nodes: Node[]) => ({
  "@context": "https://schema.org",
  "@graph": [websiteNode(), personNode(), ...nodes],
});
