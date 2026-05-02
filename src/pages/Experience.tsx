import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  ChevronRight,
  Calendar,
  ExternalLink,
} from "lucide-react";
import Reveal from "../components/Reveal";

const workExperience = [
  {
    period: "May 2025 - Present",
    title: "Frontend Web Developer",
    company: "AIGEEKS",
    location: "Remote",
    website: "https://aigeeks.ae",
    description:
      "Architecting high-performance, SEO-optimized landing pages and scalable frontend modules for web projects using structured data to maximize visibility.",
    achievements: [
      "Building scalable frontend modules",
      "Implementing structured data for SEO",
      "Optimizing landing page performance",
    ],
    icon: "logos:react",
    accent: "group-hover:border-blue-500",
  },
  {
    period: "Jan 2025 – May 2025",
    title: "UI/UX Designer Intern",
    company: "ORSCOPE TECHNOLOGIES",
    location: "Remote",
    website: "https://orscope.com",
    description:
      "Designed intuitive, high-fidelity interfaces and wireframes for web and mobile platforms to deliver seamless, user-centric digital experiences.",
    achievements: [
      "Designed high-fidelity interfaces",
      "Created wireframes for mobile & web",
      "Focused on user-centric design",
    ],
    icon: "logos:figma",
    accent: "group-hover:border-emerald-500",
  },
  {
    period: "Feb 2025 – Apr 2025",
    title: "Frontend Developer Intern",
    company: "REDSAND TECHNOLOGY",
    location: "Remote",
    website: "",
    description:
      "Developed responsive, user-centric landing pages and data-driven dashboards with a strong focus on frontend performance and clean UI design.",
    achievements: [
      "Developed data-driven dashboards",
      "Built responsive landing pages",
      "Ensured clean UI/UX implementation",
    ],
    icon: "logos:nextjs-icon",
    accent: "group-hover:border-purple-500",
  },
  {
    period: "May 2023 – July 2023",
    title: "Web Development Intern",
    company: "FUERTE DEVELOPERS",
    location: "On-site",
    website: "https://fuertedevelopers.com",
    description:
      "Built landing page clones and managed live websites by utilizing WordPress themes and plugins to deliver functional web solutions.",
    achievements: [
      "Developed landing page clones",
      "Managed WordPress live sites",
      "Utilized custom themes and plugins",
    ],
    icon: "logos:wordpress-icon",
    accent: "group-hover:border-orange-500",
  },
];

const education = [
  {
    period: "2022 — 2025",
    title: "Bachelor of Technology",
    company: "Marwadi University",
    location: "Rajkot, Gujarat",
    website: "https://www.marwadiuniversity.ac.in",
    description:
      "Computer Engineering. Focused on software architecture and full-stack development.",
    achievements: [
      "CGPA: 8.73",
      "Clean Architecture Workshop",
      "National Level Hackathon Participant",
    ],
    icon: "logos:google-cloud",
    accent: "group-hover:border-indigo-500",
  },
  {
    period: "2019 — 2021",
    title: "Diploma in Computer Technology",
    company: "Priyadarshini Polytechnic College",
    location: "Nagpur, Maharashtra",
    description:
      "Foundational computer science and software principles.",
    achievements: [
      "Percentage: 88.35%",
      "Technical Excellence Award",
    ],
    icon: "logos:android-icon",
    accent: "group-hover:border-blue-500",
  },
];

const Experience = () => {
  return (
    <div className="relative min-h-screen themed-bg themed-text selection:bg-indigo-500 pb-40 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-[-10%] -left-[10%] w-[70%] h-[70%] bg-indigo-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] -right-[10%] w-[60%] h-[60%] bg-violet-600/10 blur-[140px] rounded-full" />
      </div>

      <section className="relative z-10 px-6 lg:px-0 max-w-7xl mx-auto  pt-32 md:pt-32 pb-16 md:pb-20 border-b backdrop-blur-[2px]" style={{ borderColor: 'rgba(var(--surface),0.1)' }}>
        <Reveal className="">
          <p className="font-mono text-[10px] text-indigo-400 tracking-[0.3em] uppercase mb-8">
            // Journey_Timeline
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.85] mb-8 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-indigo-400/50">
              PATHWAY
            </span>{" "}
            <br />
            <span className="inline-block py-2 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground italic">
              & GROWTH.
            </span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            A chronological breakdown of my journey as a{" "}
            <span className="text-indigo-400 font-normal">
              Software Engineer
            </span>
            , focusing on high-performance web systems and technical SEO.
          </p>
        </Reveal>
      </section>

      <section className="relative z-10 py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-20">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border flex items-center justify-center transition-all group-hover:border-indigo-500/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]" style={{ borderColor: 'rgba(var(--surface),0.1)' }}>
                <Briefcase className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
                Work <span className="text-muted-foreground italic">Experience</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {workExperience.map((item, i) => (
              <TimelineItem
                key={item.title + item.company}
                {...item}
                isLast={i === workExperience.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative z-10 py-24 md:py-32 max-w-7xl mx-auto px-6 lg:px-0  border-y backdrop-blur-[2px]" style={{ background: 'rgba(var(--surface),0.02)', borderColor: 'rgba(var(--surface),0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-20">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border flex items-center justify-center transition-all group-hover:border-violet-500/40" style={{ borderColor: 'rgba(var(--surface),0.1)' }}>
                <GraduationCap className="w-6 h-6 text-violet-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
                Academic{" "}
                <span className="text-muted-foreground italic">Background</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {education.map((item, i) => (
              <TimelineItem key={item.title} {...item} isLast={i === education.length - 1} />
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-20 text-center text-[10px] font-mono text-muted-foreground uppercase tracking-[0.5em]">
        Nagpur, India — © 2026
      </footer>
    </div>
  );
};

const TimelineItem = ({
  period,
  title,
  company,
  location,
  description,
  achievements,
  icon,
  isLast,
  accent,
  website,
}: any) => (
  <div className="relative pl-16 pb-24 group last:pb-0">
    {!isLast && (
      <div className="absolute left-[19px] top-4 bottom-0 w-px bg-gradient-to-b from-foreground/20 via-foreground/5 to-transparent group-hover:from-indigo-500/50 transition-all duration-700" />
    )}
    <div
      className={`absolute left-0 -top-1 w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center z-10 transition-all duration-700 ${accent} group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] group-hover:scale-125`}
      style={{ borderColor: 'rgba(var(--surface),0.2)', background: 'rgba(var(--surface),0.05)' }}
    >
      <Icon
        icon={icon}
        className="w-5 h-5 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
      />
    </div>

    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.3em]">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border backdrop-blur-sm group-hover:border-indigo-500/40 transition-colors" style={{ borderColor: 'rgba(var(--surface),0.1)' }}>
          <Calendar className="w-3.5 h-3.5" /> {period}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground/70 transition-colors">
          <MapPin className="w-3.5 h-3.5" /> {location}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground group-hover:text-indigo-400 transition-colors duration-500 leading-none uppercase">
          {title}
        </h3>
        <p className="text-xl md:text-2xl text-muted-foreground font-light italic tracking-tight group-hover:text-foreground/70 flex items-center gap-3">
          {company}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </p>
      </div>

      <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl font-light group-hover:text-foreground/90 transition-colors">
        {description}
      </p>

      {achievements && (
        <ul className="grid sm:grid-cols-2 gap-5 pt-4">
          {achievements.map((a: string, i: number) => (
            <li
              key={i}
              className="text-[11px] font-mono text-muted-foreground flex items-start gap-3 group-hover:text-foreground/80 transition-colors duration-500"
            >
              <ChevronRight className="w-4 h-4  text-indigo-500/40 group-hover:text-indigo-500 transition-colors" />
              {a}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default Experience;
