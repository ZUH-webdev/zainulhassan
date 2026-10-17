import { postBySlug, posts } from "@/content/blog";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Article by Zain Ul Hassan, senior full stack developer";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = postBySlug((await params).slug);
  return ogImage({ eyebrow: "Guide", title: p?.title ?? "Blog" });
}
