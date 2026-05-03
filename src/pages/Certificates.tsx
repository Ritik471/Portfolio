import { useState } from "react";
import { X, ExternalLink, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Reveal from "../components/Reveal";
import usePageTitle from "../hooks/usePageTitle";

const certificates = [
  {
    title: "Flutter and Dart Complete Guide",
    issuer: "Udemy",
    date: "2023",
    link: "https://www.linkedin.com/in/ritikshah2000/details/certifications/",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
    description:
      "Comprehensive course in Flutter and Dart, covering fundamental concepts essential for Flutter app development.",
    icon: "logos:flutter",
    glow: "group-hover:border-blue-500/30",
    accent: "text-blue-400",
  },
  {
    title: "RealWorld Projects with Flutter",
    issuer: "Infosys Springboard",
    date: "2023",
    link: "https://www.linkedin.com/in/ritikshah2000/details/certifications/",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072",
    description:
      "Successfully completing a course in Flutter and Dart by Infosys Springboard, which taught to develop Real World Projects.",
    icon: "logos:flutter",
    glow: "group-hover:border-orange-500/30",
    accent: "text-orange-400",
  },
  {
    title: "Hackoverflow 1.0",
    issuer: "National-Level Hackathon",
    date: "2023",
    link: "https://www.linkedin.com/in/ritikshah2000/details/certifications/",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070",
    description:
      "Certified for participation in a national-level hackathon, competing against students nationwide.",
    icon: "logos:google-cloud",
    glow: "group-hover:border-blue-400/30",
    accent: "text-blue-300",
  },
];

const Certificates = () => {
  usePageTitle("Certified Excellence");
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen themed-bg themed-text selection:bg-amber-500 pb-40 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-amber-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-orange-600/5 blur-[140px] rounded-full" />
      </div>

      <section className="relative z-10 max-w-[1400px] mx-auto pt-32 sm:pt-40 pb-16 md:pb-20 border-b" style={{ borderColor: 'rgba(var(--surface),0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-0">
          <Reveal className="max-w-7xl mx-auto">
            <p className="font-mono text-[9px] sm:text-[10px] text-amber-500 tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6 md:mb-8">
              // Verified_Credentials
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter leading-[1.0] sm:leading-[0.85] mb-8 uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-amber-400/50">
                CERTIFIED
              </span>{" "}
              <br />
              <span className="inline-block py-1 sm:py-2 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground italic">
                EXCELLENCE.
              </span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              Industry-recognized certifications that validate my expertise across
              <span className="text-amber-400/80"> cloud platforms</span>,
              frontend systems, and infrastructure.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {certificates.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.08}>
              <button
                onClick={() => setSelected(i)}
                className={`w-full text-left group relative border backdrop-blur-sm rounded-[2.5rem] ${cert.glow} transition-all duration-500 overflow-hidden flex flex-col h-full shadow-2xl hover:shadow-amber-900/10`}
                style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.03)' }}
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-white/10">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

                  <div className="absolute bottom-4 left-6 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 group-hover:border-white/40 transition-all">
                    <Icon
                      icon={cert.icon}
                      className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110"
                    />
                  </div>
                </div>

                <div className="flex-1 p-8 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-[9px] uppercase tracking-widest`}
                      >
                        <ShieldCheck className="w-3 h-3 inline-block mr-1 mb-0.5" />{" "}
                        Verified
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase italic">
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-amber-400 transition-colors mb-2 leading-snug uppercase">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-widest mb-4">
                      {cert.issuer}
                    </p>
                    <p className="text-foreground/70 text-sm leading-relaxed font-light line-clamp-2 transition-colors">
                      {cert.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-6 text-muted-foreground font-mono text-[10px] uppercase border-t group-hover:text-amber-200 transition-colors" style={{ borderColor: 'rgba(var(--surface),0.1)' }}>
                    View_Full_Credential{" "}
                    <Icon
                      icon="line-md:arrow-right"
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="max-w-7xl mx-auto p-8 sm:p-12 border rounded-[2rem] sm:rounded-[3rem] text-center relative overflow-hidden group" style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.02)' }}>

            {/* Fixed: added pointer-events-none */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-500/5 via-amber-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <Icon icon="line-md:linkedin" className="text-5xl text-blue-400 mb-6 mx-auto group-hover:scale-110 transition-transform duration-500" />

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tighter mb-4 uppercase">
              Looking for more <span className="text-muted-foreground italic">Credentials?</span>
            </h2>

            <p className="text-muted-foreground mb-10 max-w-xl mx-auto font-light leading-relaxed">
              I actively update my certifications and licenses on LinkedIn. Explore my full professional verification history there.
            </p>

            <a
              href="https://www.linkedin.com/in/ritikshah2000/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-[#0077B5] text-white rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] hover:bg-[#005a8a] transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              <Icon icon="line-md:external-link" className="w-4 h-4" /> View All on LinkedIn
            </a>
          </div>
        </Reveal>
      </section>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-xl"
            style={{ background: 'rgba(var(--surface-invert),0.95)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative border bg-background rounded-[2.5rem] md:rounded-[3rem] max-w-5xl w-full max-h-[90vh] overflow-y-auto lg:overflow-hidden grid lg:grid-cols-2 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              style={{ borderColor: 'rgba(var(--surface),0.2)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-30 p-2.5 md:p-4 border rounded-full hover:bg-foreground/10 transition-all text-foreground backdrop-blur-md"
                style={{ borderColor: 'rgba(var(--surface),0.2)', background: 'rgba(var(--surface-invert),0.5)' }}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[4/3] sm:aspect-square lg:aspect-auto border-b lg:border-b-0 lg:border-r flex items-center justify-center overflow-hidden relative" style={{ background: 'rgba(var(--surface-invert),0.3)', borderColor: 'rgba(var(--surface),0.1)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-30" />
                <img
                  src={certificates[selected].image}
                  alt={certificates[selected].title}
                  className="w-full h-full object-cover lg:p-0 opacity-90"
                />
              </div>

              <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center relative">
                <Icon
                  icon={certificates[selected].icon}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] sm:text-[15rem] opacity-[0.03] pointer-events-none"
                />
                <h2 className="text-2xl sm:text-5xl font-bold mb-4 tracking-tighter text-foreground relative z-10 uppercase">
                  {certificates[selected].title}
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 italic relative z-10">
                  {certificates[selected].issuer}
                </p>
                <p className="text-foreground/70 text-sm sm:text-base leading-relaxed font-light mb-8 sm:mb-12 relative z-10 max-w-md">
                  {certificates[selected].description}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t pt-8 sm:pt-10 gap-6 relative z-10" style={{ borderColor: 'rgba(var(--surface),0.1)' }}>
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-1">
                      Issue_Date
                    </p>
                    <p className="font-mono text-sm text-foreground/90">
                      {certificates[selected].date}
                    </p>
                  </div>
                  <a
                    href={certificates[selected].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-white text-black rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-amber-400 transition-all shadow-xl"
                  >
                    <ExternalLink className="w-4 h-4" /> Verify_Now
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-20 text-center text-[10px] font-mono text-muted-foreground uppercase tracking-[0.5em] relative z-10">
        Nagpur, IN — Registered Credentials
      </footer>
    </div>
  );
};

export default Certificates;
