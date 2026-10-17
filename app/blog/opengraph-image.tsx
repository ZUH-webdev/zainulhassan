import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Blog: guides on building SaaS and AI products";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Blog", title: "Guides on Building SaaS and AI Products" });
}
