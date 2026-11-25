"use client";

import { useEffect, useMemo, useState } from "react";
import { IconCheck, IconChevronLeft, IconChevronRight, IconCircleHalf2, IconX } from "@tabler/icons-react";

import type { Block, BlockStatus, Category, Day } from "@/lib/planner";

/*
 * A Google Calendar style planner: a week view with a continuous hour grid
 * and events drawn as boxes, a month view, and a single-day view on phones.
 */

const START = 7; // first hour on the grid
const END = 19; // last hour on the grid
const HOUR = 48; // px per hour

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const toHours = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h + m / 60;
};
const fmtTime = (t: string, withSuffix = true) => {
  const [h, m] = t.split(":").map(Number);
  const base = `${h % 12 === 0 ? 12 : h % 12}${m ? `:${String(m).padStart(2, "0")}` : ""}`;
  return withSuffix ? `${base}${h < 12 ? "am" : "pm"}` : base;
};
const fmtRange = (b: Block) => {
  const sameHalf = toHours(b.start) < 12 === toHours(b.end) < 12;
  return `${fmtTime(b.start, !sameHalf)} – ${fmtTime(b.end)}`;
};
const hourLabel = (h: number) => `${h % 12 === 0 ? 12 : h % 12} ${h < 12 ? "AM" : "PM"}`;
const keyOf = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const mondayOf = (d: Date) => addDays(d, -((d.getDay() + 6) % 7));

const solid = (cat: Category) => ({ background: `var(--cat-${cat}-solid)` });

/** How a block looks once the daily check-in has marked it. */
const statusStyle = (cat: Category, status?: BlockStatus) => {
  if (status === "missed")
    return {
      background: `var(--cat-${cat}-soft)`,
      border: `1.5px dashed var(--cat-${cat})`,
      color: "var(--fg-2)",
    };
  if (status === "partial")
    return {
      backgroundColor: `var(--cat-${cat}-solid)`,
      backgroundImage:
        "repeating-linear-gradient(135deg, rgb(255 255 255 / 0.2) 0 5px, transparent 5px 11px)",
    };
  return solid(cat);
};

const STATUS_TEXT: Record<BlockStatus, string> = { done: "Done", partial: "Partly done", missed: "Missed" };

function StatusIcon({ status }: { status?: BlockStatus }) {
  if (!status) return null;
  const Icon = status === "done" ? IconCheck : status === "partial" ? IconCircleHalf2 : IconX;
  return <Icon size={12} stroke={3} aria-label={STATUS_TEXT[status]} className="mr-0.5 inline-block shrink-0 -translate-y-px" />;
}

/* ---------------------------------------------------------------- events */

function EventBox({ block }: { block: Block }) {
  const top = (toHours(block.start) - START) * HOUR;
  const height = Math.max((toHours(block.end) - toHours(block.start)) * HOUR - 2, 18);
  const short = height < 34;
  return (
    <div
      className={`absolute right-1.5 left-0.5 overflow-hidden rounded-[6px] px-1.5 py-1 transition-[filter] hover:brightness-110 ${
        block.status === "missed" ? "" : "text-white shadow-[0_1px_2px_rgb(0_0_0/0.18)] ring-1 ring-bg-elev"
      }`}
      style={{ top: top + 1, height, ...statusStyle(block.cat, block.status) }}
      title={`${block.title}${block.status ? ` (${STATUS_TEXT[block.status]})` : ""}\n${fmtRange(block)}${block.detail ? `\n${block.detail}` : ""}`}
    >
      {short ? (
        <p className={`truncate text-[11px] leading-4 ${block.status === "missed" ? "line-through" : ""}`}>
          <StatusIcon status={block.status} />
          <span className="font-semibold">{block.title}</span>
          <span className="opacity-85">, {fmtTime(block.start)}</span>
        </p>
      ) : (
        <>
          <p className={`truncate text-[11.5px] leading-4 font-semibold ${block.status === "missed" ? "line-through" : ""}`}>
            <StatusIcon status={block.status} />
            {block.title}
          </p>
          <p className="truncate text-[10.5px] leading-4 opacity-90">{fmtRange(block)}</p>
          {block.detail && height >= 62 ? (
            <p className="mt-0.5 line-clamp-2 text-[10.5px] leading-[1.3] opacity-90">{block.detail}</p>
          ) : null}
        </>
      )}
    </div>
  );
}

function NowLine({ now }: { now: Date }) {
  const h = now.getHours() + now.getMinutes() / 60;
  if (h < START || h > END) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 z-10" style={{ top: (h - START) * HOUR }}>
      <div className="absolute -top-[5px] -left-[5px] size-2.5 rounded-full" style={{ background: "var(--cat-exam)" }} />
      <div className="h-[2px]" style={{ background: "var(--cat-exam)" }} />
    </div>
  );
}

/* ---------------------------------------------------------- time grid */

function TimeGrid({
  dates,
  byDate,
  today,
  now,
}: {
  dates: Date[];
  byDate: Map<string, Block[]>;
  today: string | null;
  now: Date | null;
}) {
  const hours = Array.from({ length: END - START }, (_, i) => START + i);
  const cols = `3.5rem repeat(${dates.length}, minmax(0, 1fr))`;
  return (
    <div className="overflow-hidden rounded-[var(--radius)] border border-line bg-bg-elev">
      {/* Day headers */}
      <div className="grid border-b border-line" style={{ gridTemplateColumns: cols }}>
        <div className="flex items-end justify-end pr-2 pb-2 font-mono text-[9px] text-fg-3">IST</div>
        {dates.map((d) => {
          const key = keyOf(d);
          const isToday = key === today;
          return (
            <div key={key} className="border-l border-line px-1 pt-2.5 pb-2 text-center">
              <p className={`text-[11px] font-medium tracking-wide uppercase ${isToday ? "text-accent-ink" : "text-fg-3"}`}>
                {DAY_NAMES[(d.getDay() + 6) % 7]}
              </p>
              <p
                className={`mx-auto mt-1 grid size-10 place-items-center rounded-full text-[22px] leading-none tabular-nums ${
                  isToday ? "bg-accent font-semibold text-white" : "text-fg"
                }`}
              >
                {d.getDate()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Body */}
      <div className="grid" style={{ gridTemplateColumns: cols }}>
        <div className="relative" style={{ height: (END - START) * HOUR }}>
          {hours.slice(1).map((h) => (
            <span
              key={h}
              className="absolute right-2 -translate-y-1/2 text-[10px] whitespace-nowrap text-fg-3 tabular-nums"
              style={{ top: (h - START) * HOUR }}
            >
              {hourLabel(h)}
            </span>
          ))}
        </div>
        {dates.map((d) => {
          const key = keyOf(d);
          const blocks = byDate.get(key) ?? [];
          return (
            <div
              key={key}
              className="relative border-l border-line"
              style={{
                height: (END - START) * HOUR,
                backgroundImage: "linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
                backgroundSize: `100% ${HOUR}px`,
              }}
            >
              {blocks.map((block) => (
                <EventBox key={block.start + block.title} block={block} />
              ))}
              {key === today && now ? <NowLine now={now} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- month grid */

function MonthGrid({
  month,
  byDate,
  today,
  onPick,
}: {
  month: Date;
  byDate: Map<string, Block[]>;
  today: string | null;
  onPick: (d: Date) => void;
}) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const gridStart = mondayOf(first);
  const cells = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
  const rows = cells[35].getMonth() === month.getMonth() ? 6 : 5;

  return (
    <div className="overflow-hidden rounded-[var(--radius)] border border-line bg-bg-elev">
      <div className="grid grid-cols-7 border-b border-line">
        {DAY_NAMES.map((n) => (
          <p key={n} className="py-2 text-center text-[11px] font-medium tracking-wide text-fg-3 uppercase">
            {n}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.slice(0, rows * 7).map((d, i) => {
          const key = keyOf(d);
          const inMonth = d.getMonth() === month.getMonth();
          const isToday = key === today;
          const blocks = byDate.get(key) ?? [];
          return (
            <button
              key={key}
              type="button"
              onClick={() => onPick(d)}
              className={`flex min-h-[7.5rem] flex-col items-stretch justify-start border-line p-1 text-left transition-colors hover:bg-bg-band ${
                i % 7 ? "border-l" : ""
              } ${i >= 7 ? "border-t" : ""}`}
              aria-label={`${d.getDate()} ${MONTHS[d.getMonth()]}: ${blocks.length} items`}
            >
              <span
                className={`mx-auto mb-1 grid size-6 shrink-0 place-items-center rounded-full text-xs tabular-nums ${
                  isToday ? "bg-accent font-semibold text-white" : inMonth ? "text-fg" : "text-fg-3/60"
                }`}
              >
                {d.getDate()}
              </span>
              <span className="block space-y-0.5">
                {blocks.slice(0, 3).map((block) => (
                  <span
                    key={block.start + block.title}
                    className={`block truncate rounded px-1 py-px text-[10.5px] leading-4 ${
                      block.status === "missed" ? "line-through" : "text-white"
                    } ${inMonth ? "" : "opacity-60"}`}
                    style={statusStyle(block.cat, block.status)}
                  >
                    <StatusIcon status={block.status} />
                    <span className="opacity-85">{fmtTime(block.start)}</span> {block.title}
                  </span>
                ))}
                {blocks.length > 3 ? (
                  <span className="block px-1 text-[10.5px] font-medium text-fg-2">{blocks.length - 3} more</span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- the planner */

export function WeekTimetable({ days, legend }: { days: Day[]; legend: Record<Category, string> }) {
  const byDate = useMemo(() => new Map(days.map((d) => [d.date, d.blocks])), [days]);
  const firstDay = parse(days[0].date);
  const lastDay = parse(days[days.length - 1].date);
  const firstWeek = mondayOf(firstDay);
  const lastWeek = mondayOf(lastDay);
  const firstMonth = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1);
  const lastMonth = new Date(lastDay.getFullYear(), lastDay.getMonth(), 1);

  const [view, setView] = useState<"week" | "month">("week");
  const [anchor, setAnchor] = useState<Date>(firstDay);
  const [now, setNow] = useState<Date | null>(null);

  // The clock only exists in the browser: jump to today and keep the red line moving.
  useEffect(() => {
    const tick = () => setNow(new Date());
    const n = new Date();
    /* eslint-disable react-hooks/set-state-in-effect -- syncing to the clock */
    tick();
    if (n >= firstDay && n <= addDays(lastDay, 1)) setAnchor(new Date(n.getFullYear(), n.getMonth(), n.getDate()));
    /* eslint-enable react-hooks/set-state-in-effect */
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  const today = now ? keyOf(now) : null;
  const monday = mondayOf(anchor);
  const week = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  const month = new Date(anchor.getFullYear(), anchor.getMonth(), 1);

  const canPrev = view === "week" ? monday > firstWeek : month > firstMonth;
  const canNext = view === "week" ? monday < lastWeek : month < lastMonth;

  const step = (dir: 1 | -1) => {
    if (view === "week") setAnchor(addDays(monday, 7 * dir));
    else setAnchor(new Date(month.getFullYear(), month.getMonth() + dir, 1));
  };
  const stepDay = (dir: 1 | -1) => {
    const next = addDays(anchor, dir);
    if (next >= firstDay && next <= lastDay) setAnchor(next);
  };
  const goToday = () => {
    if (now && now >= firstDay && now <= addDays(lastDay, 1)) setAnchor(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    else setAnchor(firstDay);
  };

  const title =
    view === "month"
      ? `${MONTHS[month.getMonth()]} ${month.getFullYear()}`
      : week[0].getMonth() === week[6].getMonth()
        ? `${MONTHS[week[0].getMonth()]} ${week[0].getFullYear()}`
        : `${MONTHS[week[0].getMonth()].slice(0, 3)} – ${MONTHS[week[6].getMonth()].slice(0, 3)} ${week[6].getFullYear()}`;

  const weekHours = week.reduce(
    (sum, d) =>
      sum +
      (byDate.get(keyOf(d)) ?? [])
        .filter((x) => x.cat !== "rest")
        .reduce((s, x) => s + toHours(x.end) - toHours(x.start), 0),
    0,
  );

  const iconBtn =
    "grid size-9 place-items-center rounded-full text-fg-2 transition-colors hover:bg-bg-band hover:text-fg disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
        <button
          type="button"
          onClick={goToday}
          className="h-9 rounded-full border border-line-hi px-4 text-sm font-medium transition-colors hover:bg-bg-band"
        >
          Today
        </button>
        <div className="flex items-center">
          <button type="button" className={iconBtn} onClick={() => step(-1)} disabled={!canPrev} aria-label={`Previous ${view}`}>
            <IconChevronLeft size={18} />
          </button>
          <button type="button" className={iconBtn} onClick={() => step(1)} disabled={!canNext} aria-label={`Next ${view}`}>
            <IconChevronRight size={18} />
          </button>
        </div>
        <h3 className="text-xl font-medium tracking-tight" aria-live="polite">
          {title}
        </h3>
        <div className="ml-auto flex items-center gap-3">
          {view === "week" ? (
            <span className="hidden font-mono text-[11px] text-fg-3 sm:inline">{weekHours.toFixed(1).replace(/\.0$/, "")} h this week</span>
          ) : null}
          <div className="flex rounded-full border border-line-hi p-0.5" role="tablist" aria-label="Calendar view">
            {(["week", "month"] as const).map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={`h-8 rounded-full px-3.5 text-sm capitalize transition-colors ${
                  view === v ? "bg-accent-soft font-medium text-accent-ink" : "text-fg-2 hover:text-fg"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2" aria-label="Legend">
        {(Object.keys(legend) as Category[]).map((cat) => (
          <li key={cat} className="flex items-center gap-1.5 text-xs text-fg-2">
            <span aria-hidden className="size-3 rounded-[3px]" style={solid(cat)} />
            {legend[cat]}
          </li>
        ))}
        <li aria-hidden className="mx-1 hidden h-4 w-px bg-line sm:block" />
        {(["done", "partial", "missed"] as const).map((st) => (
          <li key={st} className="flex items-center gap-1.5 text-xs text-fg-2">
            <span
              aria-hidden
              className={`grid h-3.5 w-5 place-items-center rounded-[3px] ${st === "missed" ? "text-fg-2" : "text-white"}`}
              style={statusStyle("rest", st)}
            >
              <StatusIcon status={st} />
            </span>
            {STATUS_TEXT[st]}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        {view === "week" ? (
          <>
            <div className="hidden md:block">
              <TimeGrid dates={week} byDate={byDate} today={today} now={now} />
            </div>
            {/* Phones get a single day, like the calendar app does */}
            <div className="md:hidden">
              <div className="mb-3 grid grid-cols-7 gap-1">
                {week.map((d) => {
                  const key = keyOf(d);
                  const sel = key === keyOf(anchor);
                  const has = byDate.has(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => has && setAnchor(d)}
                      disabled={!has}
                      aria-pressed={sel}
                      className="flex flex-col items-center gap-1 py-1 disabled:opacity-35"
                    >
                      <span className="text-[10px] text-fg-3 uppercase">{DAY_NAMES[(d.getDay() + 6) % 7].slice(0, 1)}</span>
                      <span
                        className={`grid size-8 place-items-center rounded-full text-sm tabular-nums ${
                          sel ? "bg-accent font-semibold text-white" : key === today ? "text-accent-ink" : ""
                        }`}
                      >
                        {d.getDate()}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mb-2 flex items-center justify-between">
                <button type="button" className={iconBtn} onClick={() => stepDay(-1)} aria-label="Previous day">
                  <IconChevronLeft size={18} />
                </button>
                <p className="text-sm font-medium">
                  {DAY_NAMES[(anchor.getDay() + 6) % 7]} {anchor.getDate()} {MONTHS[anchor.getMonth()].slice(0, 3)}
                </p>
                <button type="button" className={iconBtn} onClick={() => stepDay(1)} aria-label="Next day">
                  <IconChevronRight size={18} />
                </button>
              </div>
              <TimeGrid dates={[anchor]} byDate={byDate} today={today} now={now} />
            </div>
          </>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <MonthGrid
                month={month}
                byDate={byDate}
                today={today}
                onPick={(d) => {
                  if (d >= firstDay && d <= lastDay) setAnchor(d);
                  setView("week");
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
