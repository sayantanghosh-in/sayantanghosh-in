"use client";

import { useEffect, useState } from "react";

export type RailEntry = {
  id: string;
  company: string;
  from: string;
};

/**
 * The career rail, as a scrollspy.
 *
 * Two earlier versions of this did not work. The first was a CSS
 * `animation-timeline` overlay that painted as disconnected orange segments;
 * the second was a plain anchor list where the first dot was hardcoded as
 * current, so the rail never responded to scrolling at all.
 *
 * This one measures. Each company card carries an id, and on every frame that
 * the page scrolls we ask which of those cards has crossed the reading line.
 * The line fills down to it and its label goes solid, so the rail reports
 * where you are as well as where you can jump.
 *
 * The list items are deliberately contiguous — padding inside each `li`, no
 * `space-y` between them — because the border-left segments have to meet to
 * read as one continuous line. That gap is what broke the first version.
 */
export function CareerRail({ entries }: { entries: readonly RailEntry[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      // The reading line sits just below the sticky header. A fifth of the
      // viewport is about right on a laptop; the floor keeps it clear of the
      // header on short windows, where a fifth would land behind it.
      const readingLine = Math.max(140, window.innerHeight * 0.2);

      // Whichever card the line is currently crossing wins. Asking only
      // "which tops have scrolled past" is not enough: the shorter cards are
      // ~180px tall, so two or three of them clear the line at once and the
      // answer jumps to whichever is lowest.
      let crossing = -1;
      let lastPassed = 0;

      entries.forEach((entry, index) => {
        const element = document.getElementById(entry.id);
        if (!element) return;

        const { top, bottom } = element.getBoundingClientRect();
        if (top > readingLine) return;

        lastPassed = index;
        if (bottom > readingLine) crossing = index;
      });

      // The fallback covers the gaps between cards and the tail of the
      // section, where no card is under the line at all.
      setActiveIndex(crossing >= 0 ? crossing : lastPassed);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Deferred rather than measured inline, so a deep link lands correctly
    // without a layout read during the effect.
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [entries]);

  return (
    <nav aria-label="Companies" className="hidden lg:block">
      <div className="sticky top-28">
        <ol>
          {entries.map((entry, index) => {
            const passed = index <= activeIndex;
            const current = index === activeIndex;

            return (
              <li
                key={entry.id}
                className={`relative border-l-2 pb-6 pl-5 transition-colors duration-300 last:pb-0 ${
                  passed ? "border-accent" : "border-line"
                }`}
              >
                <a
                  href={`#${entry.id}`}
                  aria-current={current ? "true" : undefined}
                  className="group block"
                >
                  <span
                    aria-hidden
                    className={`absolute -left-[5px] top-1.5 size-2 rounded-full ring-4 ring-bg transition-colors duration-300 ${
                      passed ? "bg-accent" : "bg-line-hi"
                    }`}
                  />
                  <span
                    className={`block text-sm transition-colors duration-200 group-hover:text-accent-ink ${
                      current ? "font-semibold text-fg" : "text-fg-2"
                    }`}
                  >
                    {entry.company}
                  </span>
                  <span className="eyebrow mt-0.5 block">{entry.from}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
