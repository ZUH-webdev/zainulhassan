import { serviceBySlug, services } from "@/content/services";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Service by Zain Ul Hassan, senior full stack developer";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  return ogImage({ eyebrow: s?.eyebrow ?? "Services", title: s?.h1 ?? "Services" });
}
