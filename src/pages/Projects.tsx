import { ExternalLink, Github } from "lucide-react";
import Reveal from "../components/Reveal";

const projects = [
  {
    title: "DevSync",
    description: "Real-time collaborative code editor with multiplayer cursors, built on CRDTs and WebSocket architecture. Supports syntax highlighting for 30+ languages with sub-50ms latency.",
    tags: ["TypeScript", "React", "WebSocket", "Rust"],
    live: "#",
    source: "#",
    featured: true,
  },
  {
    title: "InfraWatch",
    description: "Cloud infrastructure monitoring dashboard with real-time metrics, alerting, and cost optimization insights. Reduced client AWS spend by 35% through intelligent resource recommendations.",
    tags: ["Go", "React", "PostgreSQL", "Docker"],
    live: "#",
    source: "#",
    featured: true,
  },
  {
    title: "Pipestream",
    description: "Visual CI/CD pipeline builder with drag-and-drop workflow design and GitHub Actions integration. Used by 2,000+ developers for streamlined deployment workflows.",
    tags: ["TypeScript", "Next.js", "GraphQL", "Redis"],
    live: "#",
    source: "#",
  },
  {
    title: "CacheForge",
    description: "High-performance distributed caching layer with consistent hashing and automatic failover. Handles 100K+ requests per second with 99.99% uptime.",
    tags: ["Rust", "Redis", "gRPC", "Kubernetes"],
    live: "#",
    source: "#",
  },
  {
    title: "QueryLab",
    description: "Interactive SQL playground with AI-powered query suggestions, schema visualization, and performance analysis. Makes database exploration intuitive for teams of all sizes.",
    tags: ["Python", "React", "PostgreSQL", "OpenAI"],
    live: "#",
    source: "#",
  },
  {
    title: "Stacklog",
    description: "Structured logging and distributed tracing toolkit for microservices with OpenTelemetry support. Provides end-to-end visibility across complex service meshes.",
    tags: ["Go", "TypeScript", "OTEL", "Grafana"],
    live: "#",
    source: "#",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen pb-28">
      <section className="px-6 pt-16 pb-16">
        <Reveal className="max-w-6xl mx-auto">
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4">
            Projects
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            Selected work.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A curated collection of projects that showcase my expertise in building performant,
            scalable applications. Each project represents a unique challenge and solution.
          </p>
        </Reveal>
      </section>

      <div className="w-full h-px bg-border" />

      {/* Featured Projects */}
      <section className="py-20 px-6">
        <Reveal className="max-w-7xl mx-auto mb-12">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Featured</p>
        </Reveal>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-4 mb-12">
          {projects.filter(p => p.featured).map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1}>
              <div className="glass rounded-2xl overflow-hidden group hover:border-foreground/20 transition-colors h-full flex flex-col">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="font-mono text-xs text-muted-foreground ml-2">
                    {project.title.toLowerCase()}.dev
                  </span>
                </div>
                <div className="w-full aspect-[16/9] bg-accent/50 flex items-center justify-center">
                  <span className="font-mono text-sm text-muted-foreground">Project Preview</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-accent text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={project.live} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> Live
                    </a>
                    <a href={project.source} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                      <Github className="w-3.5 h-3.5" /> Source
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Other Projects */}
        <Reveal className="max-w-7xl mx-auto mb-8">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">All Projects</p>
        </Reveal>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.filter(p => !p.featured).map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <div className="glass rounded-2xl overflow-hidden group hover:border-foreground/20 transition-colors h-full flex flex-col">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="font-mono text-xs text-muted-foreground ml-2">{project.title.toLowerCase()}.dev</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-accent text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={project.live} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> Live
                    </a>
                    <a href={project.source} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                      <Github className="w-3.5 h-3.5" /> Source
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
