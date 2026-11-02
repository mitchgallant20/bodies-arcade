import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";

// CHROMIUM_PATH (or the shared /opt/pw-browsers build) lets the smoke run without downloading a browser.
const executablePath = process.env.CHROMIUM_PATH ?? (existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);

// Device-size smoke tests (docs/HANDOFF.md, Section 19) against the static export in out/.
// Run `npm run build` first, then `npm run test:e2e`.
export default defineConfig({
  testDir: "tests",
  timeout: 30_000,
  retries: 0,
  reporter: [["list"]],
  webServer: {
    command: "npx serve out -l 4173 --no-clipboard --no-request-logging",
    url: "http://127.0.0.1:4173/",
    reuseExistingServer: true,
    timeout: 60_000,
  },
  use: { baseURL: "http://127.0.0.1:4173", launchOptions: { executablePath } },
  projects: [
    { name: "iphone-portrait", use: { viewport: { width: 390, height: 664 }, hasTouch: true, isMobile: true } },
    { name: "iphone-landscape", use: { viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true } },
    { name: "ipad", use: { viewport: { width: 1024, height: 768 }, hasTouch: true } },
  ],
});
