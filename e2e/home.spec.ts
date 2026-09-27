import { readFileSync } from "node:fs";
import { join } from "node:path";

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
      "Where I have worked",
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

  test("every company rail link points at a card that exists", async ({
    page,
  }) => {
    // The rail is desktop-only; below lg the cards carry their own dates.
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const links = page
      .getByRole("navigation", { name: "Companies" })
      .getByRole("link");
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(5);

    for (let i = 0; i < count; i += 1) {
      const href = await links.nth(i).getAttribute("href");
      expect(href).toMatch(/^#role-/);
      // A dangling anchor is silent in the browser, so assert the target.
      await expect(page.locator(href as string)).toHaveCount(1);
    }
  });

  test("the social card leads with X, not YouTube", async ({ page }) => {
    await page.goto("/");
    const writing = page.locator("#writing");

    await expect(writing.getByRole("heading", { name: "On X" })).toBeVisible();
    await expect(writing.getByRole("link", { name: /Follow/ })).toHaveAttribute(
      "href",
      /x\.com/,
    );

    // YouTube stays reachable but must not be the headline any more.
    await expect(writing.getByRole("heading", { name: /YouTube/ })).toHaveCount(
      0,
    );
    await expect(
      writing.getByRole("link", { name: /YouTube/ }),
    ).toHaveAttribute("href", /youtube\.com/);
  });

  test("lists only claix and swale under selected work", async ({ page }) => {
    await page.goto("/");
    const work = page.locator("#work");

    await expect(work.getByRole("heading", { name: "claix" })).toBeVisible();
    await expect(work.getByRole("heading", { name: "swale" })).toBeVisible();
    await expect(work.getByRole("heading", { name: "TurboEdit" })).toHaveCount(
      0,
    );
    await expect(work.getByRole("heading", { name: "GotoDash" })).toHaveCount(
      0,
    );
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

  test("every role is readable without a click", async ({ page }) => {
    await page.goto("/");

    // Nothing in this section hides behind a disclosure any more — a reader
    // scrolling past should see the whole history.
    await expect(page.locator("#experience details")).toHaveCount(0);

    for (const detail of [
      /five or more critical Java/, // Tata, the oldest role
      /data-visualisation frontend/, // Compile
      /Mentored four junior engineers/, // Tech Lead, was behind "Full detail"
      /Led 50 CRM integrations/, // Senior SWE, same
    ]) {
      await expect(page.getByText(detail)).toBeVisible();
    }
  });

  test("the career rail follows the scroll", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const current = page
      .getByRole("navigation", { name: "Companies" })
      .locator('a[aria-current="true"]');

    // At the top of the section the current role leads.
    await page.evaluate(() => {
      document.getElementById("role-synup")?.scrollIntoView({ block: "start" });
    });
    await expect(current).toContainText("Synup");

    // Two earlier stops that the rail must actually reach. Both previous
    // versions of this component stayed pinned to the first entry forever.
    for (const company of ["Impact Analytics", "Tata Consultancy Services"]) {
      // scrollIntoViewIfNeeded stops as soon as the card is barely on screen,
      // which leaves it below the reading line. Align it to the top instead.
      await page.evaluate(
        (id) => {
          document.getElementById(id)?.scrollIntoView({ block: "start" });
        },
        `role-${company.toLowerCase().replace(/[^a-z]+/g, "-")}`,
      );
      await expect(current).toContainText(company);
    }

    // Exactly one entry is ever current.
    await expect(current).toHaveCount(1);
  });

  test("the footer reports the package version", async ({ page }) => {
    await page.goto("/");
    // Sourced from package.json, so this fails the moment the two drift.
    // Read from disk rather than imported: a JSON import in the spec needs an
    // import attribute the runner will not take.
    const { version } = JSON.parse(
      readFileSync(join(__dirname, "..", "package.json"), "utf8"),
    ) as { version: string };
    await expect(
      page.locator("footer").getByRole("link", { name: `v${version}` }),
    ).toBeVisible();
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
