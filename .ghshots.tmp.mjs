import { chromium } from "@playwright/test";
const out = process.argv[2];
const b = await chromium.launch({ channel: "chrome" });
const run = async (w, h, reduced) => {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  if (reduced) await p.emulateMedia({ reducedMotion: "reduce" });
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  const card = p.locator(".gh-card");
  console.log(w, reduced ? "reduced" : "", "class before view:", await card.getAttribute("class"), "scrollW", await p.evaluate(() => document.documentElement.scrollWidth));
  await p.locator("#github").scrollIntoViewIfNeeded();
  await card.scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  console.log("  class in view:", await card.getAttribute("class"));
  await p.waitForTimeout(2600);
  const sc = await p.locator(".gh-scroll").evaluate((e) => [e.scrollLeft, e.scrollWidth - e.clientWidth]);
  console.log("  scroller left/max:", sc);
  // keyboard
  await p.locator(".gh-scroll").focus();
  await p.keyboard.press("ArrowLeft");
  await p.keyboard.press("ArrowUp");
  console.log("  tip:", await p.locator(".gh-tip").textContent(), "| live:", await p.locator(".gh-card p[aria-live]").textContent());
  await p.locator("#github").screenshot({ path: `${out}/gh-${w}${reduced ? "-rm" : ""}.png` });
  // year switch
  await p.getByRole("button", { name: "2025" }).click();
  await p.waitForTimeout(800);
  console.log("  after switch:", await p.locator(".gh-stat-l").first().textContent(), "| pressed:", await p.locator('.gh-pills [aria-pressed="true"]').textContent());
  await p.close();
};
await run(1440, 900, false);
await run(390, 844, false);
await run(390, 844, true);
await b.close();
