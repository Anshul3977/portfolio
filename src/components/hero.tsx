import { site } from "../../content/site";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { Magnet } from "@/components/magnet";
import { TextAnimate } from "@/components/text-animate";
import { BlurFade } from "@/components/blur-fade";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-3.5rem)] flex-col justify-center overflow-hidden py-20"
    >
      <HeroBackdrop />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <BlurFade>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
            {site.degree} · {site.school}
          </p>
        </BlurFade>
        <TextAnimate
          className="mt-6 max-w-5xl font-serif text-[clamp(3.25rem,12vw,8.5rem)] leading-[0.88] tracking-tight text-foreground"
          delay={0.1}
        >
          {site.name}
        </TextAnimate>
        <BlurFade delay={0.35}>
          <p className="mt-8 max-w-xl text-lg text-muted sm:text-xl">
            {site.oneLiner}
          </p>
        </BlurFade>
        <BlurFade delay={0.45}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnet>
              <a href="#work" className="btn-primary">
                Projects
              </a>
            </Magnet>
            <Magnet>
              <a
                href={site.links.github}
                className="btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Magnet>
            <Magnet>
              <a href={site.links.email} className="btn-ghost">
                Email
              </a>
            </Magnet>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
