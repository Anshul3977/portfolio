import Image from "next/image";
import type { CaseStudy as CaseStudyType } from "../../content/projects";
import { BlurFade } from "@/components/blur-fade";
import { DemoVideo } from "@/components/demo-video";
import { ProjectButtons } from "@/components/project-buttons";

function Media({ project }: { project: CaseStudyType }) {
  if (project.video) {
    return (
      <figure>
        <div className="media-frame">
          <DemoVideo src={project.video.src} poster={project.video.poster} alt={project.video.alt} />
        </div>
        <figcaption className="mt-3 text-xs text-muted">{project.video.caption}</figcaption>
      </figure>
    );
  }
  if (project.image) {
    const { src, alt, mobileSrc, caption } = project.image;
    return (
      <figure>
        <div className={`media-frame relative aspect-[16/10] ${mobileSrc ? "max-sm:hidden" : ""}`}>
          <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 640px, 100vw" className="media-img object-cover object-top" />
        </div>
        {mobileSrc && (
          <div className="media-frame relative mx-auto aspect-[640/998] w-full max-w-[420px] sm:hidden">
            <Image src={mobileSrc} alt={alt} fill sizes="100vw" className="media-img object-cover object-top" />
          </div>
        )}
        {caption && <figcaption className="mt-3 text-xs text-muted">{caption}</figcaption>}
      </figure>
    );
  }
  return null;
}

export function CaseStudy({ project, index }: { project: CaseStudyType; index: number }) {
  const hasMedia = Boolean(project.video || project.image);
  return (
    <article id={project.slug} className="project group/p relative border-t border-line py-14 lg:py-20">
      <div className={`grid grid-cols-1 items-start gap-10 ${hasMedia ? "lg:grid-cols-12 lg:gap-14" : "lg:grid-cols-2 lg:gap-14"}`}>
        <BlurFade className={`min-w-0 ${hasMedia ? "lg:col-span-5" : ""}`}>
          <p className="font-mono text-xs text-muted">
            <span className="text-accent-soft">{String(index + 1).padStart(2, "0")}</span>  {project.kind}
          </p>
          <h3 className="mt-3 font-serif text-4xl leading-none tracking-tight text-foreground sm:text-5xl">{project.title}</h3>
          <p className="mt-5 text-[17px] leading-7 text-foreground/85">{project.summary}</p>
          <ul className="mt-5 space-y-2 text-[15px] leading-6 text-muted">
            {project.bullets.slice(0, 3).map((b) => (
              <li key={b} className="relative pl-5">
                <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-accent" />
                {b}
              </li>
            ))}
          </ul>
          {hasMedia && <Numbers project={project} />}
          <div className="mt-7">
            <ProjectButtons links={project.links} />
            {project.note && <p className="mt-3 text-xs text-muted">{project.note}</p>}
          </div>
          <p className="mt-6 font-mono text-[11.5px] leading-6 text-muted/80">{project.stack.join("  ·  ")}</p>
          {project.details && (
            <details className="more mt-5 text-[15px] leading-7">
              <summary className="cursor-pointer select-none text-sm text-accent-soft">Read more</summary>
              <div className="mt-3 space-y-3 text-muted">
                <p>
                  <span className="text-foreground">Why: </span>
                  {project.details.problem}
                </p>
                <p>
                  <span className="text-foreground">How: </span>
                  {project.details.built}
                </p>
                <p>
                  <span className="text-foreground">Result: </span>
                  {project.details.outcome}
                </p>
              </div>
            </details>
          )}
        </BlurFade>
        <BlurFade delay={0.08} className={`min-w-0 ${hasMedia ? "lg:col-span-7" : "lg:pt-10"}`}>
          {hasMedia ? <Media project={project} /> : <Numbers project={project} big />}
        </BlurFade>
      </div>
    </article>
  );
}

function Numbers({ project, big }: { project: CaseStudyType; big?: boolean }) {
  return (
    <dl className={`mt-7 flex flex-wrap gap-x-8 gap-y-4 ${big ? "lg:mt-0" : ""}`}>
      {project.highlights.map((h) => (
        <div key={h.label} className="min-w-[6.5rem]">
          <dt className="sr-only">{h.label}</dt>
          <dd className={`font-serif leading-none text-foreground ${big ? "text-6xl" : "text-4xl"}`}>{h.value}</dd>
          <dd className="mt-1.5 max-w-[11rem] text-xs leading-4 text-muted">{h.label}</dd>
        </div>
      ))}
    </dl>
  );
}
