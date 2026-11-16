import type { ProjectLink } from "../../content/projects";

const LABEL: Record<ProjectLink["label"], string> = { Live: "Live demo", GitHub: "GitHub", API: "API" };

/** "Live demo" first and filled; "GitHub" as an outline button. */
export function ProjectButtons({ links, size = "md" }: { links: ProjectLink[]; size?: "sm" | "md" }) {
  const ordered = [...links].sort((a, b) => (a.label === "Live" ? -1 : b.label === "Live" ? 1 : 0));
  const pad = size === "sm" ? "px-3.5 py-1.5 text-[13px]" : "px-4 py-2 text-sm";
  return (
    <div className="flex flex-wrap gap-2">
      {ordered.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-link group ${link.label === "Live" ? "is-live" : ""} ${pad}`}
        >
          {LABEL[link.label]}
          <span aria-hidden="true" className="btn-link-arrow">
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}
