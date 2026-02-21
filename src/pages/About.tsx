import { Music, ExternalLink, MapPin, Calendar, Coffee, BookOpen } from "lucide-react";
import Reveal from "../components/Reveal";

const highlights = [
  { icon: MapPin, label: "Based in", value: "San Francisco, CA" },
  { icon: Calendar, label: "Experience", value: "5+ Years" },
  { icon: Coffee, label: "Projects Delivered", value: "50+" },
  { icon: BookOpen, label: "Always", value: "Learning" },
];

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Mobile", items: ["Flutter", "React Native", "Android (Kotlin)", "iOS (SwiftUI)"] },
  { category: "Backend", items: ["Node.js", "Python", "Go", "PostgreSQL", "Redis"] },
  { category: "Design & Tools", items: ["Figma", "Adobe XD", "Git", "Docker", "AWS"] },
];

const About = () => {
  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <section className="px-6 pt-16 pb-20">
        <Reveal className="max-w-6xl mx-auto">
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4">
            About
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8">
            Engineer, builder,
            <br />
            <span className="text-muted-foreground">lifelong learner.</span>
          </h1>
        </Reveal>
      </section>

      <div className="w-full h-px bg-border" />

      {/* Quick highlights */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <Reveal key={h.label} delay={i * 0.1}>
                <div className="glass rounded-2xl p-5 text-center">
                  <Icon className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                  <p className="font-mono text-xs text-muted-foreground mb-1">{h.label}</p>
                  <p className="font-semibold">{h.value}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* Bio */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <Reveal>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a software engineer with a deep passion for building tools and systems
                that make developers' lives easier. My journey started with curiosity about
                how things work under the hood — and it hasn't stopped since.
              </p>
              <p>
                I specialize in frontend and full-stack development with TypeScript, React,
                and Flutter. I create digital experiences that are not just functional,
                but delightful — balancing performance, aesthetics, and usability in every project.
              </p>
              <p>
                From crafting pixel-perfect UIs to architecting scalable backend systems,
                I enjoy tackling challenges across the entire stack. I believe great software
                is built at the intersection of technical excellence and thoughtful design.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open-source projects,
                mentoring junior developers, or exploring the latest in design systems
                and developer tooling.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-6">
              {/* Spotify */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Music className="w-4 h-4 text-green-400" />
                  <p className="font-mono text-xs text-muted-foreground">Now Playing</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center">
                    <Music className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Midnight City</p>
                    <p className="text-sm text-muted-foreground truncate">M83 — Hurry Up, We're Dreaming</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </div>
                <div className="mt-3 h-1 rounded-full bg-accent overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-green-400" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* Skills Grid */}
      <section className="py-20 px-6">
        <Reveal className="max-w-6xl mx-auto mb-12">
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4">Expertise</p>
          <h2 className="text-4xl sm:text-5xl font-bold">Skills & Tools</h2>
        </Reveal>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.1}>
              <div className="glass rounded-2xl p-6 h-full">
                <p className="font-mono text-xs text-muted-foreground mb-4">{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-3 py-1.5 rounded-lg bg-accent text-accent-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
