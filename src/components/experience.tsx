import { experience } from "../../content/site";
import { BlurFade } from "@/components/blur-fade";
import { SectionHeading } from "@/components/section-heading";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeading id="experience-heading" kicker="Experience">
        Where I&apos;ve worked
      </SectionHeading>

      <ol className="timeline relative mt-14">
        {experience.map((role) => (
          <li key={role.company} className="relative grid grid-cols-1 gap-x-12 gap-y-4 pb-16 pl-8 last:pb-0 md:grid-cols-[11rem_1fr] md:pl-0">
            <span aria-hidden="true" className={`tl-dot ${role.current ? "is-now" : ""}`} />
            <BlurFade className="md:pt-1.5">
              <p className="font-mono text-xs tracking-wide text-muted">{role.period}</p>
              <p className="mt-1 font-mono text-xs tracking-wide text-muted/70">{role.where}</p>
            </BlurFade>
            <BlurFade delay={0.05} className="min-w-0 md:pl-10">
              <h3 className="font-serif text-4xl leading-none tracking-tight sm:text-5xl">{role.company}</h3>
              <p className="mt-2 text-accent-soft">{role.title}</p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/85">{role.summary}</p>

              <div className="mt-7 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="font-serif text-5xl leading-none text-foreground sm:text-6xl">{role.impact.value}</span>
                <span className="max-w-[16rem] text-sm leading-5 text-muted">{role.impact.label}</span>
              </div>
              {role.current && (
                <div className="impact-bars mt-5 max-w-md space-y-2" aria-hidden="true">
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
              )}

              <ul className="mt-7 max-w-2xl space-y-2.5 text-[15px] leading-7 text-muted">
                {role.points.map((p) => (
                  <li key={p} className="relative pl-5">
                    <span aria-hidden="true" className="absolute left-0 top-[0.75em] h-px w-2.5 bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[11.5px] leading-6 text-muted/80">{role.stack.join("  ·  ")}</p>
            </BlurFade>
          </li>
        ))}
      </ol>
    </section>
  );
}
