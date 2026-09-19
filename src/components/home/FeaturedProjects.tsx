import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import { projects } from "../../data/projects";
import useProjectStatus from "../../hooks/useProjectStatus";

const FeaturedProjects = () => {
  const statuses = useProjectStatus();
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section
      className="relative z-10 max-w-[1400px] mx-auto border-t py-20 md:py-32"
      style={{ borderColor: "rgba(var(--surface),0.1)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-16">
          <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
            // Selected Work
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[1.0] uppercase">
              Recent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground italic">
                Projects.
              </span>
            </h2>
            <Link
              to="/projects"
              className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
            >
              All Projects
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => {
            const status = project.statusId ? statuses[project.statusId] : undefined;

            return (
              <Reveal key={project.slug} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="h-full">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group flex flex-col h-full rounded-[2rem] border overflow-hidden backdrop-blur-sm transition-colors hover:border-cyan-500/40"
                    style={{
                      borderColor: "rgba(var(--surface),0.1)",
                      background: "rgba(var(--surface),0.03)",
                    }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon
                            icon={project.tags[0]}
                            className={`text-6xl opacity-30 ${project.accent}`}
                          />
                        </div>
                      )}

                      {status && (
                        <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-md font-mono text-[9px] uppercase tracking-widest text-white/80">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              status.up ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                            }`}
                          />
                          {status.up ? "Live" : "Offline"}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-3 mb-5">
                        {project.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 2).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-full border border-white/10 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
