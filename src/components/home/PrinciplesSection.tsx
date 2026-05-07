import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Reveal from "../Reveal";
import { principles } from "../../data/home";

const PrinciplesSection = () => {
  return (
    <section
      className="relative z-10 max-w-[1400px] mx-auto border-t"
      style={{ borderColor: "rgba(var(--surface),0.1)" }}
    >
      <div className="flex flex-col justify-center min-h-screen px-6 max-w-7xl mx-auto py-20 md:py-32">
        <Reveal className="mb-16">
          <p className="text-purple-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
            // MY PHILOSOPHY
          </p>
          <h2 className="text-5xl sm:text-8xl font-bold tracking-tighter leading-[1.0] mb-8 uppercase">
            Core <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground italic">
              Principles.
            </span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative p-8 md:p-10 border cursor-pointer rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 overflow-hidden h-full backdrop-blur-sm"
                style={{
                  borderColor: "rgba(var(--surface),0.1)",
                  background: "rgba(var(--surface),0.03)",
                }}
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${p.glow}`}
                />
                <Icon
                  icon={p.icon}
                  className="text-4xl mb-6 md:mb-8 text-muted-foreground group-hover:text-foreground transition-all duration-500 relative z-10"
                />
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-4 relative z-10">
                  {p.tag}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 tracking-tight uppercase relative z-10 group-hover:translate-x-1 transition-transform">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-500 font-light relative z-10">
                  {p.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
