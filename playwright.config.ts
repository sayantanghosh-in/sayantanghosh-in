import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 2 : 0,
  reporter: process.env["CI"] ? "github" : [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    // The copy button writes to the clipboard; grant it up front.
    permissions: ["clipboard-read", "clipboard-write"],
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    // Tests run against a production build: dev mode has different timing,
    // no minification, and React's dev-only warnings.
    command: `pnpm build && pnpm start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env["CI"],
    timeout: 180_000,
  },
});
