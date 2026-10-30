import { leadsmind } from "@/content/work/leadsmind";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

/* Same 1200x630 card as opengraph-image.tsx, so Twitter/X gets a dedicated image too. */
export const alt = `Title card reading "${leadsmind.title}"`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Case study", title: leadsmind.title });
}
