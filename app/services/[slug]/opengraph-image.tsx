import { serviceBySlug } from "@/content/services";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

/** One image per service, with alt text naming that service (the URL becomes .../opengraph-image/og). */
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const s = serviceBySlug(params.slug);
  return [{ id: "og", alt: `Title card reading "${s?.h1 ?? "Services"}"`, size: ogSize, contentType: ogContentType }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  return ogImage({ eyebrow: s?.eyebrow ?? "Services", title: s?.h1 ?? "Services" });
}
