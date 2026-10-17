import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Case studies: SaaS and AI products built and shipped by Zain Ul Hassan";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Case studies", title: "SaaS and AI Products I Built and Shipped" });
}
