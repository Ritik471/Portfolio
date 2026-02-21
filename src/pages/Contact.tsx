import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with backend
    console.log(form);
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <section className="px-6 mb-16">
        <Reveal className="max-w-6xl mx-auto">
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4">
            Contact
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
            Let's talk.
          </h1>
        </Reveal>
      </section>

      <div className="w-full h-px bg-border" />

      <section className="py-20 px-6">
        <Reveal className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div>
              <label className="font-mono text-xs text-muted-foreground mb-2 block">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full glass rounded-xl px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                placeholder="Your message..."
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
      </section>
    </div>
  );
};

export default Contact;
