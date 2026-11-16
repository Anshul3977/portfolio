import { existsSync } from "node:fs";
import path from "node:path";
import type { CaseStudy as CaseStudyType } from "../../content/projects";
import { BlurFade } from "@/components/blur-fade";
import { ProjectLinks } from "@/components/project-links";
import { Safari } from "@/components/safari";
import { ShineBorder } from "@/components/shine-border";

function hasPublicImage(src: string) {
  const file = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  return existsSync(file);
}

export function CaseStudy({ project }: { project: CaseStudyType }) {
  const showImage = Boolean(project.image && hasPublicImage(project.image.src));
  const media = showImage && project.image && (
    <Safari
      src={project.image.src}
      alt={project.image.alt}
      urlLabel={project.image.urlLabel}
      priority={project.featured}
    />
  );

  return (
    <article
      id={project.slug}
      className="grid items-start gap-10 border-t border-line py-16 lg:grid-cols-12 lg:gap-14 lg:py-24"
    >
      <BlurFade className={project.featured && showImage ? "lg:col-span-6" : "lg:col-span-7"}>
        <p className="font-mono text-xs tracking-[0.2em] text-accent">
          {project.number}
        </p>
        <h3 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-2 text-base text-accent-soft">{project.tagline}</p>
        <div className="mt-5">
          <ProjectLinks links={project.links} />
        </div>
        <dl className="mt-8 space-y-5 text-[15px] leading-7 text-muted">
          <div>
            <dt className="font-medium uppercase tracking-[0.16em] text-[11px] text-foreground">
              Problem
            </dt>
            <dd className="mt-1">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-medium uppercase tracking-[0.16em] text-[11px] text-foreground">
              What I built
            </dt>
            <dd className="mt-1">{project.built}</dd>
          </div>
          <div>
            <dt className="font-medium uppercase tracking-[0.16em] text-[11px] text-foreground">
              Outcome
            </dt>
            <dd className="mt-1">{project.outcome}</dd>
          </div>
        </dl>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line px-2.5 py-1 text-[11px] tracking-wide text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </BlurFade>
      {showImage ? (
        <BlurFade
          delay={0.12}
          className={
            project.featured
              ? "lg:sticky lg:top-24 lg:col-span-6"
              : "lg:sticky lg:top-24 lg:col-span-5"
          }
        >
          {project.featured ? <ShineBorder>{media}</ShineBorder> : media}
        </BlurFade>
      ) : null}
    </article>
  );
}
