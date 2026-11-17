import { site } from "../../content/site";
import { VisionField } from "@/components/vision-field";
import { Magnet } from "@/components/magnet";

function Line({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
  // Each word slides up out of a mask; the delay staggers the two name lines.
  return (
    <span className={`mask-line ${className}`}>
      <span className="mask-inner" style={{ animationDelay: `${delay}ms` }}>
        {text}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <VisionField />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_60%,var(--background)_28%,transparent_72%)] max-lg:bg-[linear-gradient(180deg,transparent_0%,transparent_18%,color-mix(in_srgb,var(--background)_90%,transparent)_26%,color-mix(in_srgb,var(--background)_90%,transparent)_82%,transparent_88%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-16 sm:px-8">
        <p className="rise eyebrow [animation-delay:80ms]">
          <span className="text-accent-soft">{site.role}</span> · {site.location}
        </p>

        <h1
          id="hero-heading"
          className="mt-8 max-w-full font-serif text-[clamp(2.75rem,13vw,12.5rem)] leading-[0.86] tracking-[-0.03em] text-foreground"
        >
          <span className="relative inline-block">
            <Line text="Anshul" delay={160} />
            <span aria-hidden="true" className="lock-box brackets">
              <span className="lock-tag">person 0.99 · id 001</span>
            </span>
          </span>
          <br />
          <Line text="Palarpwar" delay={260} className="italic text-accent-soft" />
        </h1>

        <p className="rise mt-9 max-w-xl text-lg leading-8 text-foreground/80 [animation-delay:520ms] sm:text-xl">
          {site.oneLiner}
        </p>

        <div className="rise mt-10 flex flex-wrap items-center gap-3 [animation-delay:640ms]">
          <Magnet>
            <a href="#work" className="btn-primary">
              See my projects
            </a>
          </Magnet>
          <a href={site.resumes.ai} target="_blank" rel="noopener" className="btn-ghost group gap-2">
            Download resume
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>

        <dl className="rise mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted [animation-delay:760ms]">
          <div>
            <dt className="sr-only">Now</dt>
            <dd>
              <span className="text-foreground">ML Engineering Intern</span> at AIMonk Labs
            </dd>
          </div>
          <div>
            <dt className="sr-only">Education</dt>
            <dd>
              {site.degree} &apos;26 · <span className="text-foreground">CGPA {site.cgpa}</span>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Problem solving</dt>
            <dd>
              <span className="text-foreground">600+</span> DSA problems
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
