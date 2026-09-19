import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { ExternalLink, Github, Globe, Code2 } from "lucide-react";
import Reveal from "../components/Reveal";
import usePageMeta from "../hooks/usePageMeta";
import { projects } from "../data/projects";

const Projects = () => {
  usePageMeta({
    title: "Selected Engineering Works",
    description:
      "Selected projects by Ritik Shah, including a cloud-kitchen commerce platform and this portfolio - built with Next.js, React, Tailwind CSS and Flutter.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Selected Engineering Works",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: project.live,
          author: {
            "@id": "https://ritikshah-portfolio.netlify.app/#person",
          },
          keywords: project.tech.join(", "),
        },
      })),
    },
  });
  return (
    <div className="relative min-h-screen themed-bg themed-text selection:bg-cyan-500 pb-20 md:pb-28 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.svg')]" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[70%] h-[70%] bg-cyan-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-[-10%] -right-[5%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full" />
      </div>

      <section className="relative z-10 max-w-[1400px] mx-auto pt-32 sm:pt-40 pb-16 md:pb-20 border-b" style={{ borderColor: 'rgba(var(--surface),0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-0">
          <Reveal>
            <p className="font-mono text-[9px] sm:text-[10px] text-cyan-400 tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6 md:mb-8">
              // Selected_Works_2026
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter leading-[1.0] sm:leading-[0.85] mb-8 uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-cyan-400/50">
                ENGINEERING
              </span>{" "}
              <br />
              <span className="inline-block py-1 sm:py-2 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground italic">
                REAL-WORLD IMPACT.
              </span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              A curated collection of systems and interfaces built with focus on
              <span className="text-cyan-400 font-normal"> performance</span>,
              scalability, and technical SEO.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 py-12 md:py-24 max-w-7xl mx-auto px-6 lg:px-0">
        <div className=" space-y-20 md:space-y-32">
          {projects
            .filter((p) => p.featured)
            .map((project, i) => (
              <Reveal key={project.title} delay={i * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center group">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative aspect-video rounded-2xl md:rounded-3xl border overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-cyan-500/40"
                    style={{ borderColor: 'rgba(var(--surface),0.15)', background: 'rgba(var(--surface),0.03)' }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-8 border-b flex items-center px-4 gap-1.5 backdrop-blur-md z-20" style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.05)' }}>
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                      <div className="ml-4 px-3 py-1 rounded-md text-[9px] font-mono text-muted-foreground uppercase tracking-widest" style={{ background: 'rgba(var(--surface),0.05)' }}>
                        {project.title.replace(/\s+/g, "_").toLowerCase()}.sh
                      </div>
                    </div>

                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr ${project.color} to-transparent z-10`}
                    />

                    {project.image ? (
                      <div className="absolute inset-0 pt-8 overflow-hidden">
                        <img
                          src={project.image}
                          alt={`${project.title} homepage`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center pt-8 pointer-events-none">
                        <Icon
                          icon={project.tags[0]}
                          className={`absolute text-7xl md:text-9xl opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-1000 ${project.accent}`}
                        />
                        <Icon
                          icon={project.tags[0]}
                          className={`relative text-6xl md:text-8xl opacity-20 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 ${project.accent}`}
                        />
                      </div>
                    )}
                  </motion.div>

                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 ${project.accent} font-mono text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.1)]`}
                      >
                        Featured Project
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground group-hover:translate-x-2 transition-transform duration-500">
                      {project.title}
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light group-hover:text-foreground/90 transition-colors">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-4 md:gap-6 pt-2">
                      {project.tags.map((tag) => (
                        <Icon
                          key={tag}
                          icon={tag}
                          className="text-xl md:text-2xl grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all hover:scale-125"
                        />
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-8 pt-4">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs md:text-sm font-mono text-muted-foreground hover:text-cyan-400 transition-colors group/link"
                      >
                        <Globe className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
                        View_Live
                      </a>
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs md:text-sm font-mono text-muted-foreground hover:text-cyan-400 transition-colors group/link"
                      >
                        <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                        Source_Code
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
        </div>
      </section>

      <section className="relative z-10 py-16 md:py-24 max-w-[1400px] mx-auto border-t" style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.01)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-0">
          <Reveal className="mb-16 text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-4">
              The <span className="text-muted-foreground italic">Archive</span>
            </h2>
            <p className="text-cyan-400/80 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
              // Experimental & Minor Deployments
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((p) => !p.featured)
              .map((project, i) => (
                <Reveal key={project.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-8 border backdrop-blur-md rounded-[2rem] h-full hover:border-cyan-500/30 transition-all group flex flex-col relative overflow-hidden"
                    style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.03)' }}
                  >
                    <div
                      className={`absolute -top-10 -right-10 w-24 h-24 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${project.color} pointer-events-none`}
                    />

                    <div className="flex justify-between items-start mb-12 relative z-10">
                      <div className="p-4 rounded-2xl border group-hover:border-cyan-500/40 transition-all" style={{ background: 'rgba(var(--surface),0.05)', borderColor: 'rgba(var(--surface),0.1)' }}>
                        <Code2
                          className={`w-6 h-6 text-muted-foreground group-hover:${project.accent} transition-colors`}
                        />
                      </div>
                      <div className="flex gap-4">
                        <a
                          href={project.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold mb-4 tracking-tight text-foreground group-hover:text-cyan-100 transition-colors uppercase">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-light line-clamp-3 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 relative z-10">
                      {project.tech?.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[9px] px-3 py-1.5 rounded-lg border text-muted-foreground group-hover:text-cyan-300 group-hover:border-cyan-500/20 transition-all uppercase"
                          style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.05)' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <footer className="mt-20 text-center text-[10px] font-mono text-muted-foreground uppercase tracking-[0.5em] relative z-10">
        © 2026 Ritik Shah — Portfolio_v2.sh
      </footer>
    </div>
  );
};

export default Projects;
