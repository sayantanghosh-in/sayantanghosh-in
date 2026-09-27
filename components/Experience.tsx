import {
  Card,
  CardBody,
  CardHeader,
  Pill,
  Section,
  SectionHeading,
} from "@/components/primitives";
import { CareerRail, type RailEntry } from "@/components/site/CareerRail";
import { Reveal } from "@/components/site/Reveal";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

/** How the agent is built, end to end. The visual proof of ownership. */
const agentStack = [
  {
    label: "Architecture",
    body: "LangGraph state machines — tool use that is explicit and resumable.",
  },
  {
    label: "Retrieval",
    body: "RAG over a SQL vector store, grounding measured not assumed.",
  },
  {
    label: "Tool surface",
    body: "MCP servers built and integrated; the tool catalogue re-architected.",
  },
  {
    label: "Observability",
    body: "Every run traced in LangSmith, so regressions surface early.",
  },
  {
    label: "Evaluation",
    body: "Golden conversations gating every prompt and model change.",
  },
  {
    label: "Inference",
    body: "Open-weight models self-hosted on Runpod, chosen per workload.",
  },
] as const;

const leadMetrics = [
  { value: "80%", label: "fewer tokens per request" },
  { value: "6", label: "stages owned, architecture to inference" },
] as const;

const leadHighlights = [
  "Took an agent from research question to production, then built the eval harness before scaling it — nothing ships unless the run is green.",
  "Cut tokens per request by 80% by re-architecting how the tool catalogue reaches the model.",
] as const;

const leadDetail = [
  "Replaced a third-party issue tracker with an in-house platform and drove the migration — pilot team, automated import, parallel run, hard cut-over. An MCP integration was the lever: it offered something the incumbent could not, so the new tool became the path of least resistance rather than a mandate.",
  "Built that platform end to end on React, FastAPI, PostgreSQL, Redis, Kafka and Elasticsearch.",
  "Own the Python services behind the AI features alongside the React front end, and review on both sides of the stack.",
  "Mentored four junior engineers into full-time roles.",
] as const;

type Role = {
  designation: string;
  date: string;
  lead: string;
  detail?: readonly string[];
  stack: readonly string[];
};

const synupLadder: Role[] = [
  {
    designation: "Senior Software Engineer",
    date: "Oct 2022 – May 2026",
    lead: "Several products had drifted into their own versions of the same buttons and tables. Standardising them was a consensus problem more than a coding one: I brought the frontend engineers across teams to a single component contract rather than mandating one. Internal developers were the customers — adoption was the metric, not the release.",
    detail: [
      "Led UI for new marketing products and mentored junior engineers, improving onboarding efficiency by about 25%.",
      "Led 50 CRM integrations processing over 2M mailbox messages a month, and built a unified email-parsing suite behind them.",
      "Integrated ag-Grid and dnd-kit for complex data and drag interactions, lifting functionality and UX by over 20%.",
      "Refactored the legacy codebase solo: build times down 15%, page response down 10%.",
    ],
    stack: ["React", "TypeScript", "Storybook", "Apollo GraphQL", "Next.js"],
  },
  {
    designation: "Software Engineer",
    date: "May 2021 – Oct 2022",
    lead: "Made test-driven development the company standard — post-release defects fell 18% and code quality rose 25% — and shipped the social and CRM integrations that grew revenue 10%.",
    stack: ["React", "TypeScript", "Express", "PostgreSQL"],
  },
];

type Company = {
  company: string;
  role: string;
  date: string;
  months: number;
  summary: string;
  stack: readonly string[];
};

const earlier: Company[] = [
  {
    company: "Senseforth AI",
    role: "Software Engineer",
    date: "Jun 2020 – May 2021",
    months: 12,
    summary:
      "Upgraded a conversational chatbot platform for the BFSI domain, improving response times 15%, and cut marketing email templating effort 30% with a mini framework.",
    stack: ["React", "TypeScript"],
  },
  {
    company: "Compile Inc.",
    role: "Software Developer",
    date: "Apr 2020 – Jun 2020",
    months: 3,
    summary:
      "Built a data-visualisation frontend for the life sciences sector, lifting platform adoption 20%.",
    stack: ["Vue.js", "Django"],
  },
  {
    company: "Impact Analytics",
    role: "Software Engineer",
    date: "Jan 2019 – Mar 2020",
    months: 14,
    summary:
      "Full-stack retail allocation apps; data consistency and UX up 22%, API latency down 15%. Won an internal hackathon for the most realistic solution of 15 entries.",
    stack: ["React", "Node.js", "PostgreSQL"],
  },
  {
    company: "Tata Consultancy Services",
    role: "Assistant Systems Engineer",
    date: "Jul 2017 – Jan 2019",
    months: 18,
    summary:
      "Delivered five or more critical Java and Spring Boot modules on schedule, migrating customer applications off legacy stacks. Led a three-person team to first place in a business-unit hackathon for AWS microservices.",
    stack: ["Java", "Spring Boot", "Angular"],
  },
];

/* Proportional tenure, so the longest stint reads as the longest without stating a number. */
const SYNUP_MONTHS = 64;
const tenure = [
  { label: "Synup", months: SYNUP_MONTHS },
  ...earlier.map((c) => ({ label: c.company, months: c.months })),
];
const totalMonths = tenure.reduce((sum, t) => sum + t.months, 0);

/**
 * One helper generates the anchor id, and both the rail and the cards call it.
 * When they were written out separately the rail linked to ids that no longer
 * existed and nothing complained.
 */
function railId(company: string) {
  return `role-${company
    .toLowerCase()
    .replace(/[^a-z]+/g, "-")
    .replace(/-$/, "")}`;
}

/** Drives the rail. Ids match the anchors on the cards beside it. */
const timeline: RailEntry[] = [
  { id: railId("Synup"), company: "Synup", from: "2021 — now" },
  ...earlier.map((company) => ({
    id: railId(company.company),
    company: company.company,
    from: company.date.split("–")[0]?.trim() ?? "",
  })),
];

/* ------------------------------------------------------------------ */
/* View                                                                */
/* ------------------------------------------------------------------ */

function StackPills({ stack }: { stack: readonly string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {stack.map((item) => (
        <Pill key={item}>{item}</Pill>
      ))}
    </ul>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <SectionHeading eyebrow="Experience" title="Where I have worked" />
      </Reveal>

      {/* Proportional tenure bar */}
      <Reveal delay={80}>
        <div
          className="mt-8 flex h-2 w-full gap-px overflow-hidden rounded-full"
          role="img"
          aria-label="Relative time spent at each company, longest first: Synup, Tata Consultancy Services, Impact Analytics, Senseforth AI, Compile"
        >
          {tenure.map((segment, index) => (
            <div
              key={segment.label}
              style={{ width: `${(segment.months / totalMonths) * 100}%` }}
              className={index === 0 ? "bg-accent" : "bg-line-hi"}
            />
          ))}
        </div>
        <p className="eyebrow mt-3">Most of it in one place</p>
      </Reveal>

      <div className="mt-14 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
        <CareerRail entries={timeline} />

        <div className="space-y-6">
          {/* ---------- Feature card: the current role ---------- */}
          <Reveal>
            <Card id={railId("Synup")} variant="feature">
              <CardHeader>
                <p className="eyebrow text-accent-ink">
                  Now · Jun 2026 – Present
                </p>
                <h3 className="display-md mt-2">Tech Lead — Synup</h3>
              </CardHeader>

              <CardBody>
                <p className="max-w-[68ch] text-base text-fg-2">
                  I lead the AI product line — architecture, retrieval, tool
                  surface, evals and inference, and the team that ships it. I
                  also build the internal platforms the engineering org runs on.
                </p>

                {/* Six-cell strip: end-to-end ownership, scannable */}
                <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2 lg:grid-cols-3">
                  {agentStack.map((cell, index) => (
                    <Reveal
                      key={cell.label}
                      delay={index * 40}
                      className="bg-bg-elev p-4"
                    >
                      <p className="eyebrow text-accent-ink">{cell.label}</p>
                      <p className="mt-2 text-sm text-fg-2">{cell.body}</p>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-8">
                  {leadMetrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="numeral text-3xl text-fg">{metric.value}</p>
                      <p className="mt-1 text-sm text-fg-3">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <ul className="mt-8 space-y-4">
                  {leadHighlights.map((item) => (
                    <li
                      key={item}
                      className="max-w-[68ch] border-l-2 border-line pl-4 text-sm text-fg-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 space-y-4">
                  {leadDetail.map((item) => (
                    <li
                      key={item}
                      className="max-w-[68ch] border-l-2 border-line pl-4 text-sm text-fg-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <StackPills
                  stack={[
                    "LangGraph",
                    "LangChain",
                    "LangSmith",
                    "MCP",
                    "FastAPI",
                    "SQL vector store",
                    "Runpod",
                    "React",
                  ]}
                />
                <p className="eyebrow mt-3">
                  Also worked with — Azure AI Foundry
                </p>
              </CardBody>
            </Card>
          </Reveal>

          {/* ---------- The ladder below it ---------- */}
          {synupLadder.map((role, index) => (
            <Reveal key={role.designation} delay={index * 60}>
              <Card interactive className="px-5 py-6 sm:px-7">
                <p className="eyebrow">{role.date}</p>
                <h3 className="mt-1.5 text-lg font-semibold">
                  {role.designation} — Synup
                </h3>
                <p className="mt-3 max-w-[68ch] text-sm text-fg-2">
                  {role.lead}
                </p>

                {role.detail ? (
                  <ul className="mt-4 space-y-3">
                    {role.detail.map((item) => (
                      <li
                        key={item}
                        className="max-w-[68ch] border-l-2 border-line pl-4 text-sm text-fg-2"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <StackPills stack={role.stack} />
              </Card>
            </Reveal>
          ))}

          {/*
            Earlier companies. These used to be a stack of collapsed rows,
            which meant the rail towered over four lines of text and the
            scrollspy had nothing to track. One card each, open.
          */}
          {earlier.map((company, index) => (
            <Reveal key={company.company} delay={index * 60}>
              <Card
                id={railId(company.company)}
                interactive
                className="px-5 py-6 sm:px-7"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold">{company.company}</h3>
                  <span className="text-sm text-fg-2">{company.role}</span>
                  <span className="eyebrow ml-auto">{company.date}</span>
                </div>
                <p className="mt-3 max-w-[68ch] text-sm text-fg-2">
                  {company.summary}
                </p>
                <StackPills stack={company.stack} />
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
