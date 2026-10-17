import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Services: hire a developer for SaaS and AI products";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Services", title: "Hire a Developer for SaaS and AI Products" });
}
