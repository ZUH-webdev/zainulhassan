import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Hire Zain Ul Hassan to build your SaaS or AI product";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Hire me", title: "Tell Me What You're Building" });
}
