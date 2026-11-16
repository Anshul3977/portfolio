import { experience, type Role } from "../../content/site";
import { BlurFade } from "@/components/blur-fade";
import { SectionHeading } from "@/components/section-heading";

function Lead({ role }: { role: Role }) {
  return (
    <article className="exp-lead relative overflow-hidden rounded-2xl border border-line p-6 sm:p-10 lg:p-12">
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
        <div>
          <p className="flex items-center gap-2.5 font-mono text-xs tracking-wide text-accent-soft">
            {role.current && <span aria-hidden="true" className="live-dot inline-block h-2 w-2 rounded-full bg-accent" />}
            {role.current ? "Now" : role.period}
            {role.project && <span className="text-muted">· {role.project}</span>}
          </p>
          <h3 className="mt-4 font-serif text-5xl leading-none tracking-tight sm:text-6xl">{role.company}</h3>
          <p className="mt-2 text-lg text-accent-soft">{role.title}</p>
        </div>
        <p className="font-mono text-xs leading-6 text-muted sm:text-right">
          {role.period}
          <br />
          {role.where}
        </p>
      </div>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/90 sm:text-xl">{role.summary}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
        <div>
          <p className="font-serif text-[clamp(3rem,7vw,5.25rem)] leading-none tracking-tight text-foreground">{role.impact.value}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{role.impact.label}</p>
          <div className="impact-bars mt-6 max-w-md space-y-2" aria-hidden="true">
            <div className="flex items-center gap-3">
              <span className="w-12 font-mono text-[11px] text-muted">before</span>
              <span className="bar h-1.5 flex-1 rounded-full bg-line" />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 font-mono text-[11px] text-accent-soft">now</span>
              <span className="h-1.5 flex-1">
                <span className="bar bar-now block h-full w-[8%] rounded-full bg-accent" />
              </span>
            </div>
          </div>
          {role.metrics && (
            <dl className="mt-8 grid grid-cols-2 gap-2.5">
              {role.metrics.map((m) => (
                <div key={m.label} className="metric-chip rounded-xl border border-line px-4 py-3">
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="font-serif text-xl leading-none text-foreground sm:text-[1.7rem]">{m.value}</dd>
                  <dd className="mt-1.5 text-xs leading-4 text-muted">{m.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div>
          <ul className="space-y-4 text-[15px] leading-7 text-foreground/80">
            {role.points.map((p) => (
              <li key={p} className="relative pl-6">
                <span aria-hidden="true" className="absolute left-0 top-[0.8em] h-px w-3 bg-accent" />
                {p}
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-1.5" aria-label="Stack">
            {role.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function Past({ role }: { role: Role }) {
  return (
    <article className="row grid grid-cols-1 gap-x-10 gap-y-3 border-t border-line py-7 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:items-baseline">
      <p className="font-mono text-xs tracking-wide text-muted">{role.period}</p>
      <div className="min-w-0">
        <h3 className="font-serif text-3xl leading-none tracking-tight">
          {role.company} <span className="font-sans text-base text-accent-soft">· {role.title}</span>
        </h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
          {role.summary} {role.points.join(" ")}
        </p>
      </div>
      <p className="text-sm text-muted md:text-right">
        <span className="font-serif text-3xl text-foreground">{role.impact.value}</span>
        <span className="mt-1 block max-w-[12rem] text-xs leading-4">{role.impact.label}</span>
      </p>
    </article>
  );
}

export function Experience() {
  const [lead, ...past] = experience;
  return (
    <section id="experience" aria-labelledby="experience-heading" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading id="experience-heading" kicker="Experience">
        What I do at work
      </SectionHeading>
      <BlurFade className="mt-12">
        <Lead role={lead} />
      </BlurFade>
      {past.length > 0 && (
        <BlurFade className="mt-10">
          {past.map((role) => (
            <Past key={role.company} role={role} />
          ))}
        </BlurFade>
      )}
    </section>
  );
}
