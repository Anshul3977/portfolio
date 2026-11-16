import { moreWork, selectedWork } from "../../content/projects";
import { About } from "@/components/about";
import { CaseStudy } from "@/components/case-study";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { MoreWork } from "@/components/more-work";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <section
          id="work"
          aria-labelledby="work-heading"
          className="mx-auto w-full max-w-6xl px-5 sm:px-8"
        >
          <div className="flex items-end justify-between gap-4 pt-6">
            <h2
              id="work-heading"
              className="font-serif text-3xl tracking-tight sm:text-4xl"
            >
              Selected work
            </h2>
            <p className="hidden text-[11px] uppercase tracking-[0.18em] text-muted sm:block">
              Five case studies
            </p>
          </div>
          <div>
            {selectedWork.map((project) => (
              <CaseStudy key={project.slug} project={project} />
            ))}
          </div>
        </section>
        <section
          aria-labelledby="more-heading"
          className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8"
        >
          <h2
            id="more-heading"
            className="mb-8 font-serif text-3xl tracking-tight sm:text-4xl"
          >
            More work
          </h2>
          <MoreWork projects={moreWork} />
        </section>
        <section
          id="about"
          aria-labelledby="about-heading"
          className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8"
        >
          <h2
            id="about-heading"
            className="mb-10 font-serif text-3xl tracking-tight sm:text-4xl"
          >
            About
          </h2>
          <About />
        </section>
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8"
        >
          <h2
            id="contact-heading"
            className="mb-8 font-serif text-3xl tracking-tight sm:text-4xl"
          >
            Contact
          </h2>
          <Contact />
          {/*
            Future: "ask my portfolio" AI box.
            Intended slot: a compact question field in this contact section
            that answers from the project data on this page.
            Do not build or show this in v1.
          */}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
