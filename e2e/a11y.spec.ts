import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/blog",
  "/blog/claix-a-terminal-ui-for-your-claude-code-sessions",
];

/*
 * Reduced motion is not a special case here — it is the only state in which
 * colour contrast can be measured honestly. With animations running, axe
 * samples elements mid-fade and reports the blended colour, which produced a
 * page full of false failures.
 */
test.use({ reducedMotion: "reduce" });

for (const route of routes) {
  test(`${route} has no accessibility violations`, async ({ page }) => {
    await page.goto(route);
    // Settle any layout work before sampling computed styles.
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.length,
        example: violation.nodes[0]?.html?.slice(0, 120),
      })),
    ).toEqual([]);
  });

  test(`${route} has no accessibility violations in dark mode`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.length,
        example: violation.nodes[0]?.html?.slice(0, 120),
      })),
    ).toEqual([]);
  });
}

test("the skip link is the first thing a keyboard reaches", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
});
