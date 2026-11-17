import { site, skillGroups } from "../../content/site";
import { BlurFade } from "@/components/blur-fade";
import { CountUp } from "@/components/count-up";
import { SectionHeading } from "@/components/section-heading";

export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeading id="resume-heading" kicker="Resume">
        Education &amp; skills
      </SectionHeading>

      <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12">
        <BlurFade className="min-w-0 lg:col-span-5">
          <p className="text-lg leading-8 text-foreground/85">
            I&apos;m a 2026 CSE (Data Science) graduate. I like building AI features end to end: the model, the API
            around it, and the screen people use. I mostly write Python and TypeScript, and C++ for problem solving.
          </p>

          <dl className="mt-10 space-y-8">
            <div className="border-t border-line pt-6">
              <dt className="font-mono text-xs text-muted">Education</dt>
              <dd className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
                <span className="font-serif text-7xl leading-[0.8] text-foreground">
                  <CountUp to={Number(site.cgpa)} decimals={1} />
                </span>
                <span className="pb-1 text-sm leading-5 text-muted">
                  CGPA out of 10
                  <br />
                  <span className="text-foreground">{site.degree}</span>
                  <br />
                  {site.school} · {site.years}
                </span>
              </dd>
            </div>
            <div className="border-t border-line pt-6">
              <dt className="font-mono text-xs text-muted">Problem solving</dt>
              <dd className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
                <span className="font-serif text-7xl leading-[0.8] text-foreground">
                  <CountUp to={600} />+
                </span>
                <span className="pb-1 text-sm leading-5 text-muted">
                  DSA problems solved in C++
                  <br />
                  <a href={site.links.codeforces} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex min-h-12 items-center text-base text-foreground">
                    Codeforces · {site.links.codeforcesHandle}
                  </a>
                </span>
              </dd>
            </div>
          </dl>
        </BlurFade>

        <BlurFade delay={0.06} className="min-w-0 lg:col-span-7">
          <h3 className="font-mono text-xs text-muted">Skills</h3>
          <dl className="mt-3">
            {skillGroups.map((g) => (
              <div key={g.label} className="skill-row grid grid-cols-1 gap-1 border-t border-line py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="text-sm text-accent-soft">{g.label}</dt>
                <dd className="text-base leading-7 text-foreground/85">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>

          <div className="resume-card mt-10 rounded-2xl border border-line p-6 sm:p-7">
            <p className="font-serif text-3xl leading-tight text-foreground">Want the one-page version?</p>
            <p className="mt-2 text-sm text-muted">Two PDFs, depending on the role you&apos;re hiring for.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.resumes.ai} target="_blank" rel="noopener" className="btn-primary group gap-2">
                AI engineering resume
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
              <a href={site.resumes.fullstack} target="_blank" rel="noopener" className="btn-ghost group gap-2">
                Full-stack resume
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
