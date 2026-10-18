import { postBySlug } from "@/content/blog";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

/** One image per post, with alt text naming that article (the URL becomes .../opengraph-image/og). */
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const p = postBySlug(params.slug);
  return [{ id: "og", alt: `Title card reading "${p?.title ?? "Blog"}"`, size: ogSize, contentType: ogContentType }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = postBySlug((await params).slug);
  return ogImage({ eyebrow: "Guide", title: p?.title ?? "Blog" });
}
