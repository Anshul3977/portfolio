import { inProgress, moreWork, selectedWork } from "../../content/projects";
import { BlurFade } from "@/components/blur-fade";
import { FeaturedCard } from "@/components/featured-card";
import { CommandPalette } from "@/components/command-palette";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Resume } from "@/components/resume";
import { GitHubSection } from "@/components/github-section";
import { Hero } from "@/components/hero";
import { InProgress, MoreWork } from "@/components/more-work";
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
        <section id="work" aria-labelledby="work-heading" className="mx-auto w-full max-w-6xl px-5 pb-20 pt-4 sm:px-8">
          <SectionHeading id="work-heading" kicker="Projects">
            Things I&apos;ve built
          </SectionHeading>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {selectedWork.map((project, i) => (
              <BlurFade key={project.slug} delay={(i % 2) * 0.06} className="min-w-0">
                <FeaturedCard project={project} index={i} />
              </BlurFade>
            ))}
          </div>
          <BlurFade className="mt-5">
            <InProgress project={inProgress} />
          </BlurFade>
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
