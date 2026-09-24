"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";

/**
 * No state and no effect: both icons render, CSS shows the right one based on
 * the `dark` class the inline head script already set. That sidesteps the
 * hydration mismatch a stateful toggle would create.
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private mode or blocked storage — the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="grid size-9 place-items-center rounded-md border border-line text-fg-2 transition-colors duration-200 hover:border-line-hi hover:text-fg"
    >
      <IconMoon size={16} className="dark:hidden" />
      <IconSun size={16} className="hidden dark:block" />
    </button>
  );
}
