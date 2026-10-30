/**
 * SEO quality gate. Runs after `next build` (npm run seo:check / postbuild).
 * Crawls the prerendered HTML in .next/server/app and fails on any error.
 * Run with Node 22.18+/24 (native TypeScript type stripping).
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { parse } from "node-html-parser";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 160;

/** Titles allowed outside 50-60 chars, with the reason. */
const TITLE_EXCEPTIONS: Record<string, string> = {
  "/": "Home title is specified verbatim in the SEO brief (66 chars).",
  "/case-studies/leadsmind": "Flagship case study title is specified verbatim by the site owner (77 chars).",
};

/** Non-page routes that internal links may point to. */
const EXTRA_ROUTES = ["/feed.xml", "/sitemap.xml", "/robots.txt", "/llms.txt", "/manifest.webmanifest", "/icon.svg", "/favicon.ico", "/apple-icon"];

const PLACEHOLDER_RE =
  /\[(PLACEHOLDER[^\]]*|CLIENT TESTIMONIAL|Client name|Role|Paste[^\]]*|Replace with your photo|YOUR[^\]]*)\]|\b(TODO|TBD|Lorem ipsum|Coming soon)\b/g;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const htmlFiles = existsSync(APP_DIR)
  ? walk(APP_DIR).filter((f) => f.endsWith(".html") && !/(^|[\\/])_(not-found|global-error)\.html$/.test(f))
  : [];

// On Vercel the build adapter moves prerendered HTML out of .next/server/app, so there is
// nothing to crawl there. The gate runs on local builds (`npm run build` / `npm run seo:check`).
if (htmlFiles.length === 0 && process.env.VERCEL) {
  console.warn("\nSEO check skipped on Vercel: no prerendered HTML in .next/server/app. Run `npm run build` locally to check.\n");
  process.exit(0);
}

if (!existsSync(APP_DIR)) {
  console.error("No build output found. Run `next build` first.");
  process.exit(1);
}

const routeOf = (file: string) => {
  const rel = relative(APP_DIR, file).split(sep).join("/").replace(/\.html$/, "");
  return rel === "index" ? "/" : `/${rel}`;
};

const pages = new Map(htmlFiles.map((f) => [routeOf(f), readFileSync(f, "utf8")]));
const known = new Set([...pages.keys(), ...EXTRA_ROUTES]);

const sitemapFile = join(APP_DIR, "sitemap.xml.body");
const sitemap = existsSync(sitemapFile) ? readFileSync(sitemapFile, "utf8") : "";
const sitemapPaths = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    const u = new URL(m[1]);
    return u.pathname === "" ? "/" : u.pathname;
  }),
);

const errors: string[] = [];
const warnings: string[] = [];
const titles = new Map<string, string>();
const descs = new Map<string, string>();
const placeholders = new Map<string, Set<string>>();
const h1Seen = new Map<string, string>();
const leadSeen = new Map<string, string>();

for (const [route, html] of [...pages.entries()].sort()) {
  const root = parse(html);
  const err = (m: string) => errors.push(`${route}: ${m}`);
  const meta = (attr: string, name: string) => root.querySelector(`meta[${attr}="${name}"]`)?.getAttribute("content") ?? "";

  // One H1, unique across the site
  const h1s = root.querySelectorAll("h1");
  if (h1s.length !== 1) err(`expected exactly 1 <h1>, found ${h1s.length}`);
  const h1 = h1s[0]?.text.replace(/\s+/g, " ").trim() ?? "";
  if (h1 && h1Seen.has(h1)) err(`duplicate <h1> with ${h1Seen.get(h1)}`);
  h1Seen.set(h1, route);

  // Lead / intro paragraph unique across the site
  const lead = (root.querySelector("p.lead") ?? root.querySelector("p.answer"))?.text.replace(/\s+/g, " ").trim() ?? "";
  if (lead && leadSeen.has(lead)) err(`duplicate intro paragraph with ${leadSeen.get(lead)}`);
  if (lead) leadSeen.set(lead, route);

  // OG image alt present
  if (!meta("property", "og:image:alt")) err("missing og:image:alt");

  // Title
  const title = root.querySelector("title")?.text.trim() ?? "";
  if (!title) err("missing <title>");
  else if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
    if (TITLE_EXCEPTIONS[route]) warnings.push(`${route}: title ${title.length} chars (allowed: ${TITLE_EXCEPTIONS[route]})`);
    else err(`title is ${title.length} chars (want ${TITLE_MIN}-${TITLE_MAX}): "${title}"`);
  }
  if (titles.has(title)) err(`duplicate title with ${titles.get(title)}`);
  titles.set(title, route);

  // Description
  const desc = meta("name", "description");
  if (!desc) err("missing meta description");
  else if (desc.length < DESC_MIN || desc.length > DESC_MAX) err(`description is ${desc.length} chars (want ${DESC_MIN}-${DESC_MAX})`);
  if (desc && descs.has(desc)) err(`duplicate description with ${descs.get(desc)}`);
  descs.set(desc, route);

  // Canonical
  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";
  if (!/^https?:\/\//.test(canonical)) err(`canonical missing or not absolute: "${canonical}"`);
  else if (new URL(canonical).pathname.replace(/\/$/, "") !== route.replace(/\/$/, "")) err(`canonical points elsewhere: ${canonical}`);

  // Open Graph + Twitter
  for (const p of ["og:title", "og:description", "og:url", "og:image", "og:type", "og:site_name"])
    if (!meta("property", p)) err(`missing ${p}`);
  for (const n of ["twitter:card", "twitter:title", "twitter:description"]) if (!meta("name", n)) err(`missing ${n}`);

  // No keywords meta
  if (root.querySelector('meta[name="keywords"]')) err("has a keywords meta tag (remove it)");

  // JSON-LD
  const ld = root.querySelectorAll('script[type="application/ld+json"]');
  if (ld.length === 0) err("no JSON-LD");
  for (const s of ld) {
    try {
      const data = JSON.parse(s.text);
      const str = JSON.stringify(data);
      if (/"(aggregateRating|review)"/.test(str)) err("self-serving aggregateRating/review markup found");
    } catch (e) {
      err(`invalid JSON-LD: ${(e as Error).message}`);
    }
  }

  // Images need alt
  for (const img of root.querySelectorAll("img")) if (!img.hasAttribute("alt")) err(`<img src="${img.getAttribute("src")}"> missing alt`);

  // Internal links resolve
  for (const a of root.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href")!;
    if (href === "#" || href === "") err(`link goes nowhere: <a href="${href}">${a.text.trim()}</a>`);
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const path = href.split("#")[0].split("?")[0] || "/";
    if (!known.has(path)) err(`broken internal link: ${href}`);
  }

  // External links open safely
  for (const a of root.querySelectorAll('a[target="_blank"]')) {
    const rel = a.getAttribute("rel") ?? "";
    if (!rel.includes("noopener")) err(`target=_blank without rel=noopener: ${a.getAttribute("href")}`);
  }

  // In sitemap
  if (!sitemapPaths.has(route)) err("not listed in sitemap.xml");

  // Placeholders must never ship
  const text = root.querySelector("body")?.text ?? "";
  for (const m of text.matchAll(PLACEHOLDER_RE)) {
    if (!placeholders.has(m[0])) placeholders.set(m[0], new Set());
    placeholders.get(m[0])!.add(route);
  }
}

// Sitemap must not list pages that don't exist
for (const p of sitemapPaths) if (!pages.has(p)) errors.push(`sitemap.xml lists ${p}, which was not built`);

if (pages.size === 0) errors.push("no prerendered pages found");
console.log(`\nSEO check: ${pages.size} pages\n`);
for (const r of [...pages.keys()].sort()) console.log(`  ${r}`);
for (const [p, routes] of placeholders) errors.push(`placeholder ${p} on ${[...routes].join(", ")}`);
if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}
if (errors.length) {
  console.error(`\nErrors (${errors.length}):`);
  for (const e of errors) console.error(`  x ${e}`);
  process.exit(1);
}
console.log("\nAll SEO checks passed.\n");
