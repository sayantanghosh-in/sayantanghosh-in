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
            href="/"
            className="text-md md:text-sm text-[var(--accent-foreground)]"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className="text-md md:text-sm text-[var(--accent-foreground)]"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            aria-label="Sayantan Ghosh Linkedin"
            href="https://www.linkedin.com/in/sayantanghosh-in"
          >
            <IconBrandLinkedin
              className="w-[24px] h-[24px] md:w-[16px] md:h-[16px]"
              stroke={1.5}
              color="var(--accent-foreground)"
            />
          </Link>
        </li>
        <li>
          <Link
            aria-label="Sayantan Ghosh Twitter / X"
            target="_blank"
            href="https://x.com/sayantan__ghosh"
          >
            <IconBrandTwitter
              className="w-[24px] h-[24px] md:w-[16px] md:h-[16px]"
              stroke={1.5}
              color="var(--accent-foreground)"
            />
          </Link>
        </li>
        <li>
          <Link
            aria-label="Sayantan Ghosh Github"
            target="_blank"
            href="https://github.com/sayantanghosh-in"
          >
            <IconBrandGithub
              className="w-[24px] h-[24px] md:w-[16px] md:h-[16px]"
              stroke={1.5}
              color="var(--accent-foreground)"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
