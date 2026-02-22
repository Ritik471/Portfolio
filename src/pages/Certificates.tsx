import { useState } from "react";
import { X, ExternalLink, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Reveal from "../components/Reveal";

const certificates = [
  {
    title: "Meta Frontend Developer",
    issuer: "Meta / Coursera",
    date: "2024",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
    description:
      "Professional certification validating expertise in React architecture, JavaScript, and UI/UX.",
    icon: "logos:meta-icon",
    glow: "group-hover:border-blue-500/30",
    accent: "text-blue-400",
  },
  {
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072",
    description:
      "Expertise in designing distributed systems and cloud security best practices on AWS.",
    icon: "logos:aws",
    glow: "group-hover:border-orange-500/30",
    accent: "text-orange-400",
  },
  {
    title: "Google Cloud Professional",
    issuer: "Google",
    date: "2023",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070",
    description:
      "Ability to design and manage robust cloud architectures using GCP services.",
    icon: "logos:google-cloud",
    glow: "group-hover:border-blue-400/30",
    accent: "text-blue-300",
  },
  {
    title: "MongoDB Developer",
    issuer: "MongoDB University",
    date: "2022",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    description:
      "Advanced knowledge of MongoDB data modeling and performance optimization.",
    icon: "logos:mongodb-icon",
    glow: "group-hover:border-green-500/30",
    accent: "text-green-400",
  },
];

const Certificates = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-amber-500 selection:text-white pb-40 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-amber-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-orange-600/5 blur-[140px] rounded-full" />
      </div>

      <section className="relative z-10 px-4 md:px-6 pt-32 md:pt-32pb-16 md:pb-20 border-b border-white/10">
        <Reveal className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] text-amber-500 tracking-[0.3em] uppercase mb-6 md:mb-8">
            // Verified_Credentials
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.85] mb-8 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-amber-400/50">
              CERTIFIED
            </span>{" "}
            <br />
            <span className="inline-block py-1 text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/10 italic">
              EXCELLENCE.
            </span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-white/70 font-light leading-relaxed">
            Industry-recognized certifications that validate my expertise across
            <span className="text-amber-400/80"> cloud platforms</span>,
            frontend systems, and infrastructure.
          </p>
        </Reveal>
      </section>

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.08}>
              <button
                onClick={() => setSelected(i)}
                className={`w-full text-left group relative border border-white/10 bg-white/[0.03] rounded-[2.5rem] ${cert.glow} transition-all duration-500 overflow-hidden flex flex-col h-full backdrop-blur-sm shadow-2xl hover:shadow-amber-900/10`}
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-white/10">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

                  <div className="absolute bottom-4 left-6 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 group-hover:border-white/40 transition-all">
                    <Icon
                      icon={cert.icon}
                      className="text-2xl grayscale group-hover:grayscale-0 transition-all group-hover:scale-110"
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
                      <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase italic">
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors mb-2 leading-snug uppercase">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] text-white/50 font-mono uppercase tracking-widest mb-4">
                      {cert.issuer}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed font-light line-clamp-2 transition-colors">
                      {cert.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-6 text-white/30 font-mono text-[10px] uppercase border-t border-white/10 group-hover:text-amber-200 transition-colors">
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
      </section>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative border border-white/20 bg-[#0A0A0A] rounded-[2.5rem] md:rounded-[3rem] max-w-5xl w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden grid lg:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-20 p-3 md:p-4 border border-white/20 rounded-full bg-black/50 hover:bg-white/10 transition-all text-white backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-square lg:aspect-auto bg-[#050505] border-b lg:border-b-0 lg:border-r border-white/10 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-30" />
                <img
                  src={certificates[selected].image}
                  alt={certificates[selected].title}
                  className="w-full h-full object-cover lg:p-0 opacity-90"
                />
              </div>

              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                <Icon
                  icon={certificates[selected].icon}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] opacity-[0.03] pointer-events-none"
                />

                <p className="font-mono text-[10px] text-amber-500 uppercase tracking-widest mb-6 relative z-10">
                  // Certification_Registry_ID
                </p>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-white relative z-10 uppercase">
                  {certificates[selected].title}
                </h2>
                <p className="text-xl text-white/50 mb-8 italic relative z-10">
                  {certificates[selected].issuer}
                </p>
                <p className="text-white/70 leading-relaxed font-light mb-12 relative z-10 max-w-md">
                  {certificates[selected].description}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/10 pt-10 gap-6 relative z-10">
                  <div>
                    <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] mb-1">
                      Issue_Date
                    </p>
                    <p className="font-mono text-sm text-white/90">
                      {certificates[selected].date}
                    </p>
                  </div>
                  <a
                    href="#"
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

      <footer className="mt-20 text-center text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] relative z-10">
        Nagpur, IN — Registered Credentials
      </footer>
    </div>
  );
};

export default Certificates;
