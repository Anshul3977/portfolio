import type { MoreProject } from "../../content/projects";
import { BlurFade } from "@/components/blur-fade";
import { ProjectLinks } from "@/components/project-links";

export function MoreWork({ projects }: { projects: MoreProject[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <BlurFade key={project.slug} delay={(i % 3) * 0.06} className={project.wide ? "lg:col-span-2" : ""}>
          <article className="card group flex h-full flex-col p-6 hover:[--c:var(--accent)]">
            <span aria-hidden="true" className="brackets pointer-events-none absolute inset-2 rounded-[14px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [--l:10px]" />
            <div className="flex items-center justify-between gap-3">
              <span className={`eyebrow ${project.tag.startsWith("Prototype") ? "text-accent-soft!" : ""}`}>{project.tag}</span>
              <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-4 font-serif text-3xl tracking-tight text-foreground">{project.title}</h3>
            <p className="mt-3 flex-1 text-[14.5px] leading-6 text-muted">{project.summary}</p>
            <p className="mt-5 font-mono text-[10.5px] tracking-wide text-muted/80">{project.stack.join(" · ")}</p>
            <div className="mt-4 border-t border-line pt-4">
              <ProjectLinks links={project.links} />
            </div>
          </article>
        </BlurFade>
      ))}
    </div>
  );
}
