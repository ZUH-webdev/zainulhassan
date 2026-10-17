import { caseStudies, caseStudyBySlug } from "@/content/case-studies";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Case study by Zain Ul Hassan, senior full stack developer";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = caseStudyBySlug((await params).slug);
  return ogImage({ eyebrow: "Case study", title: c?.h1 ?? "Case study" });
}
