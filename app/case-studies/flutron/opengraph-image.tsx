import { flutron } from "@/content/work/flutron";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

/* Used while there is no hero screenshot; when `hero` is set, generateMetadata in page.tsx overrides it. */
export const alt = `Title card reading "${flutron.title}"`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Case study", title: flutron.title });
}
