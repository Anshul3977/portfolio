import Image from "next/image";
import type { CaseStudy } from "../../content/projects";
import { DemoVideo } from "@/components/demo-video";
import { ProjectButtons } from "@/components/project-buttons";

const KIT = ["Company brief", "Role breakdown", "Interview questions", "Flashcards", "Day-by-day plan"];

function Media({ project }: { project: CaseStudy }) {
  if (project.video) {
    return (
      <div className="media-frame">
        <DemoVideo src={project.video.src} poster={project.video.poster} alt={project.video.alt} />
      </div>
    );
  }
  if (project.image) {
    return (
      <div className="media-frame relative aspect-video">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 540px, 100vw"
          className={`media-img object-cover ${project.image.frame === "plain" ? "object-left-top" : "object-top"}`}
        />
      </div>
    );
  }
  // Prep Kit: no screenshot yet, so show what a kit contains.
  return (
    <div className="media-frame kit-panel flex aspect-video flex-col justify-center gap-2 px-6 sm:px-10" aria-hidden="true">
      <p className="font-mono text-[11px] tracking-wide text-muted">job description + company URL →</p>
      <ol className="mt-1 space-y-1.5">
        {KIT.map((k, i) => (
          <li key={k} className="flex items-baseline gap-3 font-serif text-xl leading-tight text-foreground/90 sm:text-2xl">
            <span className="font-mono text-[11px] text-accent-soft">{String(i + 1).padStart(2, "0")}</span>
            {k}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FeaturedCard({ project, index }: { project: CaseStudy; index: number }) {
  return (
    <article id={project.slug} className="project feature-card flex h-full flex-col rounded-2xl border border-line p-4 sm:p-5">
      <Media project={project} />
      <div className="flex flex-1 flex-col px-1 pt-5 sm:px-2">
        <p className="font-mono text-xs text-muted">
          <span className="text-accent-soft">{String(index + 1).padStart(2, "0")}</span>  {project.kind}
        </p>
        <h3 className="mt-2 font-serif text-[2.1rem] leading-none tracking-tight text-foreground sm:text-[2.4rem]">{project.title}</h3>
        <p className="mt-3 text-[15px] leading-6 text-foreground/80">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h.label} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
              <span className="text-foreground">{h.value}</span> {h.label}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[11px] leading-5 text-muted/80">{project.stack.join("  ·  ")}</p>
        <div className="mt-auto pt-6">
          <ProjectButtons links={project.links} size="sm" />
          {project.note && <p className="mt-2.5 text-xs text-muted">{project.note}</p>}
        </div>
      </div>
    </article>
  );
}
