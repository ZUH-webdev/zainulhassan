import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";

/* ------------------------------------------------------------------ */
/* Routes: every URL in the built sitemap, plus a 404                  */
/* ------------------------------------------------------------------ */
const sitemapFile = join(process.cwd(), ".next", "server", "app", "sitemap.xml.body");
if (!existsSync(sitemapFile)) throw new Error("Run `npm run build` before `npm run test:responsive`.");
const routes = [
  ...[...readFileSync(sitemapFile, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname || "/"),
  "/this-page-does-not-exist",
];

type VP = { name: string; width: number; height: number; phone: boolean };
const viewports: VP[] = [
  { name: "320x568", width: 320, height: 568, phone: true },
  { name: "360x740", width: 360, height: 740, phone: true },
  { name: "390x844", width: 390, height: 844, phone: true },
  { name: "430x932", width: 430, height: 932, phone: true },
  { name: "844x390-landscape", width: 844, height: 390, phone: true },
  { name: "768x1024", width: 768, height: 1024, phone: false },
  { name: "820x1180", width: 820, height: 1180, phone: false },
  { name: "1024x768", width: 1024, height: 768, phone: false },
  { name: "1180x820", width: 1180, height: 820, phone: false },
  { name: "1280x800", width: 1280, height: 800, phone: false },
  { name: "1440x900", width: 1440, height: 900, phone: false },
  { name: "1920x1080", width: 1920, height: 1080, phone: false },
];

const slug = (r: string) => (r === "/" ? "home" : r.slice(1).replace(/\//g, "__"));

/* ------------------------------------------------------------------ */
/* In-page checks                                                      */
/* ------------------------------------------------------------------ */

/**
 * Interactive elements smaller than 44x44.
 * Inline text links inside running text (p, li, headings, table cells) are exempt,
 * matching WCAG 2.5.8's inline exception; stretched card links are measured by their card.
 */
async function smallTargets(page: Page) {
  return page.evaluate(() => {
    const textParents = new Set(["P", "LI", "H1", "H2", "H3", "H4", "H5", "H6", "TD", "TH", "CITE", "STRONG", "EM", "BLOCKQUOTE", "SPAN"]);
    const out: string[] = [];
    for (const el of document.querySelectorAll<HTMLElement>("a[href], button, summary")) {
      if (el.closest("[inert]")) continue;
      if (!el.checkVisibility({ visibilityProperty: true })) continue;
      const cs = getComputedStyle(el);
      if (cs.display === "inline" && el.parentElement && textParents.has(el.parentElement.tagName)) continue;
      const target = el.classList.contains("stretch") ? (el.closest(".card") as HTMLElement) : el;
      const r = target.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.width < 43.5 || r.height < 43.5) {
        const label = (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30);
        out.push(`<${el.tagName.toLowerCase()} "${label}"> ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
    }
    return out;
  });
}

async function heroClipping(page: Page) {
  return page.evaluate(() => {
    const h1 = document.querySelector<HTMLElement>("h1.h1");
    if (!h1) return ["hero h1 missing"];
    const problems: string[] = [];
    const hr = h1.getBoundingClientRect();
    if (hr.right > window.innerWidth + 0.5) problems.push(`h1 extends past viewport (${Math.round(hr.right)} > ${window.innerWidth})`);
    for (const w of h1.querySelectorAll<HTMLElement>(".w")) {
      const r = w.getBoundingClientRect();
      const inner = w.firstElementChild as HTMLElement;
      if (r.right > hr.right + 1) problems.push(`word "${w.textContent}" overflows the h1`);
      if (inner.scrollWidth > w.clientWidth + 1) problems.push(`word "${w.textContent}" clipped by its mask`);
    }
    const slot = h1.querySelector<HTMLElement>(".slot");
    if (slot) {
      for (const s of slot.querySelectorAll<HTMLElement>(".slot-in > span")) {
        if (s.scrollWidth > slot.clientWidth + 1) problems.push(`slot word "${s.textContent}" wider than its line`);
        if (s.getBoundingClientRect().height > slot.getBoundingClientRect().height + 1) problems.push(`slot word "${s.textContent}" wraps`);
      }
    }
    return problems;
  });
}

/* ------------------------------------------------------------------ */
/* Route x viewport                                                    */
/* ------------------------------------------------------------------ */
for (const vp of viewports) {
  test.describe(vp.name, () => {
    test.use({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.phone,
      hasTouch: vp.phone,
      deviceScaleFactor: vp.phone ? 2 : 1,
    });

    for (const route of routes) {
      test(`${route}`, async ({ page }) => {
        const failures: string[] = [];
        const res = await page.goto(route, { waitUntil: "networkidle" });
        expect(res?.status(), "status").toBe(route.startsWith("/this-page") ? 404 : 200);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(route === "/" ? 1800 : 300); // hero word reveal finishes at ~1.65s

        const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
        if (sw > iw) failures.push(`horizontal scroll: scrollWidth ${sw} > ${iw}`);

        const small = await smallTargets(page);
        if (small.length) failures.push(`tap targets < 44px: ${small.join(", ")}`);

        if (route === "/") failures.push(...(await heroClipping(page)));

        const burgerVisible = await page.locator("button.burger").isVisible();
        if (vp.width < 1024 && !burgerVisible) failures.push("hamburger should be visible below 1024px");
        if (vp.width >= 1024 && burgerVisible) failures.push("hamburger should be hidden at 1024px and up");
        const inlineNav = await page.locator(".navlinks").isVisible();
        if (vp.width < 1024 && inlineNav) failures.push("inline nav links should be hidden below 1024px");
        if (vp.width >= 1024 && !inlineNav) failures.push("inline nav links should be visible at 1024px and up");

        // Screenshot with reduced motion so scroll-driven reveals render in their final state.
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.screenshot({ path: `tests/screenshots/${vp.name}/${slug(route)}.png`, fullPage: true });

        expect(failures, failures.join("\n")).toEqual([]);
      });
    }

    /* -------------------------------------------------------------- */
    /* Hamburger menu behaviour (below 1024px only)                    */
    /* -------------------------------------------------------------- */
    if (vp.width < 1024) {
      test("mobile menu", async ({ page }) => {
        await page.goto("/", { waitUntil: "networkidle" });
        const burger = page.locator("button.burger");
        const menu = page.locator("#mobile-menu");
        const isOpen = () => burger.getAttribute("aria-expanded");
        const activeInside = () =>
          page.evaluate(() => {
            const a = document.activeElement;
            return !!a && (document.getElementById("mobile-menu")!.contains(a) || a.classList.contains("burger"));
          });

        await expect(burger).toHaveAttribute("aria-label", "Open menu");
        await expect(burger).toHaveAttribute("aria-controls", "mobile-menu");

        // Open: scroll lock, inert background, focus moved in
        await burger.click();
        await expect(burger).toHaveAttribute("aria-expanded", "true");
        await expect(burger).toHaveAttribute("aria-label", "Close menu");
        await expect(menu).toBeVisible();
        expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflowY)).toBe("hidden");
        expect(await page.evaluate(() => document.querySelector("main")!.inert)).toBe(true);
        expect(await page.evaluate(() => document.getElementById("mobile-menu")!.contains(document.activeElement))).toBe(true);
        const y0 = await page.evaluate(() => window.scrollY);
        await page.mouse.wheel(0, 900);
        await page.waitForTimeout(300);
        expect(await page.evaluate(() => window.scrollY), "page must not scroll while menu is open").toBe(y0);
        await expect(menu.locator(".mlink")).toHaveCount(6);
        await expect(menu.locator(".mcta")).toBeVisible();
        await expect(menu.locator(".msocl")).toHaveCount(4);

        // Focus trap: Tab and Shift+Tab never leave the menu + hamburger
        for (let i = 0; i < 16; i++) {
          await page.keyboard.press("Tab");
          expect(await activeInside(), `Tab #${i + 1} escaped the menu`).toBe(true);
        }
        for (let i = 0; i < 4; i++) {
          await page.keyboard.press("Shift+Tab");
          expect(await activeInside(), `Shift+Tab #${i + 1} escaped the menu`).toBe(true);
        }

        // Escape closes and returns focus to the hamburger
        await page.keyboard.press("Escape");
        expect(await isOpen()).toBe("false");
        await expect(menu).toBeHidden();
        expect(await page.evaluate(() => document.activeElement?.classList.contains("burger"))).toBe(true);
        expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflowY)).not.toBe("hidden");
        expect(await page.evaluate(() => document.querySelector("main")!.inert)).toBe(false);

        // Backdrop tap closes
        await burger.click();
        await expect(menu).toBeVisible();
        const box = await menu.boundingBox();
        await page.mouse.click(box!.x + box!.width - 4, box!.y + box!.height - 4);
        expect(await isOpen()).toBe("false");

        // Same-page anchor link: closes, unlocks and scrolls to the section
        await burger.click();
        await expect(menu).toBeVisible();
        await menu.getByRole("link", { name: /Services/ }).click();
        expect(await isOpen()).toBe("false");
        await page.waitForFunction(() => window.scrollY > 200, undefined, { timeout: 5000 });

        // Route change link: navigates and closes
        await burger.click();
        await expect(menu).toBeVisible();
        await menu.getByRole("link", { name: /Blog/ }).click();
        await page.waitForURL("**/blog");
        expect(await isOpen()).toBe("false");
        await expect(menu).toBeHidden();
        await expect(menu.locator('.mlink[aria-current="page"]')).toHaveCount(1);

        // Growing past 1024px closes it
        await burger.click();
        await expect(menu).toBeVisible();
        await page.setViewportSize({ width: 1100, height: 800 });
        await expect(burger).toHaveAttribute("aria-expanded", "false");
        expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflowY)).not.toBe("hidden");
      });

      test("mobile menu with reduced motion opens instantly", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto("/blog", { waitUntil: "networkidle" });
        await page.locator("button.burger").click();
        const state = await page.evaluate(() => {
          const m = document.getElementById("mobile-menu")!;
          const li = m.querySelector(".mlinks li")!;
          return { vis: getComputedStyle(m).visibility, op: getComputedStyle(li).opacity, tr: getComputedStyle(li).transitionDuration };
        });
        expect(state).toEqual({ vis: "visible", op: "1", tr: "0s" });
      });
    }
  });
}

/* ------------------------------------------------------------------ */
/* Layout rules spot-checks                                            */
/* ------------------------------------------------------------------ */
test.describe("layout rules", () => {
  test("phone: testimonials carousel, vertical process, 2x2 stats, stacked hero", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto("/", { waitUntil: "networkidle" });
    const r = await page.evaluate(() => {
      const tg = document.querySelector<HTMLElement>(".tgrid")!;
      const cs = getComputedStyle(tg);
      const items = [...document.querySelectorAll<HTMLElement>(".titem")].map((e) => e.getBoundingClientRect());
      const steps = [...document.querySelectorAll<HTMLElement>(".pstep")].map((e) => e.getBoundingClientRect());
      const stats = [...document.querySelectorAll<HTMLElement>(".stat")].map((e) => e.getBoundingClientRect());
      const ht = document.querySelector(".herotext")!.getBoundingClientRect();
      const cw = document.querySelector(".cardwrap")!.getBoundingClientRect();
      return {
        snap: cs.scrollSnapType,
        overflowX: cs.overflowX,
        cardRatio: items[0].width / window.innerWidth,
        carouselScrolls: tg.scrollWidth > tg.clientWidth,
        processVertical: steps.every((s, i) => i === 0 || s.top > steps[i - 1].top),
        statsTwoByTwo: Math.abs(stats[0].top - stats[1].top) < 2 && stats[2].top > stats[0].top + 10,
        heroStacked: cw.top >= ht.bottom,
      };
    });
    expect(r.snap).toContain("x");
    expect(r.overflowX).toBe("auto");
    expect(r.cardRatio).toBeGreaterThan(0.8);
    expect(r.carouselScrolls).toBe(true);
    expect(r.processVertical).toBe(true);
    expect(r.statsTwoByTwo).toBe(true);
    expect(r.heroStacked).toBe(true);
    await ctx.close();
  });

  test("columns: services 1/2/3, testimonials 2 on tablet", async ({ browser }) => {
    const cols = async (width: number, sel: string) => {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      await page.goto("/", { waitUntil: "networkidle" });
      const n = await page.evaluate((s) => {
        const tops = [...document.querySelectorAll<HTMLElement>(s)].map((e) => Math.round(e.getBoundingClientRect().top));
        return tops.filter((t) => t === tops[0]).length;
      }, sel);
      await ctx.close();
      return n;
    };
    expect(await cols(600, ".sgrid > .card")).toBe(1);
    expect(await cols(700, ".sgrid > .card")).toBe(2);
    expect(await cols(1024, ".sgrid > .card")).toBe(3);
    expect(await cols(1440, ".sgrid > .card")).toBe(3);
    expect(await cols(800, ".titem")).toBe(2);
    expect(await cols(1100, ".titem")).toBe(3);
  });
});
