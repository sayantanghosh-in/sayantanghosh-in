import {
  Card,
  CardBody,
  CardHeader,
  Pill,
  Section,
  SectionHeading,
} from "@/components/primitives";
import { Reveal } from "@/components/site/Reveal";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

/** How the agent is built, end to end. The visual proof of ownership. */
const agentStack = [
  {
    label: "Architecture",
    body: "A LangGraph state machine over LangChain tooling — multi-step tool use that is explicit, resumable and testable.",
  },
  {
    label: "Retrieval",
    body: "RAG over a SQL vector store, with grounding measured rather than assumed.",
  },
  {
    label: "Tool surface",
    body: "MCP servers built and integrated, and the tool catalogue re-architected around how the model reads it.",
  },
  {
    label: "Observability",
    body: "Every run traced in LangSmith, so regressions surface before customers meet them.",
  },
  {
    label: "Evaluation",
    body: "Golden conversations that gate every prompt, catalogue and model change.",
  },
  {
    label: "Inference",
    body: "Open-weight models self-hosted on Runpod, chosen per workload for cost and data control.",
  },
] as const;

const leadMetrics = [
  { value: "80%", label: "fewer tokens per request" },
  { value: "2–4 hrs/wk", label: "saved per engineer, across 20" },
] as const;

const leadHighlights = [
  "Shipped an AI agent product from ideation to GA — LangGraph orchestration, RAG over a SQL vector store, Slack as the interface. Paid adoption in month one.",
  "Built the evaluation harness before scaling the agent, covering tool selection, retrieval grounding and answer quality. Every prompt, catalogue and model change ships only when the eval run is green — which is what let the team swap models and reshape the tool surface without regressions.",
  "Cut tokens per request by 80% by re-architecting how the tool catalogue is exposed to the model, verified against the eval suite and LangSmith traces rather than by eyeballing outputs.",
] as const;

const leadDetail = [
  "Replaced JIRA company-wide with an in-house system and drove the migration — pilot team first, automated ticket import so nobody re-typed anything, a parallel run, then a hard cut-over. The native MCP server was the deciding lever: managing tickets from Claude Code was something JIRA could not offer, so the new tool became the path of least resistance rather than a mandate.",
  "Built that platform on React, FastAPI, PostgreSQL, Redis, Kafka and Elasticsearch — JQL-style search, real-time notifications, sprint planning and performance scoring.",
  "Own the Python/FastAPI/PostgreSQL services behind the AI features alongside the React front end, and review on both sides of the stack.",
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
    lead: "Synup's products had drifted into several versions of the same buttons and tables, and customers felt it as inconsistency. Standardising them was a consensus problem more than a coding one: I brought the frontend engineers across teams to one component contract rather than mandating it. Internal developers were the customers — adoption was the metric, not the release. Churn fell 15%.",
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

/* Proportional tenure, so five years at Synup outweighs 18 months at TCS visually. */
const SYNUP_MONTHS = 64;
const tenure = [
  { label: "Synup", months: SYNUP_MONTHS },
  ...earlier.map((c) => ({ label: c.company, months: c.months })),
];
const totalMonths = tenure.reduce((sum, t) => sum + t.months, 0);

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
        <SectionHeading
          eyebrow="Experience"
          title="Nine years, five companies"
        />
      </Reveal>

          {/* Proportional tenure bar */}
          <Reveal delay={80}>
            <div
              className="mt-8 flex h-2 w-full gap-px overflow-hidden rounded-full"
              role="img"
              aria-label="Tenure: Synup five years, Impact Analytics fourteen months, Tata Consultancy Services eighteen months, Senseforth AI twelve months, Compile three months"
            >
              {tenure.map((segment, index) => (
                <div
                  key={segment.label}
                  style={{ width: `${(segment.months / totalMonths) * 100}%` }}
                  className={
                    index === 0
                      ? "bg-accent"
                      : "bg-line-hi"
                  }
                />
              ))}
            </div>
            <p className="eyebrow mt-3">
              Synup — 5 yrs 4 mos · everything else — 4 yrs
            </p>
          </Reveal>

          <div className="mt-14 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
            {/* Career rail — the one scroll-linked effect */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="relative pl-5">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-line"
                  />
                  <span
                    aria-hidden
                    className="rail-progress absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-accent"
                  />
                  <ul className="space-y-6">
                    <li className="relative">
                      <span
                        aria-hidden
                        className="absolute -left-5 top-1.5 size-2 rounded-full bg-accent ring-4 ring-bg"
                      />
                      <p className="text-sm font-semibold">Synup</p>
                      <p className="eyebrow mt-0.5">2021 — now</p>
                    </li>
                    {earlier.map((company) => (
                      <li key={company.company} className="relative">
                        <span
                          aria-hidden
                          className="absolute -left-5 top-1.5 size-2 rounded-full bg-line-hi ring-4 ring-bg"
                        />
                        <p className="text-sm text-fg-2">{company.company}</p>
                        <p className="eyebrow mt-0.5">
                          {company.date.split("–")[0]?.trim()}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* ---------- Feature card: the current role ---------- */}
              <Reveal>
                <Card variant="feature">
                  <CardHeader>
                    <p className="eyebrow text-accent-ink">
                      Now · Jun 2026 – Present
                    </p>
                    <h3 className="display-md mt-2">Tech Lead — Synup</h3>
                  </CardHeader>

                  <CardBody>
                    <p className="max-w-[68ch] text-base text-fg-2">
                      I took Synup&rsquo;s AI agent from research question to
                      revenue, and I run the team that ships it — architecture
                      through to inference. I also built the internal platform
                      the engineering org now runs on.
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
                          <p className="numeral text-3xl text-fg">
                            {metric.value}
                          </p>
                          <p className="mt-1 text-sm text-fg-3">
                            {metric.label}
                          </p>
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

                    <details className="group mt-6">
                      <summary className="eyebrow cursor-pointer list-none text-accent-ink transition-colors duration-200 hover:text-fg">
                        <span className="group-open:hidden">
                          Full detail ↓
                        </span>
                        <span className="hidden group-open:inline">
                          Show less ↑
                        </span>
                      </summary>
                      <ul className="mt-5 space-y-4">
                        {leadDetail.map((item) => (
                          <li
                            key={item}
                            className="max-w-[68ch] border-l-2 border-line pl-4 text-sm text-fg-2"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </details>

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
                      <details className="group mt-4">
                        <summary className="eyebrow cursor-pointer list-none text-accent-ink transition-colors duration-200 hover:text-fg">
                          <span className="group-open:hidden">
                            Full detail ↓
                          </span>
                          <span className="hidden group-open:inline">
                            Show less ↑
                          </span>
                        </summary>
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
                      </details>
                    ) : null}

                    <StackPills stack={role.stack} />
                  </Card>
                </Reveal>
              ))}

              {/* ---------- Earlier companies, one row each ---------- */}
              <Reveal>
                <div className="card-surface scroll-settle divide-y divide-line overflow-hidden">
                  {earlier.map((company) => (
                    <details key={company.company} className="group">
                      <summary className="flex cursor-pointer list-none flex-wrap items-baseline gap-x-3 gap-y-1 px-5 py-4 transition-colors duration-200 hover:bg-bg-band sm:px-7">
                        <span className="font-semibold">{company.company}</span>
                        <span className="text-sm text-fg-2">
                          {company.role}
                        </span>
                        <span className="eyebrow ml-auto">{company.date}</span>
                      </summary>
                      <div className="px-5 pb-6 sm:px-7">
                        <p className="max-w-[68ch] text-sm text-fg-2">
                          {company.summary}
                        </p>
                        <StackPills stack={company.stack} />
                      </div>
                    </details>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
    </Section>
  );
}
