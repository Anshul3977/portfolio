import { moreWork, selectedWork } from "../../content/projects";
import { CaseStudy } from "@/components/case-study";
import { CommandPalette } from "@/components/command-palette";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Resume } from "@/components/resume";
import { GitHubSection } from "@/components/github-section";
import { Hero } from "@/components/hero";
import { MoreWork } from "@/components/more-work";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Experience />
        <section id="work" aria-labelledby="work-heading" className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8">
          <SectionHeading id="work-heading" kicker="Projects">
            Things I&apos;ve built
          </SectionHeading>
          <div className="mt-10">
            {selectedWork.map((project, i) => (
              <CaseStudy key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>
        <section aria-labelledby="more-heading" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <SectionHeading id="more-heading" kicker="More projects">
            Smaller builds
          </SectionHeading>
          <div className="mt-10">
            <MoreWork projects={moreWork} />
          </div>
        </section>
        <Resume />
        <GitHubSection />
        <Contact />
      </main>
      <SiteFooter />
      <CommandPalette />
    </>
  );
}
