import { Link, useParams, Navigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ArrowLeft, Globe, Github } from "lucide-react";
import Reveal from "../components/Reveal";
import CaseStudy from "../components/CaseStudy";
import usePageMeta from "../hooks/usePageMeta";
import useProjectStatus from "../hooks/useProjectStatus";
import { projects } from "../data/projects";
import { SITE_URL } from "../data/seo.mjs";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const statuses = useProjectStatus();

  usePageMeta({
    title: project?.title,
    description: project?.description,
    image: project?.image,
    structuredData: project
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: `${SITE_URL}/projects/${project.slug}`,
          sameAs: project.live,
          keywords: project.tech.join(", "),
          author: { "@id": `${SITE_URL}/#person` },
        }
      : undefined,
  });

  if (!project) return <Navigate to="/projects" replace />;

  const status = project.statusId ? statuses[project.statusId] : undefined;
  const study = project.caseStudy;

  return (
    <div className="relative min-h-screen themed-bg themed-text pb-20 md:pb-28 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.svg')]" />
        <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-cyan-600/10 blur-[140px] rounded-full" />
      </div>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-32 sm:pt-40">
        <Reveal>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {status && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    status.up ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                  }`}
                />
                {status.up ? `Live · ${status.ms}ms` : "Offline"}
              </div>
            )}
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full border border-white/10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase mb-6">
            {project.title}
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-6">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-cyan-400 transition-colors"
            >
              <Globe className="w-4 h-4" />
              View_Live
            </a>
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-cyan-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
          </div>
        </Reveal>
      </section>

      {project.image && (
        <section className="relative z-10 max-w-5xl mx-auto px-6 mt-14">
          <Reveal delay={0.1}>
            <div
              className="rounded-2xl md:rounded-3xl border overflow-hidden shadow-2xl"
              style={{ borderColor: "rgba(var(--surface),0.15)" }}
            >
              <img
                src={project.image}
                alt={`${project.title} homepage`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto"
              />
            </div>
          </Reveal>
        </section>
      )}

      {study && (
        <section className="relative z-10 max-w-3xl mx-auto px-6 mt-20">
          <CaseStudy study={study} />
        </section>
      )}

      <section className="relative z-10 max-w-3xl mx-auto px-6 mt-20">
        <Reveal>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-5">
            Stack
          </h2>
          <div className="flex flex-wrap gap-5 items-center">
            {project.tags.map((tag) => (
              <Icon key={tag} icon={tag} className="text-3xl" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground font-light mt-5">
            {project.tech.join(" · ")}
          </p>
        </Reveal>
      </section>
    </div>
  );
};


export default ProjectDetail;
