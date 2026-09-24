import { IconStar } from "@tabler/icons-react";

import {
  ArrowLink,
  Card,
  CodeBlock,
  PillList,
  Section,
  SectionHeading,
} from "@/components/primitives";
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
    <Section id="work">
      <CodeCopy />
      <SectionHeading
        eyebrow="Selected work"
        title="Things I built and shipped"
        lede="Open source, in the open. Both solve a problem I had first."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.repo} delay={index * 80}>
            <Card interactive className="flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="display-md">{project.name}</h3>
                  <p className="mt-1 text-sm text-fg-3">{project.tagline}</p>
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
                <div className="mt-6">
                  <CodeBlock label="install">{project.install}</CodeBlock>
                </div>
              ) : null}

              <PillList items={project.stack} />

              <div className="mt-auto pt-6">
                <ArrowLink external href={`https://github.com/${project.repo}`}>
                  View on GitHub
                </ArrowLink>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
