import { motion } from "framer-motion";
import { Star, GitFork, Code2, Activity, ArrowRight, Sparkles, Target, Zap, Layers } from "lucide-react";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";

const stats = [
  { label: "Repositories", value: "42+", icon: Code2 },
  { label: "Stars Earned", value: "180+", icon: Star },
  { label: "Contributions", value: "1,200+", icon: Activity },
  { label: "Forks", value: "65+", icon: GitFork },
];

const topLanguages = [
  { name: "TypeScript", pct: 40, color: "bg-blue-400" },
  { name: "Python", pct: 25, color: "bg-yellow-400" },
  { name: "Go", pct: 15, color: "bg-cyan-400" },
  { name: "Rust", pct: 10, color: "bg-orange-400" },
  { name: "Other", pct: 10, color: "bg-muted-foreground" },
];

const techStack = [
  { name: "Figma", icon: "🎨" },
  { name: "Android", icon: "📱" },
  { name: "Flutter", icon: "🦋" },
  { name: "WordPress", icon: "🌐" },
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Node.js", icon: "🟢" },
  { name: "Tailwind CSS", icon: "💨" },
];

const services = [
  {
    icon: Layers,
    title: "Frontend Development",
    description: "Pixel-perfect, responsive interfaces built with React, Next.js, and modern CSS frameworks. Focused on performance and accessibility.",
  },
  {
    icon: Zap,
    title: "Mobile Development",
    description: "Cross-platform mobile applications using Flutter and React Native. Native-like performance with a single codebase.",
  },
  {
    icon: Target,
    title: "UI/UX Design",
    description: "User-centered design with Figma. From wireframes to high-fidelity prototypes, creating intuitive digital experiences.",
  },
  {
    icon: Sparkles,
    title: "Full-Stack Solutions",
    description: "End-to-end web applications with robust backends, APIs, databases, and cloud deployments. Scalable architecture from day one.",
  },
];

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden pb-28">
      {/* Background effects */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-foreground/[0.02] blur-3xl" />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-sm text-muted-foreground">Available for work</span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-4">
            <span className="text-gradient">Software Engineer</span>
            <br />
            <span className="text-foreground">&amp; Frontend Developer</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            I design and build high-performance web and mobile applications that solve real-world problems.
            With expertise in React, Flutter, and modern design systems, I transform complex requirements
            into elegant, scalable solutions — from pixel-perfect frontends to robust full-stack architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/projects"
              className="group px-8 py-3 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-border rounded-xl font-medium text-foreground hover:bg-accent transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-border" />

      {/* What I Do */}
      <section className="py-24 px-6">
        <Reveal className="text-center mb-16">
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4">
            Services
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">What I Do</h2>
        </Reveal>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 h-full group hover:bg-accent/50 hover:border-foreground/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-foreground/10 transition-colors">
                    <Icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-border" />

      {/* Tech Stack */}
      <section className="py-24 px-6">
        <Reveal className="text-center mb-16">
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4">
            Technologies
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">Tech Stack</h2>
        </Reveal>

        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {techStack.map((tech, i) => (
            <Reveal key={tech.name} delay={i * 0.05}>
              <div className="glass rounded-2xl p-6 text-center group hover:bg-accent/50 hover:border-foreground/20 hover:scale-105 transition-all duration-300 cursor-default">
                <span className="text-4xl block mb-3">{tech.icon}</span>
                <p className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {tech.name}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-border" />

      {/* GitHub Stats */}
      <section className="py-24 px-6">
        <Reveal className="text-center mb-16">
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4">
            Open Source
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">GitHub Stats</h2>
        </Reveal>

        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 text-center group hover:bg-accent/50 transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground mx-auto mb-3 group-hover:text-foreground transition-colors" />
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="font-mono text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Languages Bar */}
        <Reveal delay={0.3} className="max-w-2xl mx-auto mt-12">
          <div className="glass rounded-2xl p-6">
            <p className="font-mono text-xs text-muted-foreground mb-4">Top Languages</p>
            <div className="flex rounded-full overflow-hidden h-3 gap-0.5">
              {topLanguages.map((lang) => (
                <div
                  key={lang.name}
                  className={`${lang.color} rounded-full`}
                  style={{ width: `${lang.pct}%` }}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${lang.color}`} />
                  <span className="font-mono text-xs text-muted-foreground">
                    {lang.name} {lang.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-border" />

      {/* CTA */}
      <section className="py-24 px-6">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Let's build something <span className="text-gradient">amazing</span> together.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Whether you have a project idea, need a technical partner, or just want to connect — I'd love to hear from you.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-colors"
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default Index;
