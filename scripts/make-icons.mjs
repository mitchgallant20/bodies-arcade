// Renders public/icons/icon.svg to the PNG sizes iOS and the manifest need.
// Run with: npm run icons   (uses the Playwright Chromium already installed for tests)
import { chromium } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "icons");
const svg = readFileSync(join(dir, "icon.svg"), "utf8");
const sizes = [
  ["icon-192.png", 192, false],
  ["icon-512.png", 512, false],
  ["apple-touch-icon.png", 180, false],
  ["icon-maskable-512.png", 512, true], // maskable: full-bleed background so iOS/Android can crop
];

// CHROMIUM_PATH (or the shared /opt/pw-browsers build) lets this run without downloading a browser.
const executablePath = process.env.CHROMIUM_PATH ?? (existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage();
for (const [name, size, maskable] of sizes) {
  const pad = maskable ? Math.round(size * 0.1) : 0;
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<body style="margin:0;background:${maskable ? "#150f30" : "transparent"}">
       <img src="data:image/svg+xml;utf8,${encodeURIComponent(svg)}" style="display:block;width:${size - pad * 2}px;height:${size - pad * 2}px;margin:${pad}px">
     </body>`,
  );
  await page.screenshot({ path: join(dir, name), omitBackground: !maskable });
  console.log(`icons/${name} ${size}px`);
}
await browser.close();
