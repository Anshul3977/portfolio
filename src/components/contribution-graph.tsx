"use client";

import { useEffect, useState } from "react";

const LEVELS = ["#1b1713", "#4a2f17", "#7d4c1f", "#b46c2d", "#e2b075"];

const fmtMonth = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });
const fmtDate = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

type Day = { date: string; count: number; level: number };

function daysFrom(start: string, counts: string, levels: string): Day[] {
  if (!start || !counts) return [];
  const t0 = new Date(`${start}T00:00:00Z`).getTime();
  const countList = counts.split(",").map((n) => Number(n));
  return countList.map((count, i) => ({
    date: new Date(t0 + i * 86_400_000).toISOString().slice(0, 10),
    count,
    level: Number(levels[i] ?? 0),
  }));
}

function weeks(days: Day[]) {
  const out: (Day | null)[][] = [];
  if (!days.length) return out;
  const first = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  let col: (Day | null)[] = Array.from({ length: first }, () => null);
  for (const d of days) {
    col.push(d);
    if (col.length === 7) {
      out.push(col);
      col = [];
    }
  }
  if (col.length) out.push(col);
  return out;
}

function Heatmap({ cols, label }: { cols: (Day | null)[][]; label: string }) {
  const size = 11;
  const gap = 3;
  const W = cols.length * (size + gap);
  const H = 7 * (size + gap) + 16;
  const labels: (string | null)[] = [];
  let lastMonth = -1;
  cols.forEach((col, x) => {
    const firstDay = col.find(Boolean);
    let month: string | null = null;
    if (firstDay) {
      const date = new Date(`${firstDay.date}T00:00:00Z`);
      const m = date.getUTCMonth();
      if (m !== lastMonth) {
        month = lastMonth === -1 && x > 0 ? null : fmtMonth.format(date);
        lastMonth = m;
      }
    }
    labels.push(month);
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" role="img" aria-label={label} preserveAspectRatio="xMinYMid meet">
      {cols.map((col, x) => {
        const monthLabel = labels[x];
        return (
          <g key={x} transform={`translate(${x * (size + gap)},0)`}>
            {monthLabel && x < cols.length - 2 && (
              <text y={9} className="fill-[#a8a095] font-mono text-xs">
                {monthLabel}
              </text>
            )}
            {col.map((d, y) =>
              d ? (
                <rect key={d.date} y={16 + y * (size + gap)} width={size} height={size} rx={2.5} fill={LEVELS[d.level] ?? LEVELS[0]}>
                  <title>{`${d.count} contribution${d.count === 1 ? "" : "s"} · ${fmtDate.format(new Date(`${d.date}T00:00:00Z`))}`}</title>
                </rect>
              ) : null,
            )}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * The year of cells is drawn after hydration so the document HTML does not
 * contain two copies of the graph. `counts` and `levels` are compact strings.
 */
export function ContributionGraph({
  start,
  counts,
  levels,
  label,
}: {
  start: string;
  counts: string;
  levels: string;
  label: string;
}) {
  const [wide, setWide] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // 22 columns on small screens, 53 on sm+. The box is reserved in CSS so the graph does not shift the page when it draws.
  const frame = "relative mt-5 aspect-[308/114] sm:aspect-[742/114]";

  if (wide === null) {
    return <div className={frame} role="img" aria-label={label} />;
  }

  const cols = weeks(daysFrom(start, counts, levels));
  const shown = wide ? cols : cols.slice(-22);
  return (
    <div className={frame}>
      <Heatmap cols={shown} label={wide ? label : `GitHub contributions over the last ${shown.length} weeks.`} />
    </div>
  );
}
