import { workBySlug } from "@/content/work";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

/** One image per project, with alt text naming that project (the URL becomes .../opengraph-image/og). */
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const w = workBySlug(params.slug);
  return [{ id: "og", alt: `Title card reading "${w?.metaTitle ?? "Case study"}"`, size: ogSize, contentType: ogContentType }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const w = workBySlug((await params).slug);
  return ogImage({ eyebrow: w?.badge ?? "Case study", title: w?.metaTitle ?? "Case study" });
}
