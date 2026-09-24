import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/blog",
  "/blog/claix-a-terminal-ui-for-your-claude-code-sessions",
];
const widths = [320, 390, 768, 1024, 1440];

/*
 * Guards the whole site, not one component. Anything that leaks past the
 * viewport — a rotated ribbon, a wide table, a long unbroken string — fails
 * here rather than being found on someone's phone.
 */
for (const route of routes) {
  for (const width of widths) {
    test(`${route} does not scroll sideways at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: "networkidle" });

      const { overflowBy, culprits } = await page.evaluate(() => {
        const doc = document.documentElement;
        const docWidth = doc.clientWidth;

        /*
         * Only elements that are NOT inside a clipping ancestor count. The
         * marquee deliberately extends past the viewport and is clipped; that
         * is not a bug. What matters is whether the document itself scrolls.
         */
        const offenders: string[] = [];
        document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;
          if (rect.right <= docWidth + 1) return;

          let node: HTMLElement | null = el.parentElement;
          while (node && node !== document.body) {
            const overflow = getComputedStyle(node).overflowX;
            if (overflow === "hidden" || overflow === "clip") return;
            node = node.parentElement;
          }

          const cls = (el.className || "").toString().split(" ")[0];
          offenders.push(`${el.tagName.toLowerCase()}${cls ? "." + cls : ""}`);
        });

        return {
          overflowBy: doc.scrollWidth - docWidth,
          culprits: [...new Set(offenders)].slice(0, 5),
        };
      });

      /*
       * The assertion is that the DOCUMENT does not scroll sideways. An
       * element whose own box extends past the viewport while being clipped
       * (the marquee) is fine; culprits are reported only to make a real
       * failure diagnosable.
       */
      expect(
        overflowBy,
        culprits.length ? `overflowing: ${culprits.join(", ")}` : undefined,
      ).toBe(0);
    });
  }
}

test("interactive controls meet the WCAG 2.2 AA target size", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");

  const tooSmall = await page.evaluate(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("header button, header a"),
    );
    return nodes
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.width < 24 || r.height < 24);
      })
      .map((el) => el.getAttribute("aria-label") ?? el.textContent?.trim());
  });

  expect(tooSmall).toEqual([]);
});
