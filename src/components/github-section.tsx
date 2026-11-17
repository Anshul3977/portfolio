import { getGitHub } from "@/lib/github";
import { site } from "../../content/site";
import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/blur-fade";
import { ContributionGraph } from "@/components/contribution-graph";

const LEVELS = ["#1b1713", "#4a2f17", "#7d4c1f", "#b46c2d", "#e2b075"];

const fmtDate = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export async function GitHubSection() {
  const gh = await getGitHub();
  const activeDays = gh.days.filter((d) => d.count > 0).length;
  const best = gh.days.reduce((m, d) => Math.max(m, d.count), 0);
  const graphLabel = `${gh.contributionsLastYear} GitHub contributions in the last year; busiest day had ${best}.`;

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
            <p className="font-mono text-xs text-muted">
              <span className={gh.source === "live" ? "text-[#7ccf8a]" : "text-accent-soft"}>●</span>{" "}
              {gh.source === "live" ? "synced from the GitHub API" : "cached snapshot"} · {fmtDate.format(new Date(gh.fetchedAt))}
            </p>
          </div>
          <ContributionGraph
            start={gh.days[0]?.date ?? ""}
            counts={gh.days.map((d) => d.count).join(",")}
            levels={gh.days.map((d) => d.level).join("")}
            label={graphLabel}
          />
          <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-xs text-muted" aria-hidden="true">
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
                    className="group flex min-h-12 min-w-0 items-center justify-between gap-3 py-3"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-mono text-[13.5px] text-foreground transition-colors group-hover:text-accent-soft">
                        {r.name}
                      </span>
                      {r.description && <span className="mt-0.5 block truncate text-[12.5px] text-muted">{r.description}</span>}
                    </span>
                    <span className="flex shrink-0 items-center gap-3 font-mono text-xs text-muted">
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
