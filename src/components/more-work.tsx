import type { MoreProject } from "../../content/projects";
import { ProjectButtons } from "@/components/project-buttons";

export function InProgress({ project }: { project: MoreProject }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-dashed border-line px-5 py-4">
      <span className="flex items-center gap-2 font-mono text-[11px] text-accent-soft">
        <span aria-hidden="true" className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
        {project.tag}
      </span>
      <p className="order-last w-full min-w-0 text-sm text-foreground/80 sm:order-none sm:w-auto sm:flex-1">
        <span className="font-medium text-foreground">{project.title}</span>
        <span className="text-muted"> — {project.summary}</span>
      </p>
      <ProjectButtons links={project.links} size="sm" />
    </div>
  );
}

export function MoreWork({ projects }: { projects: MoreProject[] }) {
  return (
    <details className="more-projects group border-y border-line">
      <summary className="flex cursor-pointer select-none items-center justify-between gap-4 py-5">
        <span>
          <span className="font-serif text-3xl leading-none tracking-tight">More projects</span>
          <span className="ml-3 font-mono text-xs text-muted">{projects.length} smaller builds</span>
        </span>
        <span className="chev inline-grid h-8 w-8 place-items-center rounded-full border border-line text-lg leading-none text-accent-soft" aria-hidden="true">
          +
        </span>
      </summary>
      <ul className="pb-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <article className="row grid grid-cols-1 gap-x-6 gap-y-2 border-t border-line py-4 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_auto] md:items-center">
              <div>
                <h3 className="text-[15px] font-medium text-foreground">{project.title}</h3>
                <p className={`mt-0.5 font-mono text-[11px] ${/^(Prototype|In progress)/.test(project.tag) ? "text-accent-soft" : "text-muted"}`}>
                  {project.tag}
                </p>
              </div>
              <p className="min-w-0 text-sm leading-6 text-muted">{project.summary}</p>
              <ProjectButtons links={project.links} size="sm" />
            </article>
          </li>
        ))}
      </ul>
    </details>
  );
}
