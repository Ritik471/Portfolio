import Reveal from "../components/Reveal";

const workExperience = [
  {
    period: "2023 — Present",
    title: "Senior Software Engineer",
    company: "Vercel",
    description: "Leading frontend infrastructure and developer tooling initiatives. Building next-generation deployment pipelines and optimizing build performance for thousands of enterprise customers.",
    achievements: ["Reduced build times by 60%", "Led team of 5 engineers", "Shipped framework-agnostic edge runtime"],
  },
  {
    period: "2021 — 2023",
    title: "Software Engineer",
    company: "Stripe",
    description: "Worked on payment processing systems handling millions of transactions daily. Improved API latency by 40% and contributed to the redesign of the developer dashboard.",
    achievements: ["Processed $2B+ in transactions", "Improved API p99 latency by 40%", "Built real-time fraud detection module"],
  },
  {
    period: "2019 — 2021",
    title: "Full Stack Developer",
    company: "Figma",
    description: "Built collaborative editing features and real-time sync infrastructure using WebSockets and CRDTs. Contributed to the plugin API and design system components.",
    achievements: ["Shipped multiplayer cursors feature", "Created plugin marketplace", "Reduced sync conflicts by 85%"],
  },
];

const education = [
  {
    period: "2015 — 2019",
    title: "B.S. Computer Science",
    company: "MIT",
    description: "Focus on distributed systems, algorithms, and machine learning. Dean's List all semesters. Published research on optimizing consensus protocols in distributed databases.",
    achievements: ["Dean's List — All Semesters", "Published 2 research papers", "TA for Distributed Systems"],
  },
];

interface TimelineItemProps {
  period: string;
  title: string;
  company: string;
  description: string;
  achievements?: string[];
  index: number;
}

const TimelineItem = ({ period, title, company, description, achievements, index }: TimelineItemProps) => (
  <Reveal delay={index * 0.1}>
    <div className="relative pl-8 pb-12 last:pb-0 group">
      <div className="absolute left-0 top-2 bottom-0 w-px bg-border group-last:hidden" />
      <div className="absolute left-[-4px] top-2 w-[9px] h-[9px] rounded-full border-2 border-muted-foreground bg-background" />

      <p className="font-mono text-xs text-muted-foreground mb-1">{period}</p>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{company}</p>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-3">{description}</p>
      {achievements && (
        <ul className="space-y-1">
          {achievements.map((a) => (
            <li key={a} className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              {a}
            </li>
          ))}
        </ul>
      )}
    </div>
  </Reveal>
);

const Experience = () => {
  return (
    <div className="min-h-screen pb-28">
      <section className="px-6 pt-16 pb-16">
        <Reveal className="max-w-6xl mx-auto">
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4">
            Experience
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            Where I've worked.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A timeline of my professional journey — from building collaborative tools at Figma
            to scaling payment infrastructure at Stripe and leading frontend architecture at Vercel.
          </p>
        </Reveal>
      </section>

      <div className="w-full h-px bg-border" />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <Reveal>
              <h2 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-8">Work</h2>
            </Reveal>
            <div>
              {workExperience.map((item, i) => (
                <TimelineItem key={item.title + item.company} {...item} index={i} />
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-8">Education</h2>
            </Reveal>
            <div>
              {education.map((item, i) => (
                <TimelineItem key={item.title} {...item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
