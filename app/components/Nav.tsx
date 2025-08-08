import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="border-x-1 px-2">
      <ul className="flex flex-row gap-4 items-center justify-end">
        <li>
          <Link
            href="https://sayantanghosh.in"
            className="text-sm text-[var(--accent-foreground)]"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="https://sayantanghosh.in/blog"
            className="text-sm text-[var(--accent-foreground)]"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/sayantanghosh-in"
          >
            <IconBrandLinkedin
              size={16}
              stroke={1.5}
              color="var(--accent-foreground)"
            />
          </Link>
        </li>
        <li>
          <Link target="_blank" href="https://x.com/sayantan__ghosh">
            <IconBrandTwitter
              size={16}
              stroke={1.5}
              color="var(--accent-foreground)"
            />
          </Link>
        </li>
        <li>
          <Link target="_blank" href="https://github.com/sayantanghosh-in">
            <IconBrandGithub
              size={16}
              stroke={1.5}
              color="var(--accent-foreground)"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
