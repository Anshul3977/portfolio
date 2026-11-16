import { site } from "../../content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-serif text-foreground">{site.name}</p>
        <p>Built as a dark editorial Next.js site. Hosted on Vercel.</p>
      </div>
    </footer>
  );
}
