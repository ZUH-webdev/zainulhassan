import type { FullResult, Reporter, TestCase, TestResult } from "@playwright/test/reporter";

/** Prints a compact table of every failing route x viewport with the first failure lines. */
export default class SummaryReporter implements Reporter {
  private rows: { viewport: string; test: string; reason: string }[] = [];
  private passed = 0;

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === "passed" || result.status === "skipped") {
      if (result.status === "passed") this.passed++;
      return;
    }
    const [, , viewport = "", ...rest] = test.titlePath();
    const msg = (result.errors[0]?.message ?? result.status).replace(/\u001b\[[0-9;]*m/g, "");
    const reason = msg
      .split("\n")
      .filter((l) => l.trim() && !/^\s*(Expected|Received|at |Call log)/.test(l))
      .slice(0, 6)
      .join(" | ");
    this.rows.push({ viewport, test: rest.join(" > "), reason });
  }

  onEnd(result: FullResult) {
    console.log(`\n=== Responsive summary: ${this.passed} passed, ${this.rows.length} failed (${result.status}) ===`);
    if (!this.rows.length) return;
    const w1 = Math.max(8, ...this.rows.map((r) => r.viewport.length));
    const w2 = Math.max(4, ...this.rows.map((r) => r.test.length));
    console.log(`${"Viewport".padEnd(w1)}  ${"Test".padEnd(w2)}  Failure`);
    for (const r of this.rows) console.log(`${r.viewport.padEnd(w1)}  ${r.test.padEnd(w2)}  ${r.reason.slice(0, 220)}`);
  }
}
