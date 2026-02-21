import { motion } from "framer-motion";
import { Star, GitFork, Code2, Activity } from "lucide-react";
import Reveal from "../components/Reveal";

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

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-sm text-muted-foreground mb-6 tracking-widest uppercase"
          >
            Software Engineer
          </motion.p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
            <span className="text-gradient">Building the</span>
            <br />
            <span className="text-foreground">future of web.</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Full-stack engineer crafting performant, elegant digital experiences.
            Focused on TypeScript, distributed systems, and developer tooling.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 justify-center"
          >
            <a
              href="/projects"
              className="px-8 py-3 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-colors"
            >
              View Work
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border border-border rounded-xl font-medium text-foreground hover:bg-accent transition-colors"
            >
              Contact
            </a>
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
    </div>
  );
};

export default Index;
