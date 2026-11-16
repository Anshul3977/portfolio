import { existsSync } from "node:fs";
import path from "node:path";
import type { CaseStudy as CaseStudyType } from "../../content/projects";
import { BlurFade } from "@/components/blur-fade";
import { ProjectLinks } from "@/components/project-links";
import { Safari } from "@/components/safari";
import { ShineBorder } from "@/components/shine-border";
import { ScrollScale } from "@/components/scroll-scale";
import Image from "next/image";
import { PrepKitVisual } from "@/components/project-visuals";
import { DemoVideo } from "@/components/demo-video";

function hasPublicImage(src: string) {
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

function Captioned({ caption, children }: { caption?: string; children: React.ReactNode }) {
  return (
    <figure>
      {children}
      {caption && <figcaption className="mt-3 font-mono text-[11px] leading-5 text-muted">{caption}</figcaption>}
    </figure>
  );
}

function Media({ project }: { project: CaseStudyType }) {
  if (project.video) {
    return (
      <Captioned caption={project.video.caption}>
        <div className="overflow-hidden rounded-[14px] border border-line">
          <div className="flex items-center justify-between border-b border-line bg-[#110e0b] px-4 py-2.5 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            <span>fire-vision · real run</span>
            <span className="text-accent-soft">● input · yolo · mask · flow</span>
          </div>
          <DemoVideo src={project.video.src} poster={project.video.poster} alt={project.video.alt} />
        </div>
      </Captioned>
    );
  }
  if (project.image && hasPublicImage(project.image.src)) {
    if (project.image.frame === "plain") {
      return (
        <Captioned caption={project.image.caption}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] border border-line">
            <Image src={project.image.src} alt={project.image.alt} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover object-top" />
          </div>
        </Captioned>
      );
    }
    const safari = (
      <Safari src={project.image.src} alt={project.image.alt} urlLabel={project.image.urlLabel} priority={false} />
    );
    return (
      <Captioned caption={project.image.caption}>{project.featured ? <ShineBorder>{safari}</ShineBorder> : safari}</Captioned>
    );
  }
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
