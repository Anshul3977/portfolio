import { site } from "../../content/site";
import { PaletteButton } from "@/components/command-palette";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#github", label: "GitHub" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
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
                  className="px-2.5 py-1 font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#work"
            className="px-2.5 py-1 font-mono text-[11px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-foreground lg:hidden"
          >
            Work
          </a>
          <a
            href={site.resumes.ai}
            target="_blank"
            rel="noopener"
            className="ml-1 rounded-full bg-accent px-3.5 py-1.5 text-[12px] font-medium text-[#1a1208] transition-colors hover:bg-accent-soft"
          >
            Resume
          </a>
          <PaletteButton className="ml-1 flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:text-foreground">
            <span className="hidden sm:inline">⌘K</span>
            <span className="sm:hidden">Menu</span>
          </PaletteButton>
        </nav>
      </div>
    </header>
  );
}
