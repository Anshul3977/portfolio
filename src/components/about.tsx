import { site, skillGroups } from "../../content/site";
import { BlurFade } from "@/components/blur-fade";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeading id="about-heading" index="05" kicker="About">
        Models are the easy part. <span className="italic text-accent-soft">Systems are the job.</span>
      </SectionHeading>

      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-6">
        <BlurFade className="lg:col-span-4 lg:row-span-2">
          <div className="card h-full p-7 sm:p-9">
            <p className="text-xl leading-9 text-foreground/90 sm:text-2xl sm:leading-10">
              I&apos;m Anshul — an AI engineer and full-stack developer from Nagpur. I like the unglamorous middle of AI
              products: the GPU pipeline that has to finish before the shift ends, the retrieval step that has to cite real
              text, the API that has to stay up after the demo.
            </p>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-7 text-muted">
              Right now that&apos;s production computer vision at AIMonk Labs. Before that I spent over a year grading LLM
              outputs for a living, which is why my own projects measure things — citation validity, mAP, latency budgets —
              instead of just looking right. I write Python and TypeScript most days, and C++ for the 600+ problems I&apos;ve
              solved on the side.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.resumes.ai} target="_blank" rel="noopener" className="btn-primary">
                Resume · AI engineering
              </a>
              <a href={site.resumes.fullstack} target="_blank" rel="noopener" className="btn-ghost">
                Resume · Full-stack
              </a>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.06} className="lg:col-span-2">
          <div className="card h-full p-6">
            <p className="eyebrow">Education</p>
            <p className="mt-4 font-serif text-6xl leading-none text-foreground">
              {site.cgpa}
              <span className="ml-1 text-2xl text-muted">/10</span>
            </p>
            <p className="mt-4 text-sm text-foreground/85">{site.degree}</p>
            <p className="mt-1 text-sm text-muted">
              {site.school} · {site.years}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.1} className="lg:col-span-2">
          <a
            href={site.links.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="card group block h-full p-6"
          >
            <p className="eyebrow">Problem solving</p>
            <p className="mt-4 font-serif text-6xl leading-none text-foreground">
              600<span className="text-accent">+</span>
            </p>
            <p className="mt-4 text-sm text-foreground/85">DSA problems solved</p>
            <p className="mt-1 text-sm text-muted">
              Codeforces · {site.links.codeforcesHandle}{" "}
              <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </p>
          </a>
        </BlurFade>

        <BlurFade delay={0.05} className="lg:col-span-6">
          <div className="card p-6 sm:p-8">
            <p className="eyebrow">Toolkit</p>
            <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
              {skillGroups.map((g) => (
                <div key={g.label}>
                  <h3 className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">{g.label}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5 lg:flex-col lg:gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="chip lg:border-0 lg:bg-transparent lg:p-0 lg:text-[14px] lg:text-foreground/85">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
