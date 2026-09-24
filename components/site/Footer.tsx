import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";

const socials = [
  {
    href: "https://github.com/sayantanghosh-in",
    label: "GitHub",
    Icon: IconBrandGithub,
  },
  {
    href: "https://www.linkedin.com/in/sayantanghosh-in",
    label: "LinkedIn",
    Icon: IconBrandLinkedin,
  },
  { href: "https://x.com/sayantan__ghosh", label: "X", Icon: IconBrandX },
  {
    href: "https://www.youtube.com/@TheDevGuideYt",
    label: "YouTube",
    Icon: IconBrandYoutube,
  },
  {
    href: "https://www.instagram.com/the.dev.guide",
    label: "Instagram",
    Icon: IconBrandInstagram,
  },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line">
      <div className="container-page">
        <div className="rails flex flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
          <div className="max-w-sm">
            <p className="display-md">Sayantan Ghosh</p>
            <p className="mt-2 text-sm text-fg-2">
              Tech Lead at Synup. I build AI agents and the platforms that ship
              them.
            </p>
            <a
              href="mailto:sayantan.ghosh03@gmail.com"
              className="mt-4 inline-block text-sm text-accent-ink underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
            >
              sayantan.ghosh03@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <ul className="flex flex-wrap items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-md border border-line text-fg-2 transition-colors duration-200 hover:border-line-hi hover:text-fg"
                  >
                    <Icon size={16} />
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/sayantan-ghosh-resume.pdf"
              className="eyebrow transition-colors duration-200 hover:text-fg"
            >
              Download résumé ↓
            </Link>
          </div>
        </div>

        <div className="rails flex flex-col gap-1 border-t border-line px-4 py-5 text-xs text-fg-3 sm:flex-row sm:justify-between sm:px-6">
          <span>Made in Bengaluru, India</span>
          <span>© {new Date().getFullYear()} Sayantan Ghosh</span>
        </div>
      </div>
    </footer>
  );
}
