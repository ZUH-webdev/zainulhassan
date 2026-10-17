import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Contact Zain Ul Hassan to build your SaaS or AI product";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Contact", title: "Hire Zain Ul Hassan for Your SaaS or AI Product" });
}
