import { expect, test } from "@playwright/test";

test.describe("seo", () => {
  test("homepage carries canonical, OG and Person structured data", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://sayantanghosh.in",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);

    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    expect(JSON.parse(jsonLd ?? "{}")["@type"]).toBe("Person");
  });

  test("posts carry BlogPosting structured data", async ({ page }) => {
    await page.goto("/blog/claix-a-terminal-ui-for-your-claude-code-sessions");
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    const parsed = JSON.parse(jsonLd ?? "{}");
    expect(parsed["@type"]).toBe("BlogPosting");
    expect(parsed.datePublished).toBe("2026-09-24");
  });

  test("sitemap lists published posts and excludes drafts", async ({
    request,
  }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("/blog/claix-a-terminal-ui");
    expect(xml).not.toContain("building-swale");
  });

  test("robots.txt points at the sitemap and shields private routes", async ({
    request,
  }) => {
    const txt = await (await request.get("/robots.txt")).text();
    expect(txt).toContain("Sitemap: https://sayantanghosh.in/sitemap.xml");
    expect(txt).toContain("/api/");
  });

  test("loads no third-party scripts or stylesheets", async ({ page }) => {
    const external: string[] = [];
    page.on("request", (request) => {
      const url = request.url();
      const type = request.resourceType();
      if (
        (type === "script" || type === "stylesheet" || type === "font") &&
        !url.includes("localhost")
      ) {
        external.push(url);
      }
    });

    await page.goto("/", { waitUntil: "networkidle" });
    expect(external).toEqual([]);
  });
});
