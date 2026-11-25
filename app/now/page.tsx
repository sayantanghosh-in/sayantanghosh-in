import type { Metadata } from "next";
import { format, parseISO } from "date-fns";

import { Timeline } from "@/components/planner/Timeline";
import { WeekTimetable } from "@/components/planner/WeekTimetable";
import { Card, Pill, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/site/Reveal";
import {
  CATEGORY_LABEL,
  LOG,
  PLANNER_UPDATED,
  PRIORITIES,
  PROJECTS,
  SIDE_THREADS,
  STAGES,
  TIMELINE,
  TIMELINE_RANGE,
  TIMETABLE,
  TRACKS,
  WEEK,
  type Status,
} from "@/lib/planner";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Sayantan Ghosh is learning and building right now: priorities, a day-by-day timetable, the long-range timeline and a running log.",
  alternates: { canonical: "/now" },
};

const STATUS_LABEL: Record<Status, string> = {
  done: "Done",
  active: "In progress",
  next: "Next",
  queued: "Queued",
  blocked: "Blocked",
};

function StatusPill({ status }: { status: Status }) {
  return (
    <span className="shrink-0 whitespace-nowrap">
      <Pill as="span" tone={status === "active" ? "accent" : "default"}>
        {STATUS_LABEL[status]}
      </Pill>
    </span>
  );
}

const range = (from: string, to?: string) =>
  `${format(parseISO(from), "d MMM yyyy")}${to ? ` – ${format(parseISO(to), "d MMM yyyy")}` : " onward"}`;

export default function NowPage() {
  const totalHours = WEEK.reduce((sum, slot) => sum + slot.hours, 0);

  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow">Now</p>
            <h1 className="display-lg mt-3">What I am working on</h1>
            <p className="mt-4 max-w-[54ch] text-base text-fg-2">
              A public planner with a real timetable. It changes as I learn, so treat it as a
              snapshot, not a promise.
            </p>
            <p className="eyebrow mt-5 text-fg-3">
              Updated {format(parseISO(PLANNER_UPDATED), "d MMMM yyyy")}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {SIDE_THREADS.map((thread) => (
                <div key={thread.title} className="border-l-2 border-line pl-4">
                  <p className="eyebrow text-fg-3">Alongside</p>
                  <h2 className="mt-2 text-sm font-medium">{thread.title}</h2>
                  <p className="mt-1 text-sm text-fg-2">{thread.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-fg-3">Priorities, in order</p>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {PRIORITIES.map((item) => (
                <li key={item.rank} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-3 py-4">
                  <span className="pt-0.5 font-mono text-xs text-accent-ink tabular-nums">
                    {String(item.rank).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-sm font-semibold">{item.title}</h2>
                      <StatusPill status={item.status} />
                    </div>
                    <p className="mt-1 text-sm text-fg-2">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="band" id="timetable">
        <SectionHeading
          eyebrow="Day by day"
          title="Timetable"
          lede="Every block has a start and an end. Office hour is for watching only. Course recordings are about four hours each, watched at 2×."
        />
        <WeekTimetable days={TIMETABLE} legend={CATEGORY_LABEL} />
      </Section>

      <Section id="timeline">
        <SectionHeading
          eyebrow="Months ahead"
          title="Timeline"
          lede="Each track on one calendar, with quizzes and exams marked."
        />
        <Timeline rows={TIMELINE} range={TIMELINE_RANGE} />
      </Section>

      <Section tone="band" id="routine">
        <SectionHeading
          eyebrow="From January"
          title="Weekly routine by stage"
          lede="Once the day-by-day timetable runs out, each stage repeats the same week."
        />
        <ol className="space-y-5">
          {STAGES.map((stage, index) => (
            <Reveal key={stage.name} delay={index * 40} as="li">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{stage.name}</h3>
                    <p className="eyebrow mt-1 text-fg-3">{range(stage.from, stage.to)}</p>
                  </div>
                  <StatusPill status={stage.status} />
                </div>
                <dl className="mt-5 grid gap-x-8 border-t border-line sm:grid-cols-2">
                  {stage.slots.map((slot) => (
                    <div key={slot.when} className="flex gap-3 border-b border-line py-3">
                      <span
                        aria-hidden
                        className="mt-1.5 size-2 shrink-0 rounded-sm"
                        style={{ background: `var(--cat-${slot.cat})` }}
                      />
                      <div>
                        <dt className="font-mono text-[11px] text-fg-3">{slot.when}</dt>
                        <dd className="mt-0.5 text-sm text-fg-2">{slot.what}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                {stage.notes ? (
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-fg-2 marker:text-fg-3">
                    {stage.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="tracks">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow">Tracks</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Where each thing stands</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {TRACKS.map((track) => (
                <li key={track.name} className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium">{track.name}</h3>
                    <StatusPill status={track.status} />
                  </div>
                  {track.progress !== null ? (
                    <div
                      role="progressbar"
                      aria-valuenow={track.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={track.name}
                      className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg-band"
                    >
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${Math.max(track.progress, 1.5)}%` }}
                      />
                    </div>
                  ) : null}
                  <p className="mt-2 font-mono text-[11px] text-fg-3">{track.progressLabel}</p>
                  <p className="mt-2 text-sm text-fg-2">{track.now}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">{totalHours} hours a week</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">The budget</h2>
            <table className="mt-6 w-full text-left text-sm">
              <caption className="sr-only">Weekly time budget</caption>
              <tbody className="divide-y divide-line border-y border-line">
                {WEEK.map((slot) => (
                  <tr key={slot.slot}>
                    <th scope="row" className="py-3 pr-4 font-medium">
                      {slot.slot}
                      <span className="mt-0.5 block font-mono text-[11px] font-normal text-fg-3">
                        {slot.time}
                      </span>
                    </th>
                    <td className="py-3 text-right text-fg-2 tabular-nums">{slot.hours} h</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="eyebrow mt-12">Projects</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {PROJECTS.map((project) => (
                <li key={project.name} className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium">{project.name}</p>
                    <span className="font-mono text-[11px] whitespace-nowrap text-fg-3">
                      {project.when}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-fg-2">{project.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="band" id="log" bordered={false}>
        <SectionHeading
          eyebrow="Log"
          title="Day by day notes"
          lede="What actually happened, newest first."
        />
        <ol className="divide-y divide-line border-y border-line">
          {LOG.map((entry) => (
            <li
              key={entry.date + entry.text}
              className="grid gap-2 py-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
            >
              <time dateTime={entry.date} className="font-mono text-xs text-fg-3">
                {format(parseISO(entry.date), "d MMM yyyy")}
              </time>
              <p className="max-w-[64ch] text-sm text-fg-2">{entry.text}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
