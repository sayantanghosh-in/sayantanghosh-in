"use client";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav>
      <ul className="mt-4 md:mt-16">
        <li>
          <Link
            href="#about"
            className="w-fit py-2 flex items-center gap-2 group"
          >
            <span className="navigation-marker w-8 h-px bg-[var(--color-navy-dark)] group-hover:bg-foreground group-hover:w-12 transition-all duration-2s" />
            <span>About</span>
          </Link>
        </li>
        <li>
          <Link
            href="#experience"
            className="w-fit py-2 flex items-center gap-2 group"
          >
            <span className="navigation-marker w-8 h-px bg-[var(--color-navy-dark)] group-hover:bg-foreground group-hover:w-12 transition-all duration-2s" />
            <span>Experience</span>
          </Link>
        </li>
        <li>
          <Link
            href="#projects"
            className="w-fit py-2 flex items-center gap-2 group"
          >
            <span className="navigation-marker w-8 h-px bg-[var(--color-navy-dark)] group-hover:bg-foreground group-hover:w-12 transition-all duration-2s" />
            <span>Projects</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
