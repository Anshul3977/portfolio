import type { ProjectLink } from "../../content/projects";

export function ProjectLinks({ links }: { links: ProjectLink[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-soft"
          >
            {link.label}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
