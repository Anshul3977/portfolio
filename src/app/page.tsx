import { moreWork, selectedWork } from "../../content/projects";
import { About } from "@/components/about";
import { CaseStudy } from "@/components/case-study";
import { CommandPalette } from "@/components/command-palette";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { GitHubSection } from "@/components/github-section";
import { Hero } from "@/components/hero";
import { MetricsBand } from "@/components/metrics-band";
import { MoreWork } from "@/components/more-work";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TargetCursor } from "@/components/target-cursor";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <MetricsBand />
        <Experience />
        <section id="work" aria-labelledby="work-heading" className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8">
          <SectionHeading
            id="work-heading"
            index="02"
            kicker="Selected work"
            aside={<p className="eyebrow">{selectedWork.length} case studies</p>}
          >
            Projects I built, <span className="italic text-accent-soft">with the numbers.</span>
          </SectionHeading>
          <div className="mt-12">
            {selectedWork.map((project, i) => (
              <CaseStudy key={project.slug} project={project} flip={i % 2 === 1} />
            ))}
          </div>
        </section>
        <section aria-labelledby="more-heading" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <SectionHeading id="more-heading" index="03" kicker="More work">
            More projects: <span className="italic text-accent-soft">backends, tools, prototypes.</span>
          </SectionHeading>
          <div className="mt-12">
            <MoreWork projects={moreWork} />
          </div>
        </section>
        <GitHubSection />
        <About />
        <Contact />
      </main>
      <SiteFooter />
      <CommandPalette />
      <TargetCursor />
    </>
  );
}
