import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Reveal from "../components/Reveal";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen themed-bg themed-text flex items-center justify-center p-6 overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-[-10%] -left-[10%] w-[70%] h-[70%] bg-red-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] -right-[10%] w-[60%] h-[60%] bg-orange-600/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-12 border rounded-full backdrop-blur-md" style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.05)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-red-500/80">
              System_Error: 404_Page_Missing
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.h1 
            className="text-[8rem] md:text-[12rem] font-bold tracking-tighter leading-none mb-4 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            404
          </motion.h1>
        </Reveal>

        <Reveal delay={0.2}>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight uppercase mb-6">
            Page <span className="text-muted-foreground italic">Not Found.</span>
          </h2>
          <p className="text-base text-muted-foreground font-light leading-relaxed mb-12 max-w-md mx-auto">
            The system could not locate the requested resource at <code className="px-2 py-1 bg-foreground/5 rounded text-red-400 font-mono text-xs">{location.pathname}</code>.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-foreground text-background rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-red-500 transition-all shadow-xl"
            >
              <Home className="w-4 h-4" /> Go_Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 border rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:border-red-500/50 transition-all text-muted-foreground hover:text-foreground backdrop-blur-sm"
              style={{ borderColor: 'rgba(var(--surface),0.1)' }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default NotFound;

