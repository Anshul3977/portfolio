import { site, skills } from "../../content/site";
import { BlurFade } from "@/components/blur-fade";

const groups: { label: string; items: readonly string[] }[] = [
  { label: "Languages", items: skills.languages },
  { label: "Frameworks", items: skills.frameworks },
  { label: "AI & ML", items: skills.ai },
  { label: "Tools", items: skills.tools },
];

export function About() {
  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <BlurFade className="lg:col-span-6">
        <p className="max-w-xl text-lg leading-8 text-muted">
          I am a {site.degree} student at {site.school} (CGPA {site.cgpa}).
          I build full-stack products around retrieval, scoring, and computer
          vision — and the interfaces that make those systems usable.
        </p>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          Most of that work is in TypeScript and Python, from LangGraph agents
          that have to cite their sources to APIs that have to stay measurable.
        </p>
      </BlurFade>
      <BlurFade delay={0.1} className="lg:col-span-6">
        <div className="grid gap-8 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                {group.label}
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </BlurFade>
    </div>
  );
}
