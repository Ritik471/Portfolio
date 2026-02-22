import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  ChevronRight,
  Calendar,
} from "lucide-react";
import Reveal from "../components/Reveal";

const workExperience = [
  {
    period: "2025 — Present",
    title: "Technical SEO Engineer",
    company: "Dubai-based AI Company",
    location: "Remote / Dubai, UAE",
    description:
      "Architecting technical SEO strategies and metadata optimization for a high-growth AI firm. Implementing structured data and JSON-LD to enhance search visibility across the Middle East market.",
    achievements: [
      "Optimized keyword mapping for AI services",
      "Enhanced search visibility by 40%",
      "Built automated metadata injection pipelines",
    ],
    icon: "logos:google-search-console",
    accent: "group-hover:border-blue-500",
  },
  {
    period: "2025 — 2026",
    title: "Lead Developer",
    company: "Krishna Food's",
    location: "Nagpur, India",
    description:
      "Built and launched a comprehensive digital platform for a family-owned cloud kitchen. Developed a custom WhatsApp-based ordering system and managed full-stack deployment.",
    achievements: [
      "Integrated WhatsApp ordering API",
      "Set up Google Analytics & Search Console",
      "Managed 100% platform uptime",
    ],
    icon: "logos:react",
    accent: "group-hover:border-emerald-500",
  },
  {
    period: "2025",
    title: "Frontend Developer",
    company: "Portfolio Project (Mohamed Bamatraf)",
    location: "Nagpur, India",
    description:
      "Designed and developed a minimal, subtle personal portfolio for Mohamed Bamatraf, focusing on clean UI and smooth user transitions.",
    achievements: [
      "Implemented Framer Motion animations",
      "Built responsive bento-grid layouts",
      "Optimized asset loading for sub-1s TTI",
    ],
    icon: "logos:nextjs-icon",
    accent: "group-hover:border-purple-500",
  },
];

const education = [
  {
    period: "2021 — 2025",
    title: "Bachelor of Technology (B.Tech)",
    company: "Engineering University",
    location: "Nagpur, India",
    description:
      "Specialized in Software Engineering and Web Technologies. Cherished late-night study marathons and collaborative coding sessions with hostel friends.",
    achievements: [
      "Expertise in Web Dev Monorepos",
      "Specialized in Vancouver Citation style",
      "Hosted late-night study sessions",
    ],
    icon: "logos:google-cloud",
    accent: "group-hover:border-indigo-500",
  },
];

const Experience = () => {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-indigo-500 selection:text-white pb-40 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-[-10%] -left-[10%] w-[70%] h-[70%] bg-indigo-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] -right-[10%] w-[60%] h-[60%] bg-violet-600/10 blur-[140px] rounded-full" />
      </div>

      <section className="relative z-10 px-4 md:px-6 pt-32 md:pt-32 pb-16 md:pb-20 border-b border-white/10 backdrop-blur-[2px]">
        <Reveal className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] text-indigo-400 tracking-[0.3em] uppercase mb-8">
            // Journey_Timeline
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.85] mb-8 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-indigo-400/50">
              PATHWAY
            </span>{" "}
            <br />
            <span className="inline-block py-2 text-transparent bg-clip-text bg-gradient-to-b from-white/60 to-white/10 italic">
              & GROWTH.
            </span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-white/70 font-light leading-relaxed">
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
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-white/10 flex items-center justify-center transition-all group-hover:border-indigo-500/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <Briefcase className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
                Work <span className="text-white/40 italic">Experience</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {workExperience.map((item, i) => (
              <TimelineItem
                key={item.title + item.company}
                {...item}
                isLast={false}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative z-10 py-24 md:py-32 px-6 bg-white/[0.02] border-y border-white/10 backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-20">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-white/10 flex items-center justify-center transition-all group-hover:border-violet-500/40">
                <GraduationCap className="w-6 h-6 text-violet-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
                Academic{" "}
                <span className="text-white/40 italic">Background</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {education.map((item, i) => (
              <TimelineItem key={item.title} {...item} isLast={true} />
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-20 text-center text-[10px] font-mono text-white/30 uppercase tracking-[0.5em]">
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
}: any) => (
  <div className="relative pl-16 pb-24 group last:pb-0">
    {!isLast && (
      <div className="absolute left-[19px] top-4 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent group-hover:from-indigo-500/50 transition-all duration-700" />
    )}
    <div
      className={`absolute left-0 top-1.5 w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center z-10 transition-all duration-700 ${accent} group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] group-hover:scale-125 group-hover:bg-black`}
    >
      <Icon
        icon={icon}
        className="w-5 h-5 grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
      />
    </div>

    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.3em]">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-white/10 backdrop-blur-sm group-hover:border-indigo-500/40 transition-colors">
          <Calendar className="w-3.5 h-3.5" /> {period}
        </div>
        <div className="flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors">
          <MapPin className="w-3.5 h-3.5" /> {location}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white group-hover:text-indigo-400 transition-colors duration-500 leading-none uppercase">
          {title}
        </h3>
        <p className="text-xl md:text-2xl text-white/40 font-light italic tracking-tight group-hover:text-white/70">
          {company}
        </p>
      </div>

      <p className="text-white/60 text-lg leading-relaxed max-w-4xl font-light group-hover:text-white/90 transition-colors">
        {description}
      </p>

      {achievements && (
        <ul className="grid sm:grid-cols-2 gap-5 pt-4">
          {achievements.map((a: string, i: number) => (
            <li
              key={i}
              className="text-[11px] font-mono text-white/40 flex items-start gap-3 group-hover:text-white/80 transition-colors duration-500"
            >
              <ChevronRight className="w-4 h-4 mt-0.5 text-indigo-500/40 group-hover:text-indigo-500 transition-colors" />
              {a}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default Experience;
