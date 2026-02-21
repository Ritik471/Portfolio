import { Music, ExternalLink } from "lucide-react";
import Reveal from "../components/Reveal";

const About = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Header */}
      <section className="px-6 mb-20">
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
                I specialize in full-stack development with TypeScript, React, and Node.js,
                but I'm equally comfortable working with Go, Python, and Rust. I believe in
                writing code that is not just functional, but elegant and maintainable.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open-source projects,
                exploring distributed systems, or diving into a new programming language.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-6">
              {/* Skills */}
              <div className="glass rounded-2xl p-6">
                <p className="font-mono text-xs text-muted-foreground mb-4">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "TypeScript", "React", "Next.js", "Node.js", "Go", "Python",
                    "PostgreSQL", "Redis", "Docker", "AWS", "GraphQL", "Rust",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-3 py-1.5 rounded-lg bg-accent text-accent-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

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
    </div>
  );
};

export default About;
