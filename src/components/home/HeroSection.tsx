import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Code2,
  Cpu,
  FileText,
} from "lucide-react";
import Reveal from "../Reveal";

const HeroSection = () => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-32 pb-24 text-center">
      <Reveal>
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border rounded-full backdrop-blur-md"
          style={{
            borderColor: "rgba(var(--surface),0.1)",
            background: "rgba(var(--surface),0.05)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span
            className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap"
            style={{ color: "rgba(var(--surface),0.9)" }}
          >
            Nagpur, IN — Systems Online
          </span>
        </div>
      </Reveal>

      <motion.h1
        className="text-4xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-[1.1] sm:leading-[1.0] mb-6 sm:mb-8 overflow-visible"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-blue-400/80">
          ENGINEER
        </span>{" "}
        <br />
        <span className="inline-block py-2 px-4 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground italic">
          BY DESIGN
        </span>
      </motion.h1>

      <Reveal delay={0.1}>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-blue-500 dark:text-blue-300">
              Frontend Architect
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-purple-500 dark:text-purple-300">
              Software Engineer
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 font-light leading-relaxed">
          I am <span className="text-foreground font-medium">Ritik Shah</span>. I
          specialize in building{" "}
          <span className="text-blue-400 font-normal">
            high-performance landing pages
          </span>{" "}
          and scalable web applications with a focus on SEO and UI/UX.
        </p>
      </Reveal>

      <div className="flex flex-col sm:flex-row gap-5 font-mono items-center z-20">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/projects"
            className="w-64 py-4 bg-foreground text-background font-bold rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-xl"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <a
            href="https://drive.google.com/uc?export=download&id=179Ei5NVWUCZh7AaqEiTP0d8i8eYyyVxz"
            rel="noopener noreferrer"
            className="w-64 py-4 border rounded-full hover:border-blue-500/50 transition-all text-foreground/90 backdrop-blur-sm flex items-center justify-center gap-2 group"
            style={{ borderColor: "rgba(var(--surface),0.2)" }}
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
        className="mt-12 sm:mt-0 sm:absolute sm:bottom-10 sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
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
  );
};

export default HeroSection;
