import { Printer, Download, Mail, MapPin, Globe } from "lucide-react";
import usePageMeta from "../hooks/usePageMeta";
import { workExperience, education } from "../data/experience";
import { skills } from "../data/about";
import { projects } from "../data/projects";
import { contactInfo, socials } from "../data/contact";

const CV_URL = "/assets/images/pdf/cv.pdf";

const Resume = () => {
  usePageMeta({
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: { "@id": "https://ritikshah-portfolio.netlify.app/#person" },
    },
  });

  const email = contactInfo.find((d) => d.label === "Email")?.value;
  const location = contactInfo.find((d) => d.label === "Location")?.value;

  return (
    <div className="relative min-h-screen themed-bg themed-text pb-20 print:bg-white print:text-black">
      <div className="fixed inset-0 z-0 pointer-events-none print:hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.svg')]" />
        <div className="absolute -top-[10%] -right-[10%] w-[55%] h-[55%] bg-amber-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 sm:pt-40 print:pt-0">
        <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4 print:hidden">
              // Resume
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter uppercase mb-3">
              Ritik Shah
            </h1>
            <p className="text-lg text-muted-foreground font-light print:text-black">
              Software Engineer &middot; Frontend Architect
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-xs font-mono text-muted-foreground print:text-black">
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  {email}
                </a>
              )}
              {location && (
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {location}
                </span>
              )}
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-3 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest hover:border-white/40 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <a
              href={CV_URL}
              download
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs font-mono uppercase tracking-widest hover:border-amber-400/60 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              PDF
            </a>
          </div>
        </div>

        <Section title="Experience">
          <div className="space-y-8">
            {workExperience.map((role) => (
              <div key={`${role.company}-${role.period}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {role.title}
                    <span className="text-muted-foreground font-normal print:text-black">
                      {" "}&middot; {role.company}
                    </span>
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground print:text-black">
                    {role.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed font-light print:text-black">
                  {role.description}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {role.achievements.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-muted-foreground font-light flex gap-3 print:text-black"
                    >
                      <span className="text-amber-400/70 print:text-black">&mdash;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-6">
            {education.map((item) => (
              <div key={`${item.company}-${item.period}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold tracking-tight">
                    {item.title}
                    <span className="text-muted-foreground font-normal print:text-black">
                      {" "}&middot; {item.company}
                    </span>
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground print:text-black">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed font-light print:text-black">
                  {item.description}
                </p>
                {item.achievements.length > 0 && (
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2 print:text-black">
                    {item.achievements.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Skills">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((group) => (
              <div key={group.category}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 print:text-black">
                  {group.category}
                </p>
                <p className="text-sm font-light leading-relaxed">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Selected Projects">
          <div className="space-y-5">
            {projects.map((project) => (
              <div key={project.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold tracking-tight">{project.title}</h3>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors print:text-black"
                  >
                    {project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed font-light print:text-black">
                  {project.description}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2 print:text-black">
                  {project.tech.join(" / ")}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12 pt-8 border-t" style={{ borderColor: "rgba(var(--surface),0.12)" }}>
    <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6 print:text-black">
      {title}
    </h2>
    {children}
  </section>
);

export default Resume;
