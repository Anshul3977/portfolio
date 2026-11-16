import { site } from "../../content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 font-mono text-[11px] tracking-wide text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          <span className="font-serif text-base tracking-normal text-foreground">{site.name}</span> · {site.location}
        </p>
        <p>Next.js on Vercel · press ⌘K anywhere</p>
      </div>
    </footer>
  );
}
