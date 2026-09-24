import { expect, test } from "@playwright/test";

const CLAIX = "/blog/claix-a-terminal-ui-for-your-claude-code-sessions";
const HIDDEN = "/blog/building-swale-a-terminal-assistant-with-a-mind-of-its-own";

test.describe("blog index", () => {
  test("lists published posts with category and reading time", async ({
    page,
  }) => {
    await page.goto("/blog");

    await expect(
      page.getByRole("heading", { name: "Essays and notes" }),
    ).toBeVisible();
    await expect(page.getByText("Engineering").first()).toBeVisible();
    await expect(page.getByText(/\d+ min read/).first()).toBeVisible();
  });

  test("hides posts marked published: false", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByText(/Building swale/)).toHaveCount(0);
  });
});

test.describe("blog post", () => {
  test("renders GFM tables as real tables", async ({ page }) => {
    await page.goto(CLAIX);

    const table = page.locator(".prose table");
    await expect(table).toBeVisible();
    await expect(table.locator("td").first()).toBeVisible();

    // The regression this guards: without remark-gfm, rows arrived as text.
    const prose = (await page.locator(".prose").textContent()) ?? "";
    expect(prose).not.toContain("|---|");
  });

  test("code blocks are readable and copyable", async ({ page }) => {
    await page.goto(CLAIX);

    const pre = page.locator(".prose pre").first();
    await expect(pre).toBeVisible();

    // The bug this guards: pre text was inheriting a light grey meant for a
    // dark background, making it invisible on the light surface.
    const { color, background } = await pre.evaluate((el) => {
      const style = getComputedStyle(el);
      return { color: style.color, background: style.backgroundColor };
    });
    expect(color).not.toBe(background);

    const block = page.locator(".code-block").first();
    await block.hover();
    const copy = block.getByRole("button", { name: /copy code/i });
    await expect(copy).toBeVisible();

    await copy.click();
    await expect(copy).toHaveText(/copied/i);

    const clipboard = await page.evaluate(() =>
      navigator.clipboard.readText(),
    );
    expect(clipboard).toContain("brew install");
  });

  test("shows category, date and reading time", async ({ page }) => {
    await page.goto(CLAIX);
    await expect(page.getByText("24 September 2026")).toBeVisible();
    await expect(page.getByText(/\d+ min read/)).toBeVisible();
  });

  test("offers navigation to the neighbouring post", async ({ page }) => {
    await page.goto(CLAIX);
    await expect(page.getByText(/Previous|Next/).first()).toBeVisible();
  });

  test("a hidden post 404s rather than rendering", async ({ page }) => {
    const response = await page.goto(HIDDEN);
    expect(response?.status()).toBe(404);
  });

  test("the demo video is served, not a 1.4MB gif", async ({ page }) => {
    await page.goto(CLAIX);
    const video = page.locator(".prose video");
    await expect(video).toBeVisible();
    await expect(video).toHaveJSProperty("muted", true);
  });

  test("the X embed script stays off the critical path", async ({ page }) => {
    const requests: string[] = [];
    page.on("request", (request) => requests.push(request.url()));

    await page.goto(CLAIX, { waitUntil: "domcontentloaded" });
    expect(requests.some((url) => url.includes("platform.x.com"))).toBe(false);
  });
});
