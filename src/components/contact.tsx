import { site } from "../../content/site";
import { BlurFade } from "@/components/blur-fade";
import { Magnet } from "@/components/magnet";

const contacts = [
  { label: "Email", href: site.links.email, value: site.email },
  { label: "LinkedIn", href: site.links.linkedin, value: "anshul-palarpwar" },
  { label: "GitHub", href: site.links.github, value: "Anshul3977" },
  { label: "X", href: site.links.x, value: site.links.xHandle },
  { label: "Codeforces", href: site.links.codeforces, value: site.links.codeforcesHandle },
];

export function Contact() {
  return (
    <BlurFade>
      <p className="max-w-xl text-lg leading-8 text-muted">
        The fastest way to reach me is email.
      </p>
      <div className="mt-8">
        <Magnet>
          <a href={site.links.email} className="btn-primary">
            {site.email}
          </a>
        </Magnet>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {contacts.map((item) => (
          <li key={item.label}>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              {item.label}
            </p>
            <a
              href={item.href}
              className="mt-1 inline-block text-foreground transition-colors hover:text-accent"
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </BlurFade>
  );
}
