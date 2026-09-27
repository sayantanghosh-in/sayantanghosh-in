import { version } from "@/package.json";

/**
 * package.json is the single source of truth for the version, so the footer
 * cannot drift from the release. v2 is the rebuild; the 0.1.0 left over from
 * create-next-app never meant anything.
 */
export const VERSION = version;

export const SITE = {
  name: "Sayantan Ghosh",
  role: "Tech Lead, AI Product Engineering",
  url: "https://sayantanghosh.in",
  email: "sayantan.ghosh03@gmail.com",
  location: "Bengaluru, India",
  xHandle: "@sayantan__ghosh",
  description:
    "Tech Lead building production AI agents and the platforms behind them — LangGraph orchestration, RAG, MCP tool surfaces, evals and self-hosted inference. Frontend-leaning fullstack engineer.",
} as const;

export const SOCIALS = {
  github: "https://github.com/sayantanghosh-in",
  linkedin: "https://www.linkedin.com/in/sayantanghosh-in",
  x: "https://x.com/sayantan__ghosh",
  youtube: "https://www.youtube.com/@TheDevGuideYt",
  instagram: "https://www.instagram.com/the.dev.guide",
} as const;
