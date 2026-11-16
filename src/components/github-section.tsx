import { getGitHub, type Day } from "@/lib/github";
import { site } from "../../content/site";
import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/blur-fade";

const LEVELS = ["#1b1713", "#4a2f17", "#7d4c1f", "#b46c2d", "#e2b075"];

const fmtMonth = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });
const fmtDate = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

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
    let label: string | null = null;
    if (firstDay) {
      const date = new Date(`${firstDay.date}T00:00:00Z`);
      const m = date.getUTCMonth();
      if (m !== lastMonth) {
        label = lastMonth === -1 && x > 0 ? null : fmtMonth.format(date);
        lastMonth = m;
      }
    }
    labels.push(label);
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={label}>
      {cols.map((col, x) => {
        const monthLabel = labels[x];
        return (
          <g key={x} transform={`translate(${x * (size + gap)},0)`}>
            {monthLabel && x < cols.length - 2 && (
              <text y={9} className="fill-[#a8a095] font-mono text-[9px]">
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

export async function GitHubSection() {
  const gh = await getGitHub();
  const cols = weeks(gh.days);
  const recentCols = cols.slice(-22);
  const activeDays = gh.days.filter((d) => d.count > 0).length;
  const best = gh.days.reduce((m, d) => Math.max(m, d.count), 0);

  const stats = [
    { v: gh.contributionsLastYear.toLocaleString("en-IN"), l: "contributions, last 12 months" },
    { v: String(gh.publicRepos), l: "public repositories" },
    { v: String(activeDays), l: "active days, last 12 months" },
    { v: String(gh.totalStars), l: "stars across repos" },
  ];

  return (
    <section id="github" aria-labelledby="github-heading" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeading
        id="github-heading"
        kicker="GitHub"
        aside={
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost gap-2"
          >
            @{site.links.githubHandle} <span aria-hidden="true">↗</span>
          </a>
        }
      >
        Recent activity
      </SectionHeading>

      <BlurFade>
        <div className="card mt-12 p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs text-muted">Contribution graph</p>
            <p className="font-mono text-[10.5px] text-muted">
              <span className={gh.source === "live" ? "text-[#7ccf8a]" : "text-accent-soft"}>●</span>{" "}
              {gh.source === "live" ? "synced from the GitHub API" : "cached snapshot"} · {fmtDate.format(new Date(gh.fetchedAt))}
            </p>
          </div>
          <div className="mt-5 hidden sm:block">
            <Heatmap cols={cols} label={`${gh.contributionsLastYear} GitHub contributions in the last year; busiest day had ${best}.`} />
          </div>
          <div className="mt-5 sm:hidden">
            <Heatmap cols={recentCols} label={`GitHub contributions over the last ${recentCols.length} weeks.`} />
          </div>
          <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-muted" aria-hidden="true">
            less
            {LEVELS.map((c) => (
              <span key={c} className="size-2.5 rounded-[2px]" style={{ background: c }} />
            ))}
            more
          </div>

          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
            {stats.map((s) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd>
                  <p className="font-serif text-4xl leading-none text-foreground">{s.v}</p>
                  <p className="mt-2 text-[12px] text-muted">{s.l}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </BlurFade>

      <div className="mt-10">
        <BlurFade className="min-w-0">
          <div>
            <p className="font-mono text-xs text-muted">Recently pushed</p>
            <ul className="mt-4 divide-y divide-line">
              {gh.recent.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-3"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-mono text-[13.5px] text-foreground transition-colors group-hover:text-accent-soft">
                        {r.name}
                      </span>
                      {r.description && <span className="mt-0.5 block truncate text-[12.5px] text-muted">{r.description}</span>}
                    </span>
                    <span className="flex shrink-0 items-center gap-3 font-mono text-[11px] text-muted">
                      {r.language && <span className="hidden sm:inline">{r.language}</span>}
                      <span className="tabular-nums">{fmtDate.format(new Date(r.pushedAt))}</span>
                      <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
