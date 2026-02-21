import { useState } from "react";
import { Send, Mail, MapPin, Clock, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@example.com" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
  { icon: Clock, label: "Availability", value: "Open to opportunities" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen pb-28">
      <section className="px-6 pt-16 pb-16">
        <Reveal className="max-w-6xl mx-auto">
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4">
            Contact
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            Let's talk.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            Fill out the form or reach out through any of my channels below.
          </p>
        </Reveal>
      </section>

      <div className="w-full h-px bg-border" />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-16">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs text-muted-foreground mb-2 block">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-muted-foreground mb-2 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="font-mono text-xs text-muted-foreground mb-2 block">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Project inquiry, collaboration, etc."
                  required
                />
              </div>
              <div>
                <label className="font-mono text-xs text-muted-foreground mb-2 block">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={6}
                  className="w-full glass rounded-xl px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  placeholder="Tell me about your project or idea..."
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-foreground text-background rounded-xl px-6 py-3 font-medium hover:bg-foreground/90 transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>
            </form>
          </Reveal>

          {/* Sidebar Info */}
          <Reveal delay={0.2} className="lg:col-span-2 space-y-6">
            {/* Contact details */}
            <div className="glass rounded-2xl p-6 space-y-5">
              <p className="font-mono text-xs text-muted-foreground">Contact Info</p>
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">{info.label}</p>
                      <p className="text-sm font-medium">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Socials */}
            <div className="glass rounded-2xl p-6">
              <p className="font-mono text-xs text-muted-foreground mb-4">Socials</p>
              <div className="flex gap-3">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors group"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
