import { expect, test } from "@playwright/test";

test.describe("theme", () => {
  test("toggles and persists across navigation", async ({ page }) => {
    await page.goto("/");

    const root = page.locator("html");
    const startedDark = await root.evaluate((el) =>
      el.classList.contains("dark"),
    );

    await page.getByRole("button", { name: /toggle colour theme/i }).click();
    await expect(root).toHaveClass(startedDark ? /^(?!.*dark).*$/ : /dark/);

    await page.goto("/blog");
    const stillFlipped = await root.evaluate((el) =>
      el.classList.contains("dark"),
    );
    expect(stillFlipped).toBe(!startedDark);
  });

  test("respects prefers-color-scheme on a first visit", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);
    await context.close();
  });

  test("applies the theme before paint, with no flash", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "commit" });
    // The inline head script runs before the body renders.
    await expect(page.locator("html")).toHaveClass(/dark/);
    await context.close();
  });
});

test.describe("motion", () => {
  test("content is visible when motion is reduced", async ({ browser }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/");

    // Nothing may be left at opacity 0 for reduced-motion users.
    const hidden = await page
      .locator("[data-reveal='hidden']")
      .count();
    expect(hidden).toBe(0);

    await expect(
      page.getByRole("heading", { name: "Essays and notes" }),
    ).toBeVisible();
    await context.close();
  });

  test("content is visible with JavaScript disabled", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Nine years, five companies" }),
    ).toBeVisible();
    await context.close();
  });
});
