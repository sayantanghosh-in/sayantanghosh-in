"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconBrandGithub } from "@tabler/icons-react";

import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#writing", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className="sticky top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-200 data-scrolled:border-line data-scrolled:bg-bg/72 data-scrolled:backdrop-blur-xl"
    >
      <div className="container-page">
        <nav
          aria-label="Primary"
          className="flex h-16 items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="display-md -mx-2 rounded-md px-2 py-2 text-base tracking-tight transition-colors duration-200 hover:text-accent-ink"
          >
            Sayantan Ghosh
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <ul className="mr-1 hidden items-center gap-1 sm:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm text-fg-2 transition-colors duration-200 hover:bg-bg-band hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="https://github.com/sayantanghosh-in"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="grid size-9 place-items-center rounded-md border border-line text-fg-2 transition-colors duration-200 hover:border-line-hi hover:text-fg"
            >
              <IconBrandGithub size={16} />
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
