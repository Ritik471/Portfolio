import { useState } from "react";
import { Send, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Reveal from "../components/Reveal";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ritikshah.dev@gmail.com",
    color: "text-emerald-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nagpur, India",
    color: "text-emerald-400",
  },
  {
    icon: Clock,
    label: "Timezone",
    value: "IST (GMT +5:30)",
    color: "text-emerald-400",
  },
];

const socials = [
  { icon: "line-md:github-loop", label: "GitHub", href: "#" },
  { icon: "line-md:linkedin", label: "LinkedIn", href: "#" },
  { icon: "line-md:twitter-x", label: "Twitter", href: "#" },
  { icon: "logos:whatsapp-icon", label: "WhatsApp", href: "#" },
];

const Contact = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-emerald-500 selection:text-black pb-20 md:pb-40 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-[-10%] -left-[10%] w-[70%] h-[70%] bg-emerald-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] -right-[10%] w-[60%] h-[60%] bg-cyan-600/5 blur-[140px] rounded-full" />
      </div>

      <section className="relative z-10 px-4 md:px-6 pt-32 md:pt-32 pb-16 md:pb-20 border-b border-white/10">
        <Reveal className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] text-emerald-400 tracking-[0.3em] uppercase mb-8">
            // Establish_Uplink
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.85] mb-8 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-emerald-400/50">
              INITIATE
            </span>{" "}
            <br />
            {/* Added py-2 to fix italic clipping */}
            <span className="inline-block py-2 text-transparent bg-clip-text bg-gradient-to-b from-white/60 to-white/10 italic">
              CONNECTION.
            </span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-white/70 font-light leading-relaxed">
            Ready to scale your next project? Drop a message below to start the
            <span className="text-emerald-400 font-normal">
              {" "}
              engineering dialogue
            </span>
            .
          </p>
        </Reveal>
      </section>

      <section className="relative z-10 py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          <div className="lg:col-span-8 order-1 lg:order-1 h-full">
            <Reveal className="h-full">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 h-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <label className="font-mono text-[11px] uppercase tracking-widest text-emerald-500/80 group-focus-within:text-emerald-400 transition-colors block font-semibold">
                      Full_Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all backdrop-blur-sm"
                      placeholder="e.g. Ritik Shah"
                      required
                    />
                  </div>
                  <div className="space-y-3 group">
                    <label className="font-mono text-[11px] uppercase tracking-widest text-emerald-500/80 group-focus-within:text-emerald-400 transition-colors block font-semibold">
                      Email_Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all backdrop-blur-sm"
                      placeholder="hello@domain.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <label className="font-mono text-[11px] uppercase tracking-widest text-emerald-500/80 group-focus-within:text-emerald-400 transition-colors block font-semibold">
                    Subject_Line
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all backdrop-blur-sm"
                    placeholder="Monorepo Architecture / Frontend Project"
                    required
                  />
                </div>

                <div className="space-y-3 group flex-grow flex flex-col">
                  <label className="font-mono text-[11px] uppercase tracking-widest text-emerald-500/80 group-focus-within:text-emerald-400 transition-colors block font-semibold">
                    Message_Body
                  </label>
                  <textarea
                    className="w-full flex-grow bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all resize-none backdrop-blur-sm min-h-[200px]"
                    placeholder="Describe your vision..."
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="group w-full flex items-center justify-center gap-3 bg-white text-black rounded-full px-8 py-5 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-emerald-400 transition-all duration-300 shadow-xl"
                >
                  {isSent ? "Message_Transmitted" : "Transmit_Message"}
                  <Send
                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isSent ? "animate-bounce text-emerald-900" : ""}`}
                  />
                </motion.button>
              </form>
            </Reveal>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8 order-2 lg:order-2 h-full">
            <Reveal delay={0.2} className="flex-grow">
              <div className="p-8 md:p-10 border border-white/10 bg-white/[0.03] rounded-[2.5rem] h-full space-y-10 shadow-2xl backdrop-blur-md flex flex-col justify-center">
                <div className="flex items-center gap-4 relative z-10">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-white/30 uppercase">
                    Secure_Channels
                  </h2>
                </div>

                <div className="space-y-10 relative z-10">
                  {contactInfo.map((info) => {
                    const IconComp = info.icon;
                    return (
                      <div
                        key={info.label}
                        className="group/item flex items-start gap-5"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-emerald-500/40 transition-all duration-500">
                          <IconComp
                            className={`w-4 h-4 ${info.color} group-hover/item:scale-110 transition-transform`}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-1">
                            {info.label}
                          </p>
                          <p className="text-sm md:text-base font-medium text-white/90 group-hover/item:text-emerald-400 transition-colors break-words font-mono">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="p-8 md:p-10 border border-white/10 bg-white/[0.01] rounded-[2.5rem] shadow-2xl backdrop-blur-md">
                <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-white/30 mb-8 italic">
                  Social_Matrix
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all group"
                    >
                      <Icon
                        icon={s.icon}
                        className="text-xl md:text-2xl opacity-40 group-hover:opacity-100 group-hover:text-emerald-400 transition-all"
                      />
                      <span className="font-mono text-[8px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                        {s.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="mt-20 text-center text-[10px] font-mono text-white/30 uppercase tracking-[0.5em]">
        Nagpur, IN — Listening_on_Port:2026
      </footer>
    </div>
  );
};

export default Contact;
