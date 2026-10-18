import { caseStudyBySlug } from "@/content/case-studies";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

/** One image per case study, with alt text naming that project (the URL becomes .../opengraph-image/og). */
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const c = caseStudyBySlug(params.slug);
  return [{ id: "og", alt: `Title card reading "${c?.h1 ?? "Case study"}"`, size: ogSize, contentType: ogContentType }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = caseStudyBySlug((await params).slug);
  return ogImage({ eyebrow: "Case study", title: c?.h1 ?? "Case study" });
}
