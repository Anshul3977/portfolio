import { site } from "../../content/site";
import { BlurFade } from "@/components/blur-fade";
import { Magnet } from "@/components/magnet";
import { CopyEmail } from "@/components/copy-email";

const contacts = [
  { label: "GitHub", href: site.links.github, value: site.links.githubHandle },
  { label: "LinkedIn", href: site.links.linkedin, value: "anshul-palarpwar" },
  { label: "X", href: site.links.x, value: site.links.xHandle },
  { label: "Codeforces", href: site.links.codeforces, value: site.links.codeforcesHandle },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_100%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_70%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 lg:py-36">
        <BlurFade>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading" className="mt-6 max-w-full font-serif text-[clamp(2.6rem,10vw,8.5rem)] leading-[0.88] tracking-tight">
            Hiring for AI
            <br />
            <span className="italic text-accent-soft">or full-stack?</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
            I&apos;m open to AI engineering and full-stack roles. Email is the fastest way to reach me.
          </p>
        </BlurFade>

        <BlurFade delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnet>
              <a href={site.links.email} className="btn-primary max-w-full px-6! py-3.5! text-center text-base! break-all">
                {site.email}
              </a>
            </Magnet>
            <CopyEmail email={site.email} />
            <a href={site.resumes.ai} target="_blank" rel="noopener" className="btn-ghost">
              Download resume
            </a>
          </div>
        </BlurFade>

        <BlurFade delay={0.15}>
          <ul className="mt-16 grid grid-cols-2 border-t border-line sm:grid-cols-4">
            {contacts.map((item, i) => (
              <li key={item.label} className={`${i % 2 ? "border-l" : ""} ${i === 2 ? "sm:border-l" : ""} ${i >= 2 ? "max-sm:border-t" : ""} border-line`}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block min-h-12 px-4 py-6 transition-colors hover:bg-elevated sm:px-6"
                >
                  <span className="font-mono text-xs text-muted">{item.label}</span>
                  <span className="mt-2 flex items-center justify-between gap-2 truncate text-foreground transition-colors group-hover:text-accent-soft">
                    {item.value}
                    <span aria-hidden="true" className="text-accent">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </BlurFade>
      </div>
    </section>
  );
}
