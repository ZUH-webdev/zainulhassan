/**
 * Minimal typed content blocks for case studies and blog posts.
 * Inline syntax inside strings: [text](href), **bold**, `code`.
 */
export type Block =
  | { p: string }
  | { h3: string }
  | { ul: string[] }
  | { ol: string[] }
  | { code: string; lang?: string }
  | { table: { head: string[]; rows: string[][] } }
  | { quote: string; cite?: string };

export type Section = { id: string; title: string; blocks: Block[] };

const blockText = (b: Block): string => {
  if ("p" in b) return b.p;
  if ("h3" in b) return b.h3;
  if ("ul" in b) return b.ul.join(" ");
  if ("ol" in b) return b.ol.join(" ");
  if ("code" in b) return "";
  if ("table" in b) return [...b.table.head, ...b.table.rows.flat()].join(" ");
  return b.quote;
};

export const wordCount = (intro: string, sections: Section[]) =>
  [intro, ...sections.flatMap((s) => [s.title, ...s.blocks.map(blockText)])]
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .split(/\s+/)
    .filter(Boolean).length;
