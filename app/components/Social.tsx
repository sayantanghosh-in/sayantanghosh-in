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
      <Link target="_blank" href="https://www.linkedin.com/in/sayantanghosh-in">
        <IconBrandLinkedin
          size={24}
          stroke={1.5}
          color="var(--accent-foreground)"
        >
          Sayantan Ghosh Linkedin
        </IconBrandLinkedin>
      </Link>
      <Link target="_blank" href="https://x.com/sayantan__ghosh">
        <IconBrandTwitter
          size={24}
          stroke={1.5}
          color="var(--accent-foreground)"
        >
          Sayantan Ghosh Twitter / X
        </IconBrandTwitter>
      </Link>
      <Link target="_blank" href="https://github.com/sayantanghosh-in">
        <IconBrandGithub
          size={24}
          stroke={1.5}
          color="var(--accent-foreground)"
        >
          Sayantan Ghosh Github
        </IconBrandGithub>
      </Link>
      <Link target="_blank" href="https://leetcode.com/u/sgsh">
        <IconBrandLeetcode
          size={24}
          stroke={1.5}
          color="var(--accent-foreground)"
        >
          Sayantan Ghosh Leetcode
        </IconBrandLeetcode>
      </Link>
      <Link target="_blank" href="https://www.instagram.com/sayantanghosh_in">
        <IconBrandInstagram
          size={24}
          stroke={1.5}
          color="var(--accent-foreground)"
        >
          Sayantan Ghosh Instagram
        </IconBrandInstagram>
      </Link>
      <Link target="_blank" href="/sayantan_ghosh_resume.pdf">
        <IconFileCv size={24} stroke={1.5} color="var(--accent-foreground)">
          Sayantan Ghosh Resume
        </IconFileCv>
      </Link>
    </div>
  );
};
