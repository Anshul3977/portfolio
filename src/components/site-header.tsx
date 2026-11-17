import { site } from "../../content/site";
import { PaletteButton } from "@/components/command-palette";

const nav = [
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Projects" },
  { href: "#resume", label: "Resume" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="header-in sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-8">
        <a href="#top" className="group flex min-h-12 min-w-12 items-center gap-2.5">
          <span aria-hidden="true" className="brackets grid size-8 place-items-center font-serif text-lg text-accent [--l:6px]">
            A
          </span>
          <span className="sr-only font-serif text-lg text-foreground sm:not-sr-only">{site.name}</span>
        </a>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav-link inline-flex min-h-12 items-center px-3 text-sm text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#work"
            className="inline-flex min-h-12 items-center px-3 text-sm text-muted transition-colors hover:text-foreground lg:hidden"
          >
            Projects
          </a>
          <a
            href={site.resumes.ai}
            target="_blank"
            rel="noopener"
            className="ml-1 inline-flex min-h-12 items-center rounded-full bg-accent px-3.5 text-sm font-medium text-[#1a1208] transition-colors hover:bg-accent-soft"
          >
            Resume
          </a>
          <PaletteButton className="ml-1 inline-flex min-h-12 min-w-12 items-center justify-center gap-1.5 rounded-full border border-line px-3 font-mono text-xs text-muted transition-colors hover:text-foreground">
            <span className="hidden sm:inline">⌘K</span>
            <span className="sm:hidden">Menu</span>
          </PaletteButton>
        </nav>
      </div>
    </header>
  );
}
