import { defineConfig, devices } from "@playwright/test"

/**
 * PureBiome end-to-end tests.
 *
 * Before first run:
 *   pnpm e2e:install       # downloads the chromium binary (~130MB)
 *
 * Running:
 *   # terminal 1: ensure infra is up
 *   pnpm infra:up
 *   # terminal 2: start the stack (keeps Medusa + storefront alive)
 *   pnpm dev
 *   # terminal 3:
 *   pnpm e2e
 *
 * The tests assume the local seed has been run (4 PureBiome products present)
 * and the storefront `.env.local` has a valid NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:8000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
})
