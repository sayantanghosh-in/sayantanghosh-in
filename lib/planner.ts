/**
 * The /now planner. Everything on that page comes from this file, so a daily
 * update is an edit here and nothing else. Dates are ISO (YYYY-MM-DD), times
 * are 24-hour "HH:MM".
 */

export type Status = "done" | "active" | "next" | "queued" | "blocked";
export type Category = "course" | "dsa" | "build" | "review" | "exam" | "rest";

export const PLANNER_UPDATED = "2026-11-25";

export const CATEGORY_LABEL: Record<Category, string> = {
  course: "IIT course",
  dsa: "DSA",
  build: "Python / Next.js / projects",
  review: "Review and profile sync",
  exam: "Quiz or exam",
  rest: "Rest",
};

/** Ordered. The order is the decision. */
export const PRIORITIES: readonly {
  rank: number;
  title: string;
  detail: string;
  status: Status;
}[] = [
  {
    rank: 1,
    title: "IIT Kharagpur AI-Native Software Engineering",
    detail:
      "Every recording in order at 2×. Course 2 done by 29 Nov, graded quiz on 5 Dec, Proctored Exam 1 on 19 Dec.",
    status: "active",
  },
  {
    rank: 2,
    title: "DSA: second revision, done by December",
    detail:
      "All 109 lessons up to Two Pointers & Sliding Window, an hour a day from 28 Nov and two a day after the exam. Trees from 4 Jan.",
    status: "active",
  },
  {
    rank: 3,
    title: "Backend depth: Python, FastAPI, PostgreSQL",
    detail: "Setup from 21 Dec, properly from 4 Jan. PostgreSQL first among databases.",
    status: "next",
  },
  {
    rank: 4,
    title: "Next.js, in parallel",
    detail: "From 4 Jan, alternating mornings with the backend track.",
    status: "next",
  },
  {
    rank: 5,
    title: "Java and Spring Boot",
    detail: "From 3 May 2027, once the Python stack is comfortable. Coder Army's courses.",
    status: "queued",
  },
];

/** Secondary threads: real, but they never displace the priorities above. */
export const SIDE_THREADS: readonly { title: string; detail: string }[] = [
  {
    title: "Profiles and CV in sync",
    detail:
      "About two hours a week keeping the résumé, this site, LinkedIn, GitHub and X consistent with what actually shipped.",
  },
  {
    title: "Content as a way to learn",
    detail:
      "YouTube, Instagram and Facebook come from what I am already learning and building. Good to have, never the goal.",
  },
];

/* --------------------------------------------------------------------------
 * Day-by-day timetable. Slots: weekdays 07:30–10:00 and 14:00–15:00 (office,
 * watching only), Saturday 07:30–11:30 and 17:00–18:00, Sunday 07:30–10:30.
 * Course recordings are ~4 h each, watched at 2× (~2 h).
 * ------------------------------------------------------------------------ */

export type BlockStatus = "done" | "partial" | "missed";

export type Block = {
  start: string;
  end: string;
  cat: Category;
  title: string;
  detail?: string;
  /** Filled in from PROGRESS below; absent means still planned. */
  status?: BlockStatus;
};
export type Day = { date: string; blocks: Block[] };

/*
 * Daily progress. Key is "YYYY-MM-DD HH:MM" (the block's date and start).
 * The daily check-in adds lines here; the calendar colours itself from them.
 *   done     solid, with a tick
 *   partial  striped, with a half circle
 *   missed   dashed outline, struck through
 */
export const PROGRESS: Record<string, BlockStatus> = {};

const b = (start: string, end: string, cat: Category, title: string, detail?: string): Block =>
  detail ? { start, end, cat, title, detail } : { start, end, cat, title };

const dsa = (detail: string, end = "08:30") => b("07:30", end, "dsa", "DSA revision", detail);
const office = (title: string, detail?: string) => b("14:00", "15:00", "course", title, detail);

const PLAN: Day[] = [
  // Week of 23 Nov: Course 1 tail and Course 2
  { date: "2026-11-25", blocks: [b("07:30", "08:00", "course", "S4 finish", "PostgreSQL, ORM, OAuth"), b("08:00", "10:00", "course", "S5", "Real-time streaming, WebSockets"), office("S6 · first half", "CI/CD, Vercel")] },
  { date: "2026-11-26", blocks: [b("07:30", "08:30", "course", "S6 · second half"), b("08:30", "10:00", "course", "S7", "Portal integration, architecture"), office("S7 finish → S8", "FastAPI, Pydantic")] },
  { date: "2026-11-27", blocks: [b("07:30", "09:00", "course", "S8 finish"), b("09:00", "10:00", "course", "S9", "LLM SDKs, structured outputs"), office("S9 finish")] },
  { date: "2026-11-28", blocks: [dsa("Intro + Warm Up 1–6"), b("08:30", "10:30", "course", "S10", "Resilience, circuit breakers, Docker"), b("10:30", "11:30", "course", "S11 · first half", "Multimodal, OCR, cost"), b("17:00", "18:00", "course", "S11 · second half")] },
  { date: "2026-11-29", blocks: [dsa("Warm Up 7–11 + Time/Space"), b("08:30", "10:30", "course", "S12", "Data sensitivity, DPDP. Course 2 done")] },
  // Week of 30 Nov: Course 3, quiz
  { date: "2026-11-30", blocks: [dsa("Arrays: LC 26, 27, 344, 121"), b("08:30", "10:00", "course", "S13", "Embeddings, retrieval strategy"), office("S13 finish → S14")] },
  { date: "2026-12-01", blocks: [dsa("Arrays: LC 88, 283, 485, 268, 136"), b("08:30", "10:00", "course", "S14", "No-framework RAG, chunking"), office("S15", "Framework RAG, vector storage")] },
  { date: "2026-12-02", blocks: [dsa("Recursion: all 6"), b("08:30", "09:30", "course", "S15 finish"), b("09:30", "10:00", "course", "S16", "Context engineering, GraphRAG"), office("S16")] },
  { date: "2026-12-03", blocks: [dsa("Sorting: linear, binary, bubble, selection"), b("08:30", "09:00", "course", "S16 finish"), b("09:00", "10:00", "course", "Course 2 revision", "S8–S10 notes"), office("Course 2 revision", "S11–S12 notes")] },
  { date: "2026-12-04", blocks: [dsa("Sorting: insertion, merge sort"), b("08:30", "10:00", "course", "Course 2 practice questions"), office("Course 1 revision", "S1–S2")] },
  { date: "2026-12-05", blocks: [dsa("Linked List: intro, design, add, delete"), b("08:30", "09:00", "course", "Course 2 quick notes"), b("09:00", "09:30", "exam", "Assessment 2 quiz", "Deadline 11:59 PM"), b("09:30", "11:30", "course", "Course 1 revision", "S3–S5"), b("17:00", "18:00", "review", "Weekly review")] },
  { date: "2026-12-06", blocks: [dsa("Linked List: middle, reverse, cycle ×2"), b("08:30", "10:30", "course", "S17", "Multilingual retrieval, Langfuse")] },
  // Week of 7 Dec: revision
  { date: "2026-12-07", blocks: [dsa("Linked List: palindrome, intersection, remove elements"), b("08:30", "10:00", "course", "Course 1 revision", "S6–S7"), office("Course 1 practice questions")] },
  { date: "2026-12-08", blocks: [dsa("Linked List: remove Nth ×2, remove duplicates"), b("08:30", "10:00", "course", "Course 3 revision", "S13–S14"), office("S15 notes")] },
  { date: "2026-12-09", blocks: [dsa("Linked List: odd-even, add two numbers, merge two"), b("08:30", "10:00", "course", "Course 3 revision", "S15–S16"), office("S17 notes")] },
  { date: "2026-12-10", blocks: [dsa("Linked List: rotate, swap pairs ×2"), b("08:30", "10:00", "course", "Course 1 practice questions"), office("Weak topics")] },
  { date: "2026-12-11", blocks: [dsa("Strings: last word ×2, find words, jewels, vowels"), b("08:30", "10:00", "course", "Course 2 practice questions"), office("Weak topics")] },
  { date: "2026-12-12", blocks: [dsa("Strings: balanced split, reverse II, palindrome ×2, odd number"), b("08:30", "11:30", "course", "Course 3 practice + one-pagers", "S18 airs live 10:00–14:00"), b("17:00", "18:00", "review", "Weekly review")] },
  { date: "2026-12-13", blocks: [dsa("Strings: LCP, anagram, isomorphic, group anagrams ×2"), b("08:30", "10:30", "course", "S18", "RAGAS, LLM-as-judge, CI gates. All recordings done")] },
  // Exam week
  { date: "2026-12-14", blocks: [dsa("Stack: intro, playing, stack via queues ×2"), b("08:30", "10:00", "course", "S18 notes + Course 3 one-pager"), office("Weak topics")] },
  { date: "2026-12-15", blocks: [dsa("Stack: queue via stacks, parentheses, min stack"), b("08:30", "10:00", "course", "Courses 1–2 one-pagers"), office("Weak topics")] },
  { date: "2026-12-16", blocks: [dsa("Stack: outermost parens ×2, RPN"), b("08:30", "10:00", "exam", "Timed mock test"), office("Review mock mistakes")] },
  { date: "2026-12-17", blocks: [dsa("Stack: NGE, daily temperatures, NGE II"), b("08:30", "10:00", "course", "Weak topics + mock mistakes"), office("Light review")] },
  { date: "2026-12-18", blocks: [b("08:30", "10:00", "course", "One-pagers only", "Sleep early"), office("Nothing new")] },
  { date: "2026-12-19", blocks: [b("09:00", "11:30", "exam", "Proctored Exam 1", "Confirm the time on upGrad")] },
  { date: "2026-12-20", blocks: [b("07:30", "10:30", "rest", "Rest")] },
  // DSA sprint + ship swale
  { date: "2026-12-21", blocks: [dsa("Rotting oranges, sqrt(x), middle element, guess number", "09:30"), b("09:30", "10:00", "build", "Python setup", "uv, ruff, pytest"), b("14:00", "15:00", "build", "Python video course")] },
  { date: "2026-12-22", blocks: [dsa("Search rotated, first bad version, find peak", "09:30"), b("09:30", "10:00", "build", "Python setup", "FastAPI hello-world"), b("14:00", "15:00", "build", "Python video course")] },
  { date: "2026-12-23", blocks: [dsa("Min in rotated, first & last position ×2", "09:30"), b("09:30", "10:00", "build", "Python setup", "Postgres in Docker"), b("14:00", "15:00", "build", "Python video course")] },
  { date: "2026-12-24", blocks: [dsa("Mountain peak, single element, K closest", "09:30"), b("09:30", "10:00", "build", "Python setup", "SQLAlchemy first look"), b("14:00", "15:00", "build", "Python video course")] },
  { date: "2026-12-25", blocks: [dsa("Two Sum ×2, is subsequence, first occurrence", "09:30")] },
  { date: "2026-12-26", blocks: [dsa("KMP, intersection (two pointers), container", "09:30"), b("09:30", "11:30", "build", "Ship swale v1.0", "Final fixes, npm publish, push"), b("17:00", "18:00", "review", "Weekly review")] },
  { date: "2026-12-27", blocks: [dsa("3Sum, trapping rain water", "09:00"), b("09:00", "10:30", "review", "swale launch post + profile sync")] },
  { date: "2026-12-28", blocks: [dsa("Longest substring, longest repeating replacement", "09:30"), b("09:30", "10:00", "build", "Python practice"), b("14:00", "15:00", "build", "Python video course")] },
  { date: "2026-12-29", blocks: [dsa("Permutation in string, sliding window max. Revision done", "09:30"), b("09:30", "10:00", "build", "Python practice"), b("14:00", "15:00", "build", "Python video course")] },
  { date: "2026-12-30", blocks: [dsa("Buffer: redo flagged problems", "09:30"), b("09:30", "10:00", "build", "Next.js setup"), b("14:00", "15:00", "build", "Next.js video course")] },
  { date: "2026-12-31", blocks: [dsa("Buffer: redo flagged problems", "09:00")] },
  { date: "2027-01-01", blocks: [b("07:30", "10:00", "rest", "Rest")] },
  { date: "2027-01-02", blocks: [b("07:30", "09:30", "build", "Python", "Typing, async, packaging"), b("09:30", "11:30", "build", "Next.js", "App Router, server components"), b("17:00", "18:00", "review", "Weekly review + plan January")] },
  { date: "2027-01-03", blocks: [b("07:30", "08:30", "review", "Profile and CV sync"), b("08:30", "10:30", "build", "Python", "FastAPI first app")] },
];

export const TIMETABLE: Day[] = PLAN.map((day) => ({
  ...day,
  blocks: day.blocks.map((block) => {
    const status = PROGRESS[`${day.date} ${block.start}`];
    return status ? { ...block, status } : block;
  }),
}));

/* --------------------------------------------------------------------------
 * Long-range timeline (Gantt). One row per track.
 * ------------------------------------------------------------------------ */

export const TIMELINE_RANGE = { from: "2026-11-01", to: "2027-07-31" };

export const TIMELINE: readonly {
  track: string;
  cat: Category;
  bars: readonly { from: string; to: string; label: string }[];
  marks?: readonly { date: string; label: string }[];
}[] = [
  {
    track: "IIT course",
    cat: "course",
    bars: [
      { from: "2026-11-25", to: "2026-12-19", label: "Course" },
      { from: "2027-01-02", to: "2027-03-20", label: "Modules 4–5" },
      { from: "2027-04-03", to: "2027-04-17", label: "Capstone" },
    ],
    marks: [
      { date: "2026-12-05", label: "Quiz" },
      { date: "2026-12-19", label: "Exam 1" },
      { date: "2027-03-27", label: "Exam 2" },
    ],
  },
  {
    track: "DSA",
    cat: "dsa",
    bars: [
      { from: "2026-11-28", to: "2026-12-31", label: "Revision ×2" },
      { from: "2027-01-04", to: "2027-07-31", label: "Trees onward" },
    ],
  },
  {
    track: "Python, FastAPI, Postgres",
    cat: "build",
    bars: [
      { from: "2026-12-21", to: "2027-02-07", label: "Foundations" },
      { from: "2027-02-08", to: "2027-04-17", label: "Project A" },
    ],
  },
  {
    track: "Next.js",
    cat: "build",
    bars: [
      { from: "2027-01-04", to: "2027-02-07", label: "Foundations" },
      { from: "2027-02-08", to: "2027-04-17", label: "Project B" },
    ],
  },
  {
    track: "swale",
    cat: "build",
    bars: [{ from: "2026-12-26", to: "2026-12-27", label: "Ship v1.0" }],
  },
  {
    track: "Java, Spring Boot",
    cat: "build",
    bars: [
      { from: "2027-05-03", to: "2027-06-06", label: "Coder Army" },
      { from: "2027-06-07", to: "2027-07-31", label: "Spring + Project C" },
    ],
  },
];

/* --------------------------------------------------------------------------
 * Weekly routine per stage, for after the day-by-day timetable runs out.
 * ------------------------------------------------------------------------ */

export const STAGES: readonly {
  name: string;
  from: string;
  to?: string;
  status: Status;
  slots: readonly { when: string; what: string; cat: Category }[];
  notes?: readonly string[];
}[] = [
  {
    name: "Foundations",
    from: "2027-01-04",
    to: "2027-02-07",
    status: "next",
    slots: [
      { when: "Mon–Fri 07:30–08:30", what: "DSA: Trees onward", cat: "dsa" },
      { when: "Mon, Wed 08:30–10:00", what: "Python, FastAPI, PostgreSQL", cat: "build" },
      { when: "Tue, Thu 08:30–10:00", what: "Next.js", cat: "build" },
      { when: "Fri 08:30–10:00", what: "Course lab or assignment", cat: "course" },
      { when: "Office Mon–Tue", what: "Last Saturday's recording at 2×", cat: "course" },
      { when: "Office Wed–Fri", what: "Python or Next.js video course", cat: "build" },
      { when: "Sat 07:30–08:30", what: "DSA", cat: "dsa" },
      { when: "Sat 08:30–11:30", what: "Course assignment, then building", cat: "build" },
      { when: "Sat 17:00–18:00", what: "Weekly review and profile sync", cat: "review" },
      { when: "Sun 07:30–10:30", what: "DSA 1 h, building 1 h, profile and CV sync 1 h", cat: "build" },
    ],
    notes: [
      "Week of 4 Jan: Python typing, async, packaging · Next.js App Router, server components.",
      "Week of 11 Jan: FastAPI routing, dependencies, Pydantic · data fetching, caching.",
      "Week of 18 Jan: PostgreSQL, indexes, EXPLAIN · server actions, forms.",
      "Week of 25 Jan: SQLAlchemy, Alembic, transactions · auth.",
      "Week of 1 Feb: testing, Docker, background jobs · testing. Scope both projects.",
    ],
  },
  {
    name: "Two projects in tandem",
    from: "2027-02-08",
    to: "2027-04-17",
    status: "queued",
    slots: [
      { when: "Mon, Wed 08:30–10:00 + Sat", what: "Project A: FastAPI + React + Postgres, agentic AI, Kafka and Elasticsearch locally", cat: "build" },
      { when: "Tue, Thu 08:30–10:00 + Sun", what: "Project B: Next.js developer tool with AI features", cat: "build" },
      { when: "Everything else", what: "Same as Foundations", cat: "review" },
    ],
    notes: [
      "15–26 Mar: projects pause for revision. Exam 2 on Sat 27 Mar.",
      "Capstone on 3, 10 and 17 Apr. Project A becomes the capstone if allowed.",
    ],
  },
  {
    name: "Java and Spring Boot",
    from: "2027-05-03",
    status: "queued",
    slots: [
      { when: "Office + Fri 08:30–10:00 + Sat", what: "Coder Army: Java, then Spring Boot", cat: "build" },
      { when: "From 7 Jun", what: "Project C: Spring Boot CRUD app with AI features", cat: "build" },
      { when: "Mon–Fri 07:30–08:30", what: "DSA continues", cat: "dsa" },
    ],
    notes: ["18 Apr – 2 May is a lighter fortnight: polish and write up both projects."],
  },
];

export type Track = {
  name: string;
  status: Status;
  /** 0-100, or null when there is nothing meaningful to measure yet. */
  progress: number | null;
  progressLabel: string;
  now: string;
};

export const TRACKS: readonly Track[] = [
  {
    name: "IIT course",
    status: "active",
    progress: 20,
    progressLabel: "Programme 20% · Course 1 graded ✓ · Course 2 graded pending",
    now: "S4 onward, every recording in order at 2×.",
  },
  {
    name: "DSA revision",
    status: "next",
    progress: 0,
    progressLabel: "Revised 0 of 109 · course at 111 of 280",
    now: "Starts Sat 28 Nov, 1 h a day; 2 h a day from 21 Dec.",
  },
  {
    name: "Python, FastAPI, PostgreSQL",
    status: "next",
    progress: null,
    progressLabel: "Setup from 21 Dec · properly from 4 Jan",
    now: "Not started.",
  },
  {
    name: "Next.js",
    status: "next",
    progress: null,
    progressLabel: "From 4 Jan",
    now: "Not started.",
  },
];

/** The week, in hours. Office time is for watching only. */
export const WEEK: readonly { slot: string; time: string; hours: number }[] = [
  { slot: "Weekday mornings", time: "07:30–10:00", hours: 12.5 },
  { slot: "Office, weekdays", time: "14:00–15:00", hours: 5 },
  { slot: "Saturday", time: "07:30–11:30 · 17:00–18:00", hours: 5 },
  { slot: "Sunday", time: "07:30–10:30", hours: 3 },
];

export const PROJECTS: readonly {
  name: string;
  status: Status;
  when: string;
  detail: string;
}[] = [
  { name: "swale v1.0", status: "next", when: "26–27 Dec", detail: "Finish, publish and share. Stays a CLI." },
  { name: "Project A (Python)", status: "queued", when: "From 8 Feb", detail: "Heavy agentic AI on FastAPI and React, with Postgres, Kafka and Elasticsearch running locally." },
  { name: "Project B (Next.js)", status: "queued", when: "From 8 Feb", detail: "Full CRUD developer tool with AI features." },
  { name: "Project C (Spring Boot)", status: "queued", when: "From 7 Jun", detail: "Full CRUD service with AI features." },
];

/** Newest first. One entry per day an update is given. */
export const LOG: readonly { date: string; text: string }[] = [
  {
    date: "2026-11-25",
    text: "Set priorities and a day-by-day timetable to Exam 1. Course recordings at 2×, DSA second revision from 28 Nov, done by the end of December.",
  },
];
