import Link from "next/link";
import { existsSync } from "node:fs";
import { site, experience, skillGroups } from "../../content/site";
import {
  selectedWork,
  moreWork,
  type CaseStudy,
  type MoreProject,
} from "../../content/projects";
import snapshot from "../../content/github-snapshot.json";
import { LiveControls } from "@/components/live-controls";
import { DemoVideo } from "@/components/demo-video";
import { Reveal } from "@/components/reveal";
import { CopyEmail } from "@/components/copy-email";

function Preview({ project }: { project: CaseStudy | MoreProject }) {
  const base = `/demos/${project.slug}`;
  if (existsSync(`public${base}.webm`))
    return (
      <DemoVideo
        src={base + ".webm"}
        poster={base + ".jpg"}
        alt={`${project.title} live website walkthrough`}
      />
    );
  if (project.slug === "fire-vision")
    return (
      <DemoVideo
        src="/projects/fire-vision.mp4"
        poster="/projects/fire-vision-poster.jpg"
        alt="Fire-Vision sample video analysis"
      />
    );
  return (
    <div className="placeholder">
      <span aria-hidden="true">[ / ]</span>
      <p>{project.title}</p>
      <small>
        {"kind" in project ? project.kind : project.tag} · project overview
      </small>
    </div>
  );
}
function Links({ project }: { project: CaseStudy | MoreProject }) {
  return (
    <div className="project-links">
      {project.links.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
          {link.label === "Live" ? "Live demo" : link.label}{" "}
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
export default function Home() {
  return (
    <div className="portfolio">
      <aside className="identity">
        <div className="identity-top">
          <a className="brand" href="#about" aria-label="AP — Back to about">
            AP<span aria-hidden="true">↗</span>
          </a>
          <span className="mono">PORTFOLIO / 2026</span>
        </div>
        <p className="availability">
          <span />
          Available now · Hyderabad or remote
        </p>
        <h1>
          Anshul
          <br />
          Palarpwar
          <span className="name-dot" aria-hidden="true">
            .
          </span>
        </h1>
        <p className="role">
          Software Engineer,
          <br />
          Backend &amp; AI/ML
        </p>
        <p className="intro">I build the services that put models to work.</p>
        <div className="resume-links">
          <a className="button" href="#projects">
            View projects <span aria-hidden="true">↓</span>
          </a>
          <a href={site.resumes.ai}>AI/ML résumé ↗</a>
          <a href={site.resumes.fullstack}>Full-stack résumé ↗</a>
        </div>
        <LiveControls />
        <div className="identity-bottom">
          <div className="socials">
            <a href={site.links.email}>Email ↗</a>
            <a href={site.links.github}>GitHub ↗</a>
            <a href={site.links.linkedin}>LinkedIn ↗</a>
            <a href={site.links.x}>X ↗</a>
          </div>
          <p>Nagpur, India · Open to Hyderabad &amp; remote</p>
        </div>
      </aside>
      <main id="main">
        <section id="about">
          <p className="eyebrow">
            <span className="signal">●</span> SYSTEM ONLINE / INTRODUCTION
          </p>
          <h2 className="opening">
            Models are only the start.
            <br />
            <em>I build what comes next.</em>
          </h2>
          <p>{site.oneLiner}</p>
          <p>
            I’m a 2026 Computer Science (Data Science) graduate from Ramdeobaba
            University, Nagpur. I like owning a feature end to end — the model,
            the API around it and the screen people use. I mostly write Python
            and TypeScript, and C++ for problem solving.
          </p>
          <div className="proof-strip">
            <div className="award">
              <span aria-hidden="true">↗</span>
              <strong>ETHSanFrancisco 2025 · 1st Prize ($2,000)</strong>
            </div>
            <div>
              <strong>8.3</strong>
              <span>CGPA · B.Tech CSE ’26</span>
            </div>
            <div>
              <strong>600+</strong>
              <span>DSA problems · C++</span>
            </div>
          </div>
        </section>
        <section id="experience">
          <SectionTitle
            number="01"
            title="Experience"
            subtitle="Models, services & the work between."
          />
          {experience.map((role, i) => (
            <Reveal key={role.company}>
              <article
                className="detected experience-card"
                tabIndex={0}
                data-label="experience · 0.98"
              >
                <div className="card-meta">
                  <span>{role.period}</span>
                  <span>{i === 0 ? "CURRENT" : "FREELANCE"}</span>
                </div>
                <h3>
                  {role.company} <span aria-hidden="true">↗</span>
                </h3>
                <p className="job-title">{role.title}</p>
                <p>{role.summary}</p>
                {i === 0 && (
                  <>
                    <div className="impact">
                      <strong>{role.impact.value}</strong>
                      <span>{role.impact.label}</span>
                    </div>
                    <div
                      className="pipeline"
                      aria-label="Pipeline: detect, track, re-identify, pose, activity"
                    >
                      {["Detect", "Track", "Re-ID", "Pose", "Activity"].map(
                        (s) => (
                          <span key={s}>{s}</span>
                        ),
                      )}
                    </div>
                    <ul>
                      {role.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <div className="metrics">
                      {role.metrics?.map((m) => (
                        <span key={m.value}>
                          <strong>{m.value}</strong> {m.label}
                        </span>
                      ))}
                    </div>
                  </>
                )}
                <p className="stack">{role.stack.join(" · ")}</p>
              </article>
            </Reveal>
          ))}
        </section>
        <section id="projects">
          <SectionTitle
            number="02"
            title="Selected projects"
            subtitle="Built to run. Open to inspect."
          />
          <div className="projects">
            {selectedWork.map((project, i) => (
              <Reveal key={project.slug}>
                <article
                  className="detected project-card"
                  data-label="project · 0.97"
                >
                  <div className="project-preview">
                    <Preview project={project} />
                  </div>
                  <div className="project-body">
                    <div className="card-meta">
                      <span>
                        0{i + 1} / {project.kind}
                      </span>
                      <span>{project.featured ? "FEATURED" : "↗"}</span>
                    </div>
                    <h3>
                      <Link href={`/work/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p>{project.summary}</p>
                    <div className="metrics">
                      {(project.cardHighlights ?? project.highlights).map((h) => (
                        <span key={h.value}>
                          <strong>{h.value}</strong> {h.label}
                        </span>
                      ))}
                    </div>
                    {project.slug === "job-fit-rag-agent" && (
                      <p className="note">
                        Synthetic 20-pair evaluation; a personal project, not a
                        hiring tool.
                      </p>
                    )}
                    <p className="stack">{project.stack.join(" · ")}</p>
                    <Links project={project} />
                    <Link className="case-link" href={`/work/${project.slug}`}>
                      Read case study →
                    </Link>
                    {project.note && <p className="note">{project.note}</p>}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="lab">
          <SectionTitle
            number="03"
            title="Lab & other builds"
            subtitle="Smaller experiments. Same curiosity."
          />
          {moreWork.map((project, i) => (
            <article
              className="detected lab-row"
              key={project.slug}
              data-label="build · 0.96"
            >
              <div className="lab-number mono">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <span className="mono">{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                {project.links.some((l) => l.label === "Live") && (
                  <div className="lab-preview">
                    <Preview project={project} />
                  </div>
                )}
                <Links project={project} />
              </div>
            </article>
          ))}
        </section>
        <section id="education">
          <SectionTitle
            number="04"
            title="Foundation"
            subtitle="Education, tools & open source."
          />
          <h3>{site.school}</h3>
          <p>
            {site.degree} · {site.years}
            <br />
            <strong>CGPA 8.3</strong> ·{" "}
            <a href={site.links.codeforces}>600+ DSA problems in C++ ↗</a>
          </p>
          <p>ETHSanFrancisco 2025 · 1st Prize ($2,000)</p>
          <div className="skills">
            {skillGroups.map((g) => (
              <div key={g.label}>
                <h4 className="mono">{g.label}</h4>
                <p>{g.items.join(" · ")}</p>
              </div>
            ))}
          </div>
          <div className="github-proof">
            <h3>
              Code in the open <span aria-hidden="true">↗</span>
            </h3>
            <p>
              {snapshot.totalStars} stars · {snapshot.publicRepos} public
              repositories{" "}
              <span className="note">(snapshot: November 2026)</span>
            </p>
            {selectedWork.slice(0, 3).map((p) => (
              <a
                key={p.slug}
                href={p.links.find((l) => l.label === "GitHub")!.href}
              >
                {p.title} ↗
              </a>
            ))}
          </div>
        </section>
        <section id="contact">
          <SectionTitle
            number="05"
            title="Contact"
            subtitle="Let’s build something useful."
          />
          <h2 className="contact-heading">
            Hiring for backend,
            <br />
            <em>AI/ML or full-stack?</em>
          </h2>
          <p>
            I’m available now, in Hyderabad or remote. Email is the fastest way
            to reach me.
          </p>
          <a className="email" href={site.links.email}>
            {site.email} ↗
          </a>
          <div className="project-links">
            <CopyEmail email={site.email} />
            <a href={site.links.linkedin}>LinkedIn ↗</a>
            <a href={site.resumes.ai}>AI/ML résumé ↗</a>
            <a href={site.resumes.fullstack}>Full-stack résumé ↗</a>
          </div>
        </section>
        <footer>
          <span>© 2026 Anshul Palarpwar</span>
          <a href="#about">Back to top ↑</a>
        </footer>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            jobTitle: site.role,
            url: site.url,
            alumniOf: { "@type": "CollegeOrUniversity", name: site.school },
            sameAs: [site.links.github, site.links.linkedin],
          }),
        }}
      />
    </div>
  );
}
function SectionTitle({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="section-title">
      <div className="eyebrow">
        <span>
          {number} / {title}
        </span>
        <span className="rule" />
      </div>
      <h2>{subtitle}</h2>
    </header>
  );
}
