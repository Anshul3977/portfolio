import type { MoreProject } from "../../content/projects";
import { BlurFade } from "@/components/blur-fade";
import { ProjectButtons } from "@/components/project-buttons";

export function MoreWork({ projects }: { projects: MoreProject[] }) {
  return (
    <ul className="border-b border-line">
      {projects.map((project) => (
        <li key={project.slug}>
          <BlurFade>
            <article className="row group grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line py-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] md:items-center">
              <div>
                <h3 className="font-serif text-[1.9rem] leading-none tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-soft">
                  {project.title}
                </h3>
                <p className={`mt-2 font-mono text-[11px] ${/^(Prototype|In progress)/.test(project.tag) ? "text-accent-soft" : "text-muted"}`}>
                  {project.tag}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-[15px] leading-6 text-foreground/80">{project.summary}</p>
                <p className="mt-1.5 font-mono text-[11px] text-muted/80">{project.stack.join("  ·  ")}</p>
              </div>
              <ProjectButtons links={project.links} size="sm" />
            </article>
          </BlurFade>
        </li>
      ))}
    </ul>
  );
}
