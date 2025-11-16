import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconFileCv,
} from "@tabler/icons-react";
import Link from "next/link";

export const Social = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center border-x-1 p-2">
      <Link
        aria-label="Sayantan Ghosh Linkedin"
        target="_blank"
        href="https://www.linkedin.com/in/sayantanghosh-in"
      >
        <IconBrandLinkedin
          size={24}
          stroke={1.5}
          color="var(--accent-foreground)"
        />
      </Link>
      <Link
        aria-label="Sayantan Ghosh Twitter / X"
        target="_blank"
        href="https://x.com/sayantan__ghosh"
      >
        <IconBrandTwitter
          size={24}
          stroke={1.5}
          color="var(--accent-foreground)"
        />
      </Link>
      <Link
        aria-label="Sayantan Ghosh Github"
        target="_blank"
        href="https://github.com/sayantanghosh-in"
      >
        <IconBrandGithub
          size={24}
          stroke={1.5}
          color="var(--accent-foreground)"
        />
      </Link>
      <Link
        aria-label="Sayantan Ghosh Leetcode"
        target="_blank"
        href="https://leetcode.com/u/sgsh"
      >
        <IconBrandLeetcode
          size={24}
          stroke={1.5}
          color="var(--accent-foreground)"
        />
      </Link>
      <Link
        aria-label="Sayantan Ghosh Instagram"
        target="_blank"
        href="https://www.instagram.com/sayantanghosh_in"
      >
        <IconBrandInstagram
          size={24}
          stroke={1.5}
          color="var(--accent-foreground)"
        />
      </Link>
      <Link
        aria-label="Sayantan Ghosh Resume"
        target="_blank"
        href="/sayantan_ghosh_resume.pdf"
      >
        <IconFileCv size={24} stroke={1.5} color="var(--accent-foreground)" />
      </Link>
    </div>
  );
};
