import { site, skillGroups } from "../../content/site";
import { BlurFade } from "@/components/blur-fade";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeading id="about-heading" index="05" kicker="About">
        About <span className="italic text-accent-soft">me.</span>
      </SectionHeading>

      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-6">
        <BlurFade className="lg:col-span-4 lg:row-span-2">
          <div className="card h-full p-7 sm:p-9">
            <p className="text-xl leading-9 text-foreground/90 sm:text-2xl sm:leading-10">
              I&apos;m Anshul, a 2026 B.Tech CSE (Data Science) graduate from Ramdeobaba University, Nagpur. I build
              practical AI systems and the full-stack apps around them, and I&apos;m comfortable moving between frontend
              work, backend debugging and deployment.
            </p>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-7 text-muted">
              At AIMonk Labs I work on a production computer-vision platform with YOLO, ByteTrack, OpenCV, GPU processing
              and Milvus, where I helped cut video processing from about 76 minutes to 6. Before that I evaluated 500+ AI
              outputs at Alignerr, so in my own projects I write down what I measured and where the limits are. I mostly
              write Python and TypeScript, and I&apos;ve solved 600+ DSA problems in C++.
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
