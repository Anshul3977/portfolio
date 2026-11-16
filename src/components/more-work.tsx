import type { MoreProject } from "../../content/projects";
import { BlurFade } from "@/components/blur-fade";
import { ProjectLinks } from "@/components/project-links";

export function MoreWork({ projects }: { projects: MoreProject[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {projects.map((project, i) => (
        <BlurFade key={project.slug} delay={i * 0.05}>
          <article className="grid gap-4 py-8 sm:grid-cols-12 sm:items-baseline sm:gap-8">
            <h3 className="font-serif text-2xl tracking-tight text-foreground sm:col-span-3">
              {project.title}
            </h3>
            <div className="sm:col-span-6">
              <p className="text-[15px] leading-7 text-muted">{project.summary}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-muted/80">
                {project.stack.join(" · ")}
              </p>
            </div>
            <div className="sm:col-span-3 sm:justify-self-end">
              <ProjectLinks links={project.links} />
            </div>
          </article>
        </BlurFade>
      ))}
    </div>
  );
}
