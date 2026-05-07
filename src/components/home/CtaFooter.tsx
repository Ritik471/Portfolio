import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";

const CtaFooter = () => {
  return (
    <footer
      className="relative z-10 max-w-[1400px] mx-auto border-t"
      style={{ borderColor: "rgba(var(--surface),0.1)" }}
    >
      <div className="flex flex-col justify-center min-h-screen px-6 text-center max-w-7xl mx-auto py-20 md:py-32">
        <Reveal>
          <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
            // CONNECT MATRIX
          </p>
          <h2 className="text-7xl sm:text-9xl font-bold tracking-tighter leading-none mb-12 uppercase">
            Ready to <br />
            <span className="relative inline-block pb-2 px-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 italic">
              Scale?
            </span>
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/contact"
              className="group text-xl md:text-2xl font-light inline-flex items-center justify-center gap-6 transition-all"
            >
              <span className="hover:text-blue-400 transition-colors">
                Initiate Collaboration
              </span>
              <div
                className="w-16 h-16 rounded-full border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all group-hover:scale-110"
                style={{ borderColor: "rgba(var(--surface),0.2)" }}
              >
                <ArrowRight className="w-6 h-6" />
              </div>
            </Link>
          </motion.div>
        </Reveal>
        <div className="mt-20 text-center text-[10px] font-mono text-muted-foreground uppercase tracking-[0.5em] relative z-10">
          © 2026 Ritik Shah — All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default CtaFooter;
