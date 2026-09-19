import { useState } from "react";
import { Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import Reveal from "../components/Reveal";
import usePageMeta from "../hooks/usePageMeta";
import { contactInfo, socials } from "../data/contact";

const Contact = () => {
  usePageMeta();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Invalid response from server. If developing locally, ensure you are running 'netlify dev'.",
        );
      }

      if (response.ok) {
        setIsSent(true);
        toast.success("Message transmitted successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSent(false), 5000);
      } else {
        throw new Error(data.error || "Failed to transmit message");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Uplink failure. Please try again.";
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen themed-bg themed-text selection:bg-emerald-500 pb-20 md:pb-40 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.svg')]" />
        <div className="absolute top-[-10%] -left-[10%] w-[70%] h-[70%] bg-emerald-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] -right-[10%] w-[60%] h-[60%] bg-cyan-600/5 blur-[140px] rounded-full" />
      </div>

      <section className="relative z-10 max-w-[1400px] mx-auto pt-32 sm:pt-40 pb-16 md:pb-20 border-b" style={{ borderColor: 'rgba(var(--surface),0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-0">
          <Reveal>
            <p className="font-mono text-[9px] sm:text-[10px] text-emerald-400 tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6 md:mb-8">
              // Establish_Uplink
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter leading-[1.0] sm:leading-[0.85] mb-8 uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-emerald-400/50">
                INITIATE
              </span>{" "}
              <br />
              <span className="inline-block py-1 sm:py-2 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground italic">
                CONNECTION.
              </span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              Ready to scale your next project? Drop a message below to start the
              <span className="text-emerald-400 font-normal">
                {" "}
                engineering dialogue
              </span>
              .
            </p>
          </Reveal>
        </div>
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
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all backdrop-blur-sm"
                      style={{ background: 'rgba(var(--surface),0.04)', borderColor: 'rgba(var(--surface),0.1)' }}
                      placeholder="e.g. Ritik Shah"
                      required
                      disabled={isSending}
                    />
                  </div>
                  <div className="space-y-3 group">
                    <label className="font-mono text-[11px] uppercase tracking-widest text-emerald-500/80 group-focus-within:text-emerald-400 transition-colors block font-semibold">
                      Email_Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all backdrop-blur-sm"
                      style={{ background: 'rgba(var(--surface),0.04)', borderColor: 'rgba(var(--surface),0.1)' }}
                      placeholder="hello@domain.com"
                      required
                      disabled={isSending}
                    />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <label className="font-mono text-[11px] uppercase tracking-widest text-emerald-500/80 group-focus-within:text-emerald-400 transition-colors block font-semibold">
                    Subject_Line
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all backdrop-blur-sm"
                    style={{ background: 'rgba(var(--surface),0.04)', borderColor: 'rgba(var(--surface),0.1)' }}
                    placeholder="Monorepo Architecture / Frontend Project"
                    required
                    disabled={isSending}
                  />
                </div>

                <div className="space-y-3 group flex-grow flex flex-col">
                  <label className="font-mono text-[11px] uppercase tracking-widest text-emerald-500/80 group-focus-within:text-emerald-400 transition-colors block font-semibold">
                    Message_Body
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full flex-grow border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all resize-none backdrop-blur-sm min-h-[200px]"
                    style={{ background: 'rgba(var(--surface),0.04)', borderColor: 'rgba(var(--surface),0.1)' }}
                    placeholder="Describe your vision..."
                    required
                    disabled={isSending}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSending}
                  className="group w-full flex items-center justify-center gap-3 bg-foreground text-background rounded-full px-8 py-5 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-emerald-400 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? "Transmitting..." : isSent ? "Message_Transmitted" : "Transmit_Message"}
                  <Send
                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isSent ? "animate-bounce text-emerald-900" : ""} ${isSending ? "animate-pulse" : ""}`}
                  />
                </motion.button>

                <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Typically replies within 24 hours
                </p>
              </form>
            </Reveal>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8 order-2 lg:order-2 h-full">
            <Reveal delay={0.2} className="flex-grow">
              <div className="p-8 md:p-10 border rounded-[2.5rem] h-full space-y-10 shadow-2xl backdrop-blur-md flex flex-col justify-center" style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.03)' }}>
                <div className="flex items-center gap-4 relative z-10">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
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
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border group-hover/item:border-emerald-500/40 transition-all duration-500" style={{ background: 'rgba(var(--surface),0.05)', borderColor: 'rgba(var(--surface),0.1)' }}>
                          <IconComp
                            className={`w-4 h-4 ${info.color} group-hover/item:scale-110 transition-transform`}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-1">
                            {info.label}
                          </p>
                          <p className="text-sm md:text-base font-medium text-foreground/90 group-hover/item:text-emerald-400 transition-colors break-words font-mono">
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
              <div className="p-8 md:p-10 border rounded-[2.5rem] shadow-2xl backdrop-blur-md" style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.01)' }}>
                <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8 italic">
                  Social_Matrix
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all group"
                      style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.05)' }}
                    >
                      <Icon
                        icon={s.icon}
                        className="text-xl md:text-2xl opacity-40 group-hover:opacity-100 group-hover:text-emerald-400 transition-all"
                      />
                      <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
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

      <footer className="mt-20 text-center text-[10px] font-mono text-muted-foreground uppercase tracking-[0.5em]">
        Nagpur, IN — Listening_on_Port:2026
      </footer>
    </div>
  );
};

export default Contact;
