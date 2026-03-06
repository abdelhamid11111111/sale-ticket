import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Directory where your E2E tests live
  testDir: "./e2e",

  // Run all tests in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is accidentally left in source
  forbidOnly: !!process.env.CI,

  // Retry failing tests once on CI
  retries: process.env.CI ? 1 : 0,

  // Use 1 worker on CI to avoid flakiness; locally use all cores
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["list"],
    ["html", { open: "never" }], // saved to playwright-report/
  ],

  use: {
    // Base URL used in tests: await page.goto('/')
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

    // Capture screenshots and traces on failure
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Add more browsers when you're ready:
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  ],

  // Start the Next.js dev server automatically before running tests
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes to boot
  },
});