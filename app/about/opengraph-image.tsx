import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "About Zain Ul Hassan, senior full stack developer";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "About", title: "About Zain Ul Hassan, Senior Full Stack Developer" });
}
