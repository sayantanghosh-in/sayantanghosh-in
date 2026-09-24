import { IconBrandGithub, IconStar } from "@tabler/icons-react";

import { CodeCopy } from "@/components/site/CodeCopy";
import { Reveal } from "@/components/site/Reveal";

type Project = {
  repo: string;
  name: string;
  tagline: string;
  body: string;
  stack: readonly string[];
  install?: string;
  /** Shown if the GitHub API is unreachable at build time. */
  fallbackStars: number;
};

const projects: Project[] = [
  {
    repo: "sayantanghosh-in/claix",
    name: "claix",
    tagline: "A terminal UI for your Claude Code sessions",
    body: "Claude Code scatters sessions across every project you have ever opened. claix indexes them all, makes them searchable, and resumes any of them in the right directory. One static binary, zero config.",
    stack: ["Go", "Bubble Tea", "Homebrew"],
    install: "brew install sayantanghosh-in/tap/claix",
    fallbackStars: 5,
  },
  {
    repo: "sayantanghosh-in/swale",
    name: "swale",
    tagline: "A developer assistant that lives in your terminal",
    body: "Your pull requests, LeetCode streak, notes and todos in one local SQLite database — with an agent on top that decides for itself which to read. Works offline, against a model on your own machine.",
    stack: ["TypeScript", "Node", "SQLite", "Vercel AI SDK"],
    install: "npx @itssayantan/swale",
    fallbackStars: 0,
  },
];

async function getStars(repo: string, fallback: number): Promise<number> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return fallback;
    const data = (await response.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : fallback;
  } catch {
    return fallback;
  }
}

export async function Projects() {
  const stars = await Promise.all(
    projects.map((project) => getStars(project.repo, project.fallbackStars)),
  );

  return (
    <section id="work" className="border-b border-line">
      <CodeCopy />
      <div className="container-page">
        <div className="rails px-4 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 className="display-lg scroll-enter mt-3">Things I built and shipped</h2>
            <p className="mt-4 max-w-[60ch] text-base text-fg-2">
              Open source, in the open. Both solve a problem I had first.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.repo} delay={index * 80}>
                <article className="card-surface scroll-settle flex h-full flex-col p-6 hover:-translate-y-0.5 hover:border-line-hi hover:shadow-lift sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="display-md">{project.name}</h3>
                      <p className="mt-1 text-sm text-fg-3">
                        {project.tagline}
                      </p>
                    </div>
                    {stars[index] ? (
                      <a
                        href={`https://github.com/${project.repo}/stargazers`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${stars[index]} stars on GitHub`}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-sm text-fg-2 transition-colors duration-200 hover:border-accent hover:text-accent-ink"
                      >
                        <IconStar size={14} className="text-accent" />
                        <span className="numeral text-sm">{stars[index]}</span>
                      </a>
                    ) : null}
                  </div>

                  <p className="mt-5 max-w-[60ch] text-sm text-fg-2">
                    {project.body}
                  </p>

                  {project.install ? (
                    <div className="code-block mt-6">
                      <code
                        data-copyable
                        className="block overflow-x-auto rounded-md border border-line bg-bg-band py-2.5 pl-3 pr-20 font-mono text-xs text-fg-2"
                      >
                        {project.install}
                      </code>
                    </div>
                  ) : null}

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="eyebrow rounded-full border border-line px-2.5 py-1 text-fg-3"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://github.com/${project.repo}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-accent-ink underline decoration-accent/30 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
                  >
                    <IconBrandGithub size={15} />
                    View on GitHub
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
