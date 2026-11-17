import { projectLinks, type MoreProject } from "../../content/projects";
import { ProjectButtons } from "@/components/project-buttons";

export function InProgress({ project }: { project: MoreProject }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-dashed border-line px-5 py-4">
      <span className="flex items-center gap-2 font-mono text-xs text-accent-soft">
        <span aria-hidden="true" className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
        {project.tag}
      </span>
      <p className="order-last w-full min-w-0 text-base text-foreground/80 sm:order-none sm:w-auto sm:flex-1">
        <span className="font-medium text-foreground">{project.title}</span>
        <span className="text-muted"> — {project.summary}</span>
      </p>
      <ProjectButtons links={projectLinks(project)} size="sm" />
    </div>
  );
}

export function MoreWork({ projects }: { projects: MoreProject[] }) {
  return (
    <details className="more-projects group border-y border-line">
      <summary className="flex cursor-pointer select-none items-center justify-between gap-4 py-5">
        <span className="min-w-0">
          <span className="font-serif text-3xl leading-none tracking-tight">More projects</span>
          <span className="mt-1 block font-mono text-xs text-muted sm:mt-0 sm:ml-3 sm:inline">{projects.length} smaller builds</span>
        </span>
        <span className="chev inline-grid h-12 w-12 place-items-center rounded-full border border-line text-lg leading-none text-accent-soft" aria-hidden="true">
          +
        </span>
      </summary>
      <ul className="pb-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <article id={project.slug} className="row grid grid-cols-1 gap-x-6 gap-y-2 border-t border-line py-4 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_auto] md:items-center">
              <div>
                <h3 className="text-base font-medium text-foreground">{project.title}</h3>
                <p className={`mt-0.5 font-mono text-xs ${/^(Prototype|In progress)/.test(project.tag) ? "text-accent-soft" : "text-muted"}`}>
                  {project.tag}
                </p>
              </div>
              <p className="min-w-0 text-base leading-7 text-muted">{project.summary}</p>
              <div className="min-w-0">
                <ProjectButtons links={projectLinks(project)} size="sm" />
                {project.note && <p className="mt-2 max-w-xs text-xs leading-5 text-muted">{project.note}</p>}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </details>
  );
}
