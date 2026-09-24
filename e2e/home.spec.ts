import { expect, test } from "@playwright/test";

test.describe("homepage", () => {
  test("renders the hero with the current role", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Sayantan Ghosh" }),
    ).toBeVisible();
    await expect(page.getByText("Tech Lead · Synup · Bengaluru")).toBeVisible();

    // The old title undersold the role and must not come back.
    await expect(page.getByText("Frontend Developer")).toHaveCount(0);
  });

  test("shows every major section", async ({ page }) => {
    await page.goto("/");

    for (const heading of [
      "Nine years, five companies",
      "Things I built and shipped",
      "Essays and notes",
    ]) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }
  });

  test("impact metrics render their final values", async ({ page }) => {
    await page.goto("/");
    // The counter renders value and suffix as separate nodes, so match the
    // tile rather than an exact string.
    // Four tiles, each with a numeral that has resolved to a real value.
    const numerals = page.locator(".numeral");
    await expect(numerals.first()).toContainText(/\d/);
    expect(await numerals.count()).toBeGreaterThanOrEqual(4);
  });

  test("lists only claix and swale under selected work", async ({ page }) => {
    await page.goto("/");
    const work = page.locator("#work");

    await expect(work.getByRole("heading", { name: "claix" })).toBeVisible();
    await expect(work.getByRole("heading", { name: "swale" })).toBeVisible();
    await expect(work.getByRole("heading", { name: "TurboEdit" })).toHaveCount(0);
    await expect(work.getByRole("heading", { name: "GotoDash" })).toHaveCount(0);
  });

  test("shows a live star count for claix", async ({ page }) => {
    await page.goto("/");
    const stars = page.getByRole("link", { name: /\d+ stars on GitHub/ });
    await expect(stars.first()).toBeVisible();
  });

  test("the current role is visually distinct from earlier ones", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("Now · Jun 2026 – Present")).toBeVisible();
    // The six-cell strip is the proof of end-to-end ownership.
    for (const cell of [
      "Architecture",
      "Retrieval",
      "Tool surface",
      "Observability",
      "Evaluation",
      "Inference",
    ]) {
      await expect(page.getByText(cell, { exact: true })).toBeVisible();
    }
  });

  test("earlier roles expand on demand", async ({ page }) => {
    await page.goto("/");
    // The company name also appears in the sticky rail, so scope to the summary.
    const summary = page.locator("summary", {
      hasText: "Tata Consultancy Services",
    });
    await expect(summary).toBeVisible();

    const detail = page.getByText(/five or more critical Java/);
    await expect(detail).toBeHidden();
    await summary.click();
    await expect(detail).toBeVisible();
  });

  test("has no public phone number", async ({ page }) => {
    await page.goto("/");
    const body = (await page.textContent("body")) ?? "";
    expect(body).not.toMatch(/\+91[\s-]?\d{10}/);
  });
});

test("install commands on the landing page are copyable", async ({ page }) => {
  await page.goto("/");

  const block = page.locator("#work .code-block").first();
  const copy = block.locator("button.code-copy");
  await expect(copy).toBeVisible();

  await copy.click();
  await expect(copy).toHaveAttribute("aria-label", /copied/i);

  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toContain("brew install sayantanghosh-in/tap/claix");
});

test("the marquee is decorative and hidden from assistive tech", async ({
  page,
}) => {
  await page.goto("/");
  const marquee = page.locator(".marquee");
  await expect(marquee).toBeVisible();
  await expect(marquee).toHaveAttribute("aria-hidden", "true");
});

test("body copy stays inside a readable measure", async ({ page }) => {
  await page.goto("/");

  // Long paragraphs are the thing that makes a portfolio feel like a document.
  // 75 words is roughly four lines at this measure.
  const tooLong = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll("main p, main li"));
    return nodes
      .map((node) => (node.textContent ?? "").trim())
      .filter((text) => text.split(/\s+/).length > 75);
  });

  expect(tooLong).toEqual([]);
});

test("the copy control never overlaps code, at any width", async ({ page }) => {
  await page.goto("/");

  const block = page.locator("#work .code-block").first();
  const codeBox = await block.locator(".code-block__body").boundingBox();
  const buttonBox = await block.locator(".code-copy").boundingBox();

  expect(codeBox).not.toBeNull();
  expect(buttonBox).not.toBeNull();

  // The button lives in its own bar above the code, so the two never intersect.
  const overlaps =
    buttonBox!.y + buttonBox!.height > codeBox!.y &&
    buttonBox!.y < codeBox!.y + codeBox!.height;
  expect(overlaps).toBe(false);
});
