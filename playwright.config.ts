import { defineConfig } from "@playwright/test";

const PORT = Number(process.env.TEST_PORT ?? 3200);

/**
 * Responsive suite: `npm run test:responsive` (run `npm run build` first).
 * Uses the locally installed Google Chrome by default (PW_CHANNEL=chrome).
 * On CI, run `npx playwright install chromium` and set PW_CHANNEL=chromium.
 */
export default defineConfig({
  testDir: "tests",
  timeout: 120_000,
  fullyParallel: true,
  workers: process.env.PW_WORKERS ? Number(process.env.PW_WORKERS) : 4,
  reporter: [["line"], ["./tests/summary-reporter.ts"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: process.env.PW_CHANNEL ?? "chrome",
  },
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
