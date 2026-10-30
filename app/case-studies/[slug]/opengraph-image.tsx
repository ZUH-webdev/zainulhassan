import { caseStudyBySlug } from "@/content/case-studies";
import { workBySlug } from "@/content/work";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

/** Title and eyebrow for a client case study or a concept project. */
function card(slug: string) {
  const c = caseStudyBySlug(slug);
  if (c) return { eyebrow: "Case study", title: c.h1 };
  const w = workBySlug(slug);
  return { eyebrow: w?.badge ?? "Case study", title: w?.metaTitle ?? "Case study" };
}

/** One image per case study, with alt text naming that project (the URL becomes .../opengraph-image/og). */
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  return [{ id: "og", alt: `Title card reading "${card(params.slug).title}"`, size: ogSize, contentType: ogContentType }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return ogImage(card((await params).slug));
}
