import { experience } from "../../content/site";
import { BlurFade } from "@/components/blur-fade";
import { PipelineChart } from "@/components/pipeline-chart";
import { SectionHeading } from "@/components/section-heading";

export function Experience() {
  const [lead, ...rest] = experience;
  return (
    <section id="experience" aria-labelledby="experience-heading" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeading id="experience-heading" index="01" kicker="Experience">
        Where I&apos;ve <span className="italic text-accent-soft">worked.</span>
      </SectionHeading>

      <article className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <BlurFade className="min-w-0 lg:col-span-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="chip border-accent/40! text-accent-soft!">
              <span className="rec-dot mr-1.5 inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
              Now
            </span>
            <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
              {lead.period} · {lead.where}
            </span>
          </div>
          <h3 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">{lead.company}</h3>
          <p className="mt-1 text-accent-soft">{lead.title}</p>
          <p className="mt-6 text-lg leading-8 text-foreground/85">{lead.summary}</p>
          <ul className="mt-6 space-y-4 text-[15px] leading-7 text-muted">
            {lead.points.map((p) => (
              <li key={p} className="relative pl-5">
                <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-accent" />
                {p}
              </li>
            ))}
          </ul>
          <ul className="mt-7 flex flex-wrap gap-2">
            {lead.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        </BlurFade>
        <BlurFade delay={0.1} className="min-w-0 lg:col-span-7 lg:pt-10">
          <PipelineChart />
        </BlurFade>
      </article>

      {rest.map((role) => (
        <BlurFade key={role.company}>
          <article className="mt-16 grid grid-cols-1 gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-5">
              <p className="font-mono text-[11px] tracking-wider text-muted uppercase">
                {role.period} · {role.where}
              </p>
              <h3 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">{role.company}</h3>
              <p className="mt-1 text-accent-soft">{role.title}</p>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg leading-8 text-foreground/85">{role.summary}</p>
              <ul className="mt-4 space-y-3 text-[15px] leading-7 text-muted">
                {role.points.map((p) => (
                  <li key={p} className="relative pl-5">
                    <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </BlurFade>
      ))}
    </section>
  );
}
