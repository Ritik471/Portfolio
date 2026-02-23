import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  ArrowRight,
  Monitor,
  Smartphone,
  Search,
  Cpu,
  Code2,
  FileText,
  ChevronDown,
  Terminal,
} from "lucide-react";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { GitHubCalendar } from "react-github-calendar";

const techStack = [
  {
    name: "React",
    icon: "logos:react",
    color: "group-hover:shadow-blue-500/40",
    border: "hover:border-blue-500/50",
  },
  {
    name: "Next.js",
    icon: "logos:nextjs-icon",
    color: "group-hover:shadow-white/20",
    border: "hover:border-white/50",
  },
  {
    name: "TypeScript",
    icon: "logos:typescript-icon",
    color: "group-hover:shadow-blue-600/40",
    border: "hover:border-blue-600/50",
  },
  {
    name: "Tailwind",
    icon: "logos:tailwindcss-icon",
    color: "group-hover:shadow-cyan-400/40",
    border: "hover:border-cyan-400/50",
  },
  {
    name: "Dart",
    icon: "logos:dart",
    color: "group-hover:shadow-blue-400/40",
    border: "hover:border-blue-400/50",
  },
  {
    name: "Flutter",
    icon: "logos:flutter",
    color: "group-hover:shadow-blue-400/40",
    border: "hover:border-blue-400/50",
  },
  {
    name: "Figma",
    icon: "logos:figma",
    color: "group-hover:shadow-purple-500/40",
    border: "hover:border-purple-500/50",
  },
  {
    name: "VS Code",
    icon: "logos:visual-studio-code",
    color: "group-hover:shadow-blue-500/40",
    border: "hover:border-blue-500/50",
  },
  {
    name: "Postman",
    icon: "logos:postman-icon",
    color: "group-hover:shadow-orange-500/40",
    border: "hover:border-orange-500/50",
  },
  {
    name: "GitHub",
    icon: "line-md:github-loop",
    color: "group-hover:shadow-white/20",
    border: "hover:border-white/50",
  },
  {
    name: "Android",
    icon: "logos:android-icon",
    color: "group-hover:shadow-green-500/40",
    border: "hover:border-green-500/50",
  },
  {
    name: "WordPress",
    icon: "logos:wordpress-icon",
    color: "group-hover:shadow-blue-900/40",
    border: "hover:border-blue-900/50",
  },
];

const services = [
  {
    title: "Frontend Engineering",
    desc: "Architecting sub-second TTI interfaces with React and Next.js server components.",
    icon: <Monitor className="w-6 h-6" />,
    accent: "text-blue-400",
    hoverBorder: "hover:border-blue-400/50",
    glow: "bg-blue-800",
  },
  {
    title: "Mobile Solutions",
    desc: "Cross-platform mastery using Flutter for native-performance apps.",
    icon: <Smartphone className="w-6 h-6" />,
    accent: "text-emerald-400",
    hoverBorder: "hover:border-emerald-400/50",
    glow: "bg-emerald-800",
  },
  {
    title: "SEO Architecture",
    desc: "Technical SEO integration with JSON-LD and semantic HTML for global search dominance.",
    icon: <Search className="w-6 h-6" />,
    accent: "text-yellow-400",
    hoverBorder: "hover:border-yellow-400/50",
    glow: "bg-yellow-800",
  },
  {
    title: "System Design",
    desc: "Building scalable monorepo structures and type-safe backend integrations.",
    icon: <Cpu className="w-6 h-6" />,
    accent: "text-purple-400",
    hoverBorder: "hover:border-purple-400/50",
    glow: "bg-purple-800",
  },
];

const principles = [
  {
    title: "Performance First",
    desc: "I prioritize Core Web Vitals, ensuring sub-second TTI is my baseline for production deployment.",
    icon: "line-md:gauge-loop",
    tag: "Optimization",
    glow: "bg-blue-500/10",
  },
  {
    title: "Scalable Architecture",
    desc: "Implementing modular monorepos and type-safe systems to ensure enterprise platforms remain maintainable.",
    icon: "line-md:cloud-braces-loop",
    tag: "Architecture",
    glow: "bg-purple-500/10",
  },
  {
    title: "SEO Engineering",
    desc: "Integrating structured data during development to ensure maximum organic reach and discoverability.",
    icon: "line-md:search-twotone",
    tag: "Growth",
    glow: "bg-emerald-500/10",
  },
];

interface GitHubData {
  repos: string;
  stars: string;
  followers: string;
  forks: string;
  languages: { name: string; pct: number; color: string }[];
}

const Index = () => {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCommand, setActiveCommand] = useState(0);

  const terminalCommands = [
    { cmd: "npm run test:architecture", output: "PASS  src/systems/core.test.ts\n✓ Engine initialized (42ms)\n✓ Event loop boundary checked" },
    { cmd: "docker-compose up -d production", output: "Starting postgis-db ... done\nStarting redis-cache ... done\nStarting auth-gateway ... done" },
    { cmd: "rustc compile_node.rs --release", output: "Compiling starfall_node v1.0.4\nFinished release [optimized] target(s) in 1.42s" },
  ];

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 150]);
  const yBg1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const yBg2 = useTransform(scrollY, [0, 1000], [0, -200]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const cursorX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.5 });
  const cursorY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.5 });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const username = "ritik471";
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userJson = await userRes.json();

        let allRepos: any[] = [];
        let page = 1;
        while (true) {
          const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`);
          const reposJson = await reposRes.json();
          if (reposJson.length === 0) break;
          allRepos = [...allRepos, ...reposJson];
          if (reposJson.length < 100) break;
          page++;
        }

        const totalStars = allRepos.reduce(
          (acc: number, repo: any) => acc + repo.stargazers_count,
          0,
        );
        const totalForks = allRepos.reduce(
          (acc: number, repo: any) => acc + repo.forks_count,
          0,
        );

        const langCounts: Record<string, number> = {};
        let totalLangs = 0;
        allRepos.forEach((repo: any) => {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            totalLangs++;
          }
        });

        const langColors: Record<string, string> = {
          TypeScript: "bg-blue-400",
          JavaScript: "bg-yellow-400",
          Python: "bg-green-400",
          Rust: "bg-orange-400",
          Go: "bg-cyan-400",
          Dart: "bg-blue-300",
          HTML: "bg-orange-500",
          CSS: "bg-pink-400",
          Java: "bg-red-400",
          PHP: "bg-indigo-400",
          C: "bg-gray-300"
        };

        const sortedLangs = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            pct: Math.round((count / totalLangs) * 100),
            color: langColors[name] || "bg-gray-400",
          }))
          .sort((a, b) => b.pct - a.pct)
          .slice(0, 5);

        setData({
          repos: userJson.public_repos?.toString() || "0",
          stars: totalStars.toString() || "0",
          followers: userJson.followers?.toString() || "0",
          forks: totalForks.toString() || "0",
          languages: sortedLangs,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubStats();
  }, []);

  const stats = [
    {
      label: "Repositories",
      value: data?.repos || "0",
      icon: "line-md:github-loop",
      text: "text-blue-400",
    },
    {
      label: "Total Stars",
      value: data?.stars || "0",
      icon: "line-md:star-filled",
      text: "text-yellow-400",
    },
    {
      label: "Followers",
      value: data?.followers || "0",
      icon: "line-md:account",
      text: "text-emerald-400",
    },
    {
      label: "Forks",
      value: data?.forks || "0",
      icon: "line-md:fork-right",
      text: "text-purple-400",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Interactive Cursor Glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 w-8 h-8 rounded-full bg-blue-500/20 blur-xl mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <motion.div style={{ y: yBg1 }} className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" />
        <motion.div style={{ y: yBg2 }} className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] rounded-full" />
        <div className="absolute -bottom-[10%] left-[10%] w-[50%] h-[50%] bg-emerald-600/5 blur-[140px] rounded-full" />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/90">
              Nagpur, IN — Systems Online
            </span>
          </div>
        </Reveal>

        <motion.h1
          className="text-5xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-[1.0] mb-8 overflow-visible"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-400/80">
            ENGINEER
          </span>{" "}
          <br />
          <span className="inline-block py-2 px-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 italic">
            BY DESIGN
          </span>
        </motion.h1>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-blue-100/90">
                Frontend Architect
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-purple-100/90">
                Software Engineer
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-12 font-light leading-relaxed">
            I am <span className="text-white font-medium">Ritik Shah</span>. I
            specialize in crafting{" "}
            <span className="text-blue-400 font-normal">
              high-fidelity frontends
            </span>{" "}
            and robust full-stack architectures.
          </p>
        </Reveal>

        <div className="flex flex-col sm:flex-row gap-5 font-mono items-center z-20">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/projects"
              className="w-64 py-4 bg-white text-black font-bold rounded-full hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group shadow-xl"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/cv.pdf"
              download
              className="w-64 py-4 border border-white/20 rounded-full hover:border-blue-500/50 hover:bg-white/5 transition-all text-white/90 backdrop-blur-sm flex items-center justify-center gap-2 group"
            >
              <FileText className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              Download CV
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-blue-500/50" />
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-10 flex flex-col justify-center min-h-screen px-6 max-w-7xl mx-auto border-t border-white/5 py-20 md:py-32">
        <Reveal className="mb-16">
          <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
            // WHAT I DELIVER
          </p>
          <h1 className="text-5xl sm:text-8xl font-bold tracking-tighter leading-[1.0] mb-8 uppercase">
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/5 italic">
              Specialties.
            </span>
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full rounded-[2rem] cursor-pointer"
              >
                <div
                  className={`relative h-full p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 ${service.hoverBorder}`}
                >
                  <div
                    className={`absolute -top-24 -right-24 w-48 h-48 blur-[80px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${service.glow}`}
                  />
                  <div
                    className={`mb-6 w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/40 transition-all duration-300 ${service.accent} group-hover:scale-110 group-hover:bg-white/5`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white uppercase">
                    {service.title}
                  </h3>
                  <div
                    className={`w-12 h-[2px] mb-4 transition-all duration-500 group-hover:w-full ${service.glow}`}
                  />
                  <p className="text-sm text-white/50 leading-relaxed font-light transition-colors duration-300 group-hover:text-white/80">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative z-10 flex flex-col justify-center min-h-screen px-6 max-w-7xl mx-auto border-t border-white/10 py-20 md:py-32">
        <Reveal className="mb-16">
          <p className="text-purple-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
            // MY PHILOSOPHY
          </p>
          <h2 className="text-5xl sm:text-8xl font-bold tracking-tighter leading-[1.0] mb-8 uppercase">
            Core <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/10 italic">
              Principles.
            </span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative p-8 md:p-10 border border-white/10 bg-white/[0.03] cursor-pointer rounded-[2rem] md:rounded-[2.5rem] hover:border-white/30 transition-all duration-500 overflow-hidden h-full backdrop-blur-sm"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${p.glow}`}
                />
                <Icon
                  icon={p.icon}
                  className="text-4xl mb-6 md:mb-8 text-white/30 group-hover:text-white transition-all duration-500 relative z-10"
                />
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-4 relative z-10">
                  {p.tag}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 tracking-tight uppercase relative z-10 group-hover:translate-x-1 transition-transform">
                  {p.title}
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-500 font-light relative z-10">
                  {p.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative z-10 flex flex-col justify-center min-h-screen px-6 bg-white/[0.01] border-y border-white/10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto w-full">
          <Reveal className="mb-16 text-left">
            <p className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
              // TECHNICAL STACK
            </p>
            <h2 className="text-5xl sm:text-8xl font-bold tracking-tighter leading-[1.0] mb-8 uppercase">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/60 to-white/10 italic">
                Arsenal.
              </span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {techStack.map((tech, i) => (
              <Reveal key={tech.name} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-8 border border-white/10 bg-white/[0.02] cursor-pointer backdrop-blur-md rounded-[2rem] flex flex-col items-center gap-4 group transition-all duration-500 ${tech.border} ${tech.color} hover:bg-white/[0.05]`}
                >
                  <Icon
                    icon={tech.icon}
                    className="text-5xl md:text-6xl grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 flex flex-col justify-center min-h-screen px-4 md:px-6 max-w-7xl mx-auto border-t border-white/10 py-20 md:py-32">
        <Reveal className="mb-16">
          <p className="text-yellow-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
            // OPEN SOURCE JOURNEY
          </p>
          <h2 className="text-5xl sm:text-8xl font-bold tracking-tighter leading-[1.0] mb-8 uppercase">
            GitHub <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/60 to-white/10 italic">
              Activity.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-8 border border-white/10 bg-white/[0.03] cursor-pointer rounded-[2rem] text-center group hover:border-white/30 transition-all backdrop-blur-sm"
              >
                <Icon
                  icon={stat.icon}
                  className={`mx-auto text-2xl mb-4 text-white/30 group-hover:scale-110 transition-all ${stat.text}`}
                />
                <div
                  className={`text-3xl md:text-5xl font-bold mb-2 tracking-tighter ${stat.text}`}
                >
                  {loading ? "..." : stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">
                  {stat.label}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4} className="max-w-[950px] mx-auto w-full mb-12">
          <div className="rounded-[2.5rem] p-10 border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-x-auto overflow-y-hidden text-sm">
            <p className="font-mono text-sm text-white/60 mb-8 uppercase tracking-widest text-center">
              Contribution Heatmap
            </p>
            <div className="flex justify-center min-w-[750px] md:min-w-fit">
              <GitHubCalendar
                username="Ritik471"
                colorScheme="dark"
                theme={{
                  dark: ['#1e1e24', '#042d17', '#034a26', '#036531', '#01833c'] // Custom Hacker/Emerald mapping
                }}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
                blockRadius={2}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.5} className="max-w-[950px] mx-auto w-full">
          <div className="rounded-[2.5rem] p-10 border border-white/10 cursor-pointer bg-white/[0.03] backdrop-blur-md">
            <p className="font-mono text-sm text-white/60 mb-8 uppercase tracking-widest text-center">
              Top Languages Frequency
            </p>
            <div className="flex w-full h-3 rounded-full overflow-hidden gap-1 mb-10 bg-white/10">
              {data?.languages.map((lang) => (
                <div
                  key={lang.name}
                  className={`${lang.color} h-full transition-all duration-1000`}
                  style={{ width: `${lang.pct}%` }}
                />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {data?.languages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${lang.color} shadow-lg`}
                  />
                  <span className="font-mono text-sm text-white/70">
                    {lang.name}{" "}
                    <span className="text-white/30 ml-1">{lang.pct}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="relative z-10 flex flex-col justify-center min-h-screen px-6 text-center border-t border-white/10">
        <Reveal>
          <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
            // CONNECT MATRIX
          </p>
          <h2 className="text-7xl sm:text-9xl font-bold tracking-tighter leading-none mb-12 uppercase">
            Ready to <br />
            <span className="relative inline-block pb-2 px-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 italic">
              Scale?
            </span>
          </h2>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link
              to="/contact"
              className="group text-xl md:text-2xl font-light inline-flex items-center justify-center gap-6 transition-all"
            >
              <span className="hover:text-blue-400 transition-colors">
                Initiate Collaboration
              </span>
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <ArrowRight className="w-6 h-6" />
              </div>
            </Link>
          </motion.div>
        </Reveal>
        <div className="mt-20 text-center text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] relative z-10">
          © 2026 Ritik Shah — All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Index;
