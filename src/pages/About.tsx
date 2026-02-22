import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  Music,
  ExternalLink,
  MapPin,
  Calendar,
  Coffee,
  BookOpen,
  Cpu,
} from "lucide-react";
import Reveal from "../components/Reveal";

const highlights = [
  {
    icon: MapPin,
    label: "Based in",
    value: "Nagpur, India",
    color: "text-blue-400",
    bg: "group-hover:bg-blue-500/10",
  },
  {
    icon: Calendar,
    label: "Experience",
    value: "3+ Years",
    color: "text-purple-400",
    bg: "group-hover:bg-purple-500/10",
  },
  {
    icon: Coffee,
    label: "Projects",
    value: "25+ Live",
    color: "text-emerald-400",
    bg: "group-hover:bg-emerald-500/10",
  },
  {
    icon: BookOpen,
    label: "Status",
    value: "Lifelong Learner",
    color: "text-yellow-400",
    bg: "group-hover:bg-yellow-500/10",
  },
];

const skills = [
  {
    category: "Frontend Architecture",
    icon: "logos:react",
    items: [
      "React 19",
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    accent: "group-hover:border-blue-500/50",
    glow: "bg-blue-500/5",
  },
  {
    category: "Mobile Systems",
    icon: "logos:flutter",
    items: ["Flutter", "Android (Kotlin)", "React Native", "Dart"],
    accent: "group-hover:border-emerald-500/50",
    glow: "bg-emerald-500/5",
  },
  {
    category: "Engineering Tools",
    icon: "logos:visual-studio-code",
    items: ["Monorepos", "Git", "Docker", "Figma", "Appwrite"],
    accent: "group-hover:border-purple-500/50",
    glow: "bg-purple-500/5",
  },
  {
    category: "Specialized",
    icon: "logos:google-search-console",
    items: ["Technical SEO", "WordPress", "System Design", "UI/UX"],
    accent: "group-hover:border-yellow-500/50",
    glow: "bg-yellow-500/5",
  },
];

const About = () => {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-blue-500 selection:text-white pb-20 md:pb-28 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] rounded-full" />
      </div>

      <section className="relative z-10 px-4 md:px-6 pt-32 md:pt-32 pb-16 md:pb-20 border-b border-white/10">
        <Reveal className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] text-blue-400 tracking-[0.3em] uppercase mb-8">
            // The Engineer
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.85] mb-8 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-400/50">
              ENGINEER, BUILDER,
            </span>{" "}
            <br />
            <span className="inline-block py-2 text-transparent bg-clip-text bg-gradient-to-b from-white/60 to-white/10 italic">
              LIFELONG LEARNER.
            </span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-white/70 font-light leading-relaxed">
            I am <span className="text-white font-medium">Ritik Shah</span>, a
            software engineer based in Nagpur specialized in building{" "}
            <span className="text-blue-400">performant web applications</span>,
            scalable monorepo architectures, and high-efficacy technical SEO
            systems.
          </p>
        </Reveal>
      </section>

      <section className="relative z-10 py-12 md:py-16 px-4 md:px-6 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => {
            const IconComp = h.icon;
            return (
              <Reveal key={h.label} delay={i * 0.1}>
                <div
                  className={`p-6 md:p-8 border border-white/10 bg-white/[0.03] backdrop-blur-md rounded-2xl md:rounded-3xl group hover:border-white/30 transition-all ${h.bg}`}
                >
                  <IconComp
                    className={`w-5 h-5 mb-4 group-hover:scale-110 transition-all ${h.color}`}
                  />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
                    {h.label}
                  </p>
                  <p className="text-lg md:text-xl font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
                    {h.value}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-white/60 font-light leading-relaxed">
              <p>
                I'm <span className="text-white font-medium">Ritik Shah</span>,
                a software engineer with a deep passion for building scalable
                systems that bridge the gap between technical excellence and
                thoughtful design. Based in
                <span className="text-blue-400 font-normal"> Nagpur</span>, I've
                spent the last few years mastering the modern web stack.
              </p>
              <p>
                I specialize in{" "}
                <span className="text-white font-medium border-b border-blue-500/30">
                  Frontend Architecture
                </span>
                , specifically focusing on the React/Next.js ecosystem. I build
                with a{" "}
                <span className="text-emerald-400/80">"Performance-First"</span>{" "}
                mindset.
              </p>
              <p>
                My experience spans across technical SEO for international firms
                and crafting pixel-perfect UIs for high-growth startups. I
                believe great software is about creating
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 italic font-medium ml-1">
                  delightful digital experiences.
                </span>
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.2}>
              <div className="p-6 md:p-8 border border-white/10 bg-white/[0.03] rounded-3xl md:rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#1DB954]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex items-center gap-3 mb-8">
                  <Icon
                    icon="line-md:spotify-loop"
                    className="text-2xl text-[#1DB954]"
                  />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    Current Rotation
                  </p>
                </div>
                <div className="flex items-center gap-4 md:gap-6 relative z-10">
                  <div className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Music className="w-6 h-6 md:w-8 md:h-8 text-[#1DB954]/40 animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xl md:text-2xl font-bold tracking-tight truncate text-white">
                      Midnight City
                    </p>
                    <p className="text-xs md:text-sm text-white/40 truncate">
                      M83 — Hurry Up, We're Dreaming
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/20 hover:text-[#1DB954] transition-colors flex-shrink-0" />
                </div>
                <div className="mt-8 h-1 w-full bg-white/10 rounded-full overflow-hidden relative z-10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="h-full bg-[#1DB954] shadow-[0_0_10px_#1DB954]"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="p-6 md:p-8 border border-white/10 bg-white/[0.02] rounded-3xl md:rounded-[2.5rem] flex items-center justify-between gap-4 group hover:border-blue-500/30 transition-all backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Cpu className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="font-mono text-sm text-white/60 group-hover:text-white/90 transition-colors">
                    Specializing in Monorepos & SEO
                  </p>
                </div>
                <Icon
                  icon="line-md:confirm-circle"
                  className="text-green-500 text-xl flex-shrink-0"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 md:py-24 px-4 md:px-6 border-t border-white/10 bg-white/[0.01]">
        <Reveal className="max-w-7xl mx-auto mb-16 text-left lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-4">
            Technical <span className="text-white/40 italic">Expertise.</span>
          </h2>
          <p className="text-blue-400 font-mono text-xs md:text-sm tracking-widest uppercase">
            // Industry standard toolsets
          </p>
        </Reveal>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.1}>
              <div
                className={`p-8 border border-white/10 bg-white/[0.03] backdrop-blur-md rounded-[2rem] h-full transition-all group relative overflow-hidden ${group.accent}`}
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${group.glow}`}
                />
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <Icon
                    icon={group.icon}
                    className="text-3xl grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  />
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                    Expertise_{i + 1}
                  </span>
                </div>
                <p className="text-lg font-semibold mb-6 tracking-tight relative z-10 text-white/90 group-hover:text-white uppercase transition-colors">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 group-hover:text-white/90 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="mt-20 text-center text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] relative z-10">
        © 2026 Ritik Shah — Built with Precision
      </footer>
    </div>
  );
};

export default About;
