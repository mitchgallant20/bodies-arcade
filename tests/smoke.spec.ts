import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/arcade/", "/reading/", "/dad/", "/offline/", "/play/purple-turtles.html", "/play/bodies-books.html", "/play/big-catch.html"];

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

test("home doors open the two wings", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("link", { name: /^ARCADE/ })).toHaveAttribute("href", /\/arcade\/?$/);
  await expect(page.getByRole("link", { name: /^READING ROOM/ })).toHaveAttribute("href", /\/reading\/?$/);
});

test("arcade cabinets carry no build jargon", async ({ page }) => {
  await page.goto("/arcade/", { waitUntil: "networkidle" });
  await expect(page.locator(".cabinet")).toHaveCount(4);
  await expect(page.getByText(/Phase \d/)).toHaveCount(0);
  // "COMING SOON" sits on its own line under the title.
  const soon = page.locator(".cabinet .screen.soon").first();
  await expect(soon).toHaveCSS("white-space", "pre-line");
});

test("purple turtles reaches its title screen", async ({ page }) => {
  await page.goto("/play/purple-turtles.html", { waitUntil: "networkidle" });
  await expect(page.locator("#playBtn")).toBeVisible();
  await expect(page.locator("#title a[data-home]")).toBeVisible();
});

test("big catch reaches its title screen and shows the fishing cabinet", async ({ page }) => {
  await page.goto("/play/big-catch.html", { waitUntil: "networkidle" });
  await expect(page.locator("#playBtn")).toBeVisible();
  await expect(page.locator("#title a[data-home]")).toBeVisible();
  // One cast, start to finish: hold the big button, wait for a bite or an empty retrieve.
  await page.locator("#playBtn").click();
  const state = () => page.evaluate(() => (window as unknown as { BodieGame: { state: string } }).BodieGame.state);
  expect(await state()).toBe("idle");
  const box = (await page.locator("#actBtn").boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(500);
  await page.mouse.up();
  await expect.poll(state, { timeout: 15000 }).toMatch(/^(bite|idle)$/);
  expect(await page.locator("#status").innerText()).not.toContain("—");

  await page.goto("/arcade/", { waitUntil: "networkidle" });
  const cab = page.locator('.cabinet[aria-label="BIG CATCH"]');
  await expect(cab.locator(".screen")).toHaveText("BIG CATCH");
  await expect(cab.getByRole("link", { name: "PLAY" })).toHaveAttribute("href", /\/play\/big-catch\.html$/);
  await expect(cab.getByRole("link", { name: "WORD MODE" })).toHaveAttribute("href", /#reading$/);
});

test("content/books are on the Level 2 shelf and open by deep link", async ({ page }) => {
  await page.goto("/play/bodies-books.html#l2", { waitUntil: "networkidle" });
  const card = page.locator('#shelf .book[data-id="comeback"]');
  await expect(card).toBeVisible();
  await expect(card.locator(".lvl")).toHaveText("LEVEL 2");
  await expect(card.locator(".pages")).toHaveText("16 pages");

  await page.goto("/play/bodies-books.html#comeback", { waitUntil: "networkidle" });
  await expect(page.locator("#rTitle")).toHaveText("The Big Comeback");
  await expect(page.locator("#rPg")).toHaveText("1 / 16");
  await expect(page.locator("#art svg")).toBeVisible();
  // Every page renders art (an SVG) and text, with no page errors; "—" (em dash) never appears.
  for (let i = 0; i < 16; i++) {
    await expect(page.locator("#art svg")).toBeVisible();
    expect(await page.locator("#txt").innerText()).not.toContain("—");
    await page.locator("#nextBtn").click();
  }
  await expect(page.locator("#txt")).toContainText("You read the whole book!");
});

test("Level 3 shelf lists at least eight books and every page of every book renders", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/play/bodies-books.html#l3", { waitUntil: "networkidle" });
  await expect(page.locator("#tab-l3")).toHaveAttribute("aria-selected", "true");
  const ids = await page.locator("#shelf .book").evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.id));
  expect(ids.length).toBeGreaterThanOrEqual(8);
  await expect(page.locator("#shelf .book .lvl").first()).toHaveText("LEVEL 3");

  for (const id of ids) {
    await page.goto(`/play/bodies-books.html#${id}`, { waitUntil: "networkidle" });
    await expect(page.locator("#reader")).toHaveClass(/l3/);
    const n = Number((await page.locator("#rPg").textContent())!.split("/")[1]);
    expect(n, `${id} page count`).toBeGreaterThanOrEqual(12);
    for (let i = 0; i < n; i++) {
      await expect(page.locator("#art svg"), `${id} page ${i + 1} art`).toBeVisible();
      const words = (await page.locator("#txt").innerText()).trim().split(/\s+/).length;
      expect(words, `${id} page ${i + 1} words`).toBeGreaterThanOrEqual(20);
      expect(words, `${id} page ${i + 1} words`).toBeLessThanOrEqual(40);
      expect(await page.locator("#txt").innerText()).not.toContain("—");
      await page.locator("#nextBtn").click();
    }
    await expect(page.locator("#txt")).toContainText("You read the whole book!");
  }
  expect(errors, "page errors").toEqual([]);
});

test("bodie's books deep-links to the Cards shelf", async ({ page }) => {
  await page.goto("/play/bodies-books.html#cards", { waitUntil: "networkidle" });
  await expect(page.locator("#tab-cards")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator(".ba-home")).toBeVisible();
});
