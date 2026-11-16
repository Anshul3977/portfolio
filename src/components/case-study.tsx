import { existsSync } from "node:fs";
import path from "node:path";
import type { CaseStudy as CaseStudyType } from "../../content/projects";
import { BlurFade } from "@/components/blur-fade";
import { ProjectLinks } from "@/components/project-links";
import { Safari } from "@/components/safari";
import { ShineBorder } from "@/components/shine-border";
import { ScrollScale } from "@/components/scroll-scale";
import { FireVisual, PrepKitVisual, VoiceVisual } from "@/components/project-visuals";

function hasPublicImage(src: string) {
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

function Media({ project }: { project: CaseStudyType }) {
  if (project.image && hasPublicImage(project.image.src)) {
    const safari = (
      <Safari src={project.image.src} alt={project.image.alt} urlLabel={project.image.urlLabel} priority={false} />
    );
    return project.featured ? <ShineBorder>{safari}</ShineBorder> : safari;
  }
  if (project.visual === "fire") return <FireVisual />;
  if (project.visual === "voice") return <VoiceVisual />;
  if (project.visual === "prepkit") return <PrepKitVisual />;
  return null;
}

export function CaseStudy({ project, flip }: { project: CaseStudyType; flip?: boolean }) {
  return (
    <article id={project.slug} className="relative border-t border-line py-16 lg:py-24">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className={`min-w-0 lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
          <BlurFade>
            <div className="flex items-baseline gap-4">
              <span aria-hidden="true" className="outline-num font-serif text-7xl leading-none sm:text-8xl">
                {project.number}
              </span>
              <span className="eyebrow">{project.kind}</span>
            </div>
            <h3 className="mt-5 font-serif text-4xl leading-[1] tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h3>
            <p className="mt-3 text-lg leading-7 text-accent-soft">{project.tagline}</p>
            <div className="mt-5">
              <ProjectLinks links={project.links} />
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {project.highlights.map((h) => (
                <div key={h.label} className="bg-[#100d0a] px-3 py-3.5">
                  <dt className="sr-only">{h.label}</dt>
                  <dd>
                    <p className="font-serif text-2xl leading-none text-foreground sm:text-[1.7rem]">{h.value}</p>
                    <p className="mt-1.5 text-[11px] leading-4 text-muted">{h.label}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </BlurFade>
        </div>
        <ScrollScale className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
          <Media project={project} />
        </ScrollScale>
      </div>

      <BlurFade>
        <dl className="mt-10 grid gap-8 text-[15px] leading-7 text-muted md:grid-cols-3 lg:mt-14">
          {[
            ["Problem", project.problem],
            ["What I built", project.built],
            ["Outcome", project.outcome],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-line pt-4">
              <dt className="font-mono text-[11px] tracking-[0.16em] text-foreground uppercase">{k}</dt>
              <dd className="mt-2">{v}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      </BlurFade>
    </article>
  );
}
