import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Reveal from "../Reveal";
import { techStack } from "../../data/home";

const TechStackSection = () => {
  return (
    <section
      className="relative max-w-[1400px] mx-auto z-10 border-t"
      style={{
        background: "rgba(var(--surface),0.01)",
        borderColor: "rgba(var(--surface),0.1)",
      }}
    >
      <div className="flex flex-col justify-center min-h-screen px-6 max-w-7xl mx-auto py-20 md:py-32">
        <Reveal className="mb-16 text-left">
          <p className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
            // TECHNICAL STACK
          </p>
          <h2 className="text-5xl sm:text-8xl font-bold sm:max-w-xs tracking-tighter leading-[1.0] mb-8 uppercase">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground italic">
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
                className={`p-8 border cursor-pointer backdrop-blur-md rounded-[2rem] flex flex-col items-center gap-4 group transition-all duration-500 ${tech.border} ${tech.color}`}
                style={{
                  borderColor: "rgba(var(--surface),0.1)",
                  background: "rgba(var(--surface),0.02)",
                }}
              >
                <Icon
                  icon={tech.icon}
                  className="text-5xl md:text-6xl grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
