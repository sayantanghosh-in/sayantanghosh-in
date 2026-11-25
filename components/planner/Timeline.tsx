"use client";

import { useEffect, useRef, useState } from "react";

import type { Category } from "@/lib/planner";

type Row = {
  track: string;
  cat: Category;
  bars: readonly { from: string; to: string; label: string }[];
  marks?: readonly { date: string; label: string }[];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY = 86_400_000;
const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};
const fmt = (iso: string) => {
  const t = new Date(parse(iso));
  return `${t.getUTCDate()} ${MONTHS[t.getUTCMonth()]}`;
};

/** A Gantt chart: months across the top, one row per track. */
export function Timeline({ rows, range }: { rows: readonly Row[]; range: { from: string; to: string } }) {
  const start = parse(range.from);
  const end = parse(range.to) + DAY;
  const pct = (t: number) => ((t - start) / (end - start)) * 100;

  const months: { label: string; left: number; width: number }[] = [];
  const s = new Date(start);
  for (let y = s.getUTCFullYear(), m = s.getUTCMonth(); Date.UTC(y, m, 1) < end; m++) {
    if (m > 11) {
      m = 0;
      y++;
    }
    const a = Math.max(Date.UTC(y, m, 1), start);
    const b = Math.min(Date.UTC(y, m + 1, 1), end);
    months.push({
      label: m === 0 || months.length === 0 ? `${MONTHS[m]} ${y}` : MONTHS[m],
      left: pct(a),
      width: pct(b) - pct(a),
    });
  }

  const chartRef = useRef<HTMLDivElement>(null);
  const [chartPx, setChartPx] = useState(600);
  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setChartPx(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [today, setToday] = useState<number | null>(null);
  useEffect(() => {
    const n = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- today is only known in the browser
    setToday(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
  }, []);
  const todayPct = today !== null && today >= start && today < end ? pct(today) : null;

  return (
    <div className="overflow-x-auto rounded-[var(--radius)] border border-line bg-bg-elev shadow-paper">
      <div className="min-w-[760px]">
        <div className="grid grid-cols-[11rem_minmax(0,1fr)] border-b border-line bg-bg-band">
          <div className="eyebrow px-4 py-3 text-fg-3">Track</div>
          <div ref={chartRef} className="relative h-10">
            {months.map((m) => (
              <div
                key={m.label}
                className="eyebrow absolute top-0 flex h-full items-center border-l border-line pl-2 text-fg-3"
                style={{ left: `${m.left}%`, width: `${m.width}%` }}
              >
                {m.label}
              </div>
            ))}
            {todayPct !== null ? (
              <span
                className="absolute bottom-0 -translate-x-1/2 translate-y-1/2 rounded bg-accent px-1 font-mono text-[9px] leading-[14px] text-white"
                style={{ left: `${todayPct}%` }}
              >
                Today
              </span>
            ) : null}
          </div>
        </div>

        <div className="relative">
          {rows.map((row) => (
            <div key={row.track} className="grid grid-cols-[11rem_minmax(0,1fr)] border-b border-line last:border-b-0">
              <div className="flex items-center gap-2 px-4 py-4 text-sm font-medium">
                <span aria-hidden className="size-2.5 shrink-0 rounded-sm" style={{ background: `var(--cat-${row.cat})` }} />
                {row.track}
              </div>
              <div className="relative h-16">
                {months.map((m) => (
                  <div key={m.label} aria-hidden className="absolute inset-y-0 border-l border-line/70" style={{ left: `${m.left}%` }} />
                ))}
                {row.bars.map((bar, i) => {
                  const left = pct(parse(bar.from));
                  const width = Math.max(pct(parse(bar.to) + DAY) - left, 0.9);
                  const widthPx = (width / 100) * chartPx;
                  const labelPx = bar.label.length * 6.4 + 20;
                  const nextLeft = row.bars[i + 1] ? pct(parse(row.bars[i + 1].from)) : 100;
                  const gapPx = ((nextLeft - left - width) / 100) * chartPx;
                  const inside = labelPx <= widthPx;
                  const outside = !inside && gapPx >= labelPx;
                  return (
                    <div key={bar.label + bar.from}>
                      <div
                        className="absolute top-3 flex h-7 items-center overflow-hidden rounded-md px-2 text-white"
                        style={{
                          left: `${left}%`,
                          width: `${width}%`,
                          background: `var(--cat-${row.cat}-solid)`,
                        }}
                        title={`${bar.label}: ${fmt(bar.from)} – ${fmt(bar.to)}`}
                      >
                        {outside ? null : (
                          <span className="truncate text-[11px] font-semibold">{bar.label}</span>
                        )}
                      </div>
                      {outside ? (
                        <span
                          className="absolute top-3 flex h-7 items-center pl-1.5 text-[11px] font-semibold whitespace-nowrap text-fg-2"
                          style={{ left: `calc(${left}% + ${Math.max(widthPx, 16) + 2}px)` }}
                        >
                          {bar.label}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
                {row.marks?.map((mark) => (
                  <div
                    key={mark.date}
                    className="absolute bottom-0.5 flex -translate-x-1/2 flex-col items-center"
                    style={{ left: `${pct(parse(mark.date) + DAY / 2)}%` }}
                    title={`${mark.label}: ${fmt(mark.date)}`}
                  >
                    <span aria-hidden className="size-2.5 rotate-45 rounded-[2px]" style={{ background: "var(--cat-exam)" }} />
                    <span className="mt-0.5 font-mono text-[9px] whitespace-nowrap text-fg-2">{mark.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {todayPct !== null ? (
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[11rem] right-0">
              <div className="absolute inset-y-0 w-px bg-accent" style={{ left: `${todayPct}%` }} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
