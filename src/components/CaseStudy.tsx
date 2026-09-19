import { AlertTriangle } from "lucide-react";
import Reveal from "./Reveal";
import type { CaseStudy as CaseStudyData } from "../data/projects";

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-5">
    {children}
  </h2>
);

const Prose = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
    {children}
  </p>
);

const CaseStudy = ({ study }: { study: CaseStudyData }) => {
  const facts = [
    { label: "Role", value: study.role },
    { label: "Timeline", value: study.timeline },
    { label: "Context", value: study.context },
  ].filter((f) => f.value);

  return (
    <div className="space-y-16">
      {study.draft && (
        <Reveal>
          <div
            role="note"
            className="flex items-start gap-4 p-5 rounded-2xl border border-amber-600/40 bg-amber-500/10 dark:border-amber-400/30 dark:bg-amber-400/[0.06]"
          >
            <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-800 dark:text-amber-300 mb-1">
                Draft case study
              </p>
              <p className="text-sm text-amber-950/80 dark:text-muted-foreground font-light leading-relaxed">
                This page is showing sample placeholder text so the layout can be
                reviewed. Replace the{" "}
                <code className="font-semibold text-amber-800 dark:text-amber-300/90">
                  caseStudy
                </code>{" "}
                fields in{" "}
                <code className="font-semibold text-amber-800 dark:text-amber-300/90">
                  src/data/projects.ts
                </code>{" "}
                and remove{" "}
                <code className="font-semibold text-amber-800 dark:text-amber-300/90">
                  draft: true
                </code>{" "}
                before publishing.
              </p>
            </div>
          </div>
        </Reveal>
      )}

      {facts.length > 0 && (
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  {fact.label}
                </p>
                <p className="text-sm font-light leading-relaxed">{fact.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {study.metrics && study.metrics.length > 0 && (
        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {study.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-6 rounded-2xl border text-center"
                style={{
                  borderColor: "rgba(var(--surface),0.12)",
                  background: "rgba(var(--surface),0.03)",
                }}
              >
                <p className="text-3xl md:text-4xl font-bold tracking-tighter text-cyan-400 mb-2">
                  {metric.value}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {study.problem && (
        <Reveal delay={0.1}>
          <Heading>The Problem</Heading>
          <Prose>{study.problem}</Prose>
        </Reveal>
      )}

      {study.approach && (
        <Reveal delay={0.1}>
          <Heading>The Approach</Heading>
          <Prose>{study.approach}</Prose>
        </Reveal>
      )}

      {study.techDecisions && study.techDecisions.length > 0 && (
        <Reveal delay={0.1}>
          <Heading>Key Decisions</Heading>
          <div className="space-y-5">
            {study.techDecisions.map((decision) => (
              <div
                key={decision.choice}
                className="pl-5 border-l"
                style={{ borderColor: "rgba(34,211,238,0.35)" }}
              >
                <p className="text-base font-semibold tracking-tight mb-1">
                  {decision.choice}
                </p>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {decision.reason}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {study.challenges && (
        <Reveal delay={0.1}>
          <Heading>Challenges</Heading>
          <Prose>{study.challenges}</Prose>
        </Reveal>
      )}

      {study.outcome && (
        <Reveal delay={0.1}>
          <Heading>The Outcome</Heading>
          <Prose>{study.outcome}</Prose>
        </Reveal>
      )}

      {study.highlights && study.highlights.length > 0 && (
        <Reveal delay={0.1}>
          <Heading>Highlights</Heading>
          <ul className="space-y-3">
            {study.highlights.map((item) => (
              <li key={item} className="flex gap-4 text-muted-foreground font-light">
                <span className="text-cyan-400/70">—</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {study.gallery && study.gallery.length > 0 && (
        <Reveal delay={0.1}>
          <Heading>Gallery</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {study.gallery.map((shot) => (
              <figure key={shot.src}>
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: "rgba(var(--surface),0.12)" }}
                >
                  <img
                    src={shot.src}
                    alt={shot.caption ?? ""}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                  />
                </div>
                {shot.caption && (
                  <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {shot.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
};

export default CaseStudy;
