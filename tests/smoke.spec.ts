import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/arcade/", "/reading/", "/dad/", "/offline/", "/play/purple-turtles.html", "/play/bodies-books.html"];

for (const route of ROUTES) {
  test(`boots ${route} with no console errors and no sideways scroll`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(e.message));
    const failed: string[] = [];
    page.on("requestfailed", (r) => {
      const why = r.failure()?.errorText ?? "";
      if (why === "net::ERR_ABORTED") return; // Next.js cancels its own prefetches; not a failure
      failed.push(`${r.url()} ${why}`);
    });

    await page.goto(route, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    const dims = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      title: document.title,
    }));
    expect(dims.title.length).toBeGreaterThan(0);
    expect(dims.scrollWidth, "page scrolls sideways").toBeLessThanOrEqual(dims.clientWidth);
    expect(errors, "console errors").toEqual([]);
    expect(failed, "failed requests").toEqual([]);
  });
}

test("manifest and service worker are served", async ({ request }) => {
  const manifest = await request.get("/manifest.webmanifest");
  expect(manifest.ok()).toBeTruthy();
  const json = await manifest.json();
  expect(json.name).toBe("Bodie's Arcade");
  expect(json.display).toBe("standalone");
  const sw = await request.get("/sw.js");
  expect(sw.ok()).toBeTruthy();
  for (const icon of ["/icons/icon-192.png", "/icons/icon-512.png", "/icons/apple-touch-icon.png"]) {
    expect((await request.get(icon)).ok(), icon).toBeTruthy();
  }
});

test("purple turtles reaches its title screen", async ({ page }) => {
  await page.goto("/play/purple-turtles.html", { waitUntil: "networkidle" });
  await expect(page.locator("#playBtn")).toBeVisible();
  await expect(page.locator("#title a[data-home]")).toBeVisible();
});

test("bodie's books deep-links to the Cards shelf", async ({ page }) => {
  await page.goto("/play/bodies-books.html#cards", { waitUntil: "networkidle" });
  await expect(page.locator("#tab-cards")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator(".ba-home")).toBeVisible();
});
