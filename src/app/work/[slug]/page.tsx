import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { selectedWork } from "../../../../content/projects";
export function generateStaticParams() {
  return selectedWork.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = selectedWork.find((p) => p.slug === slug);
  return {
    title: project?.title,
    description: project?.summary,
    alternates: { canonical: `/work/${slug}` },
  };
}
export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = selectedWork.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main id="main" className="case-page">
      <Link className="back" href="/#projects">
        ← All projects
      </Link>
      <p className="eyebrow" style={{ marginTop: 40 }}>
        {p.kind} / CASE STUDY
      </p>
      <h1>{p.title}</h1>
      <p>{p.summary}</p>
      {p.image && (
        <Image
          src={p.image.src}
          alt={p.image.alt}
          width={1280}
          height={720}
          sizes="(max-width: 780px) 100vw, 730px"
          style={{ width: "100%", height: "auto", marginTop: 20 }}
        />
      )}
      <section>
        <h2>Problem</h2>
        <p>{p.details?.problem}</p>
      </section>
      <section>
        <h2>What I built</h2>
        <p>{p.details?.built}</p>
        <ul>
          {p.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="stack">{p.stack.join(" · ")}</p>
      </section>
      <section>
        <h2>Result &amp; limitations</h2>
        <p>{p.details?.outcome}</p>
        <div className="metrics">
          {p.highlights.map((h) => (
            <span key={h.value}>
              <strong>{h.value}</strong> {h.label}
            </span>
          ))}
        </div>
        {p.note && <p>{p.note}</p>}
      </section>
      <div className="project-links">
        {p.links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label} ↗
          </a>
        ))}
      </div>
    </main>
  );
}
