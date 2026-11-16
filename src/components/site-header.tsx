import { site } from "../../content/site";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="font-serif text-lg tracking-tight text-foreground"
        >
          <span className="sm:hidden">{site.shortName}</span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-5">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2 py-1 text-xs font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground sm:text-[11px]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.links.email}
            className="hidden text-[11px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-soft sm:inline"
          >
            Email
          </a>
        </nav>
      </div>
    </header>
  );
}
