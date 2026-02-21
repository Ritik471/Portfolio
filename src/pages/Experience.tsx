import Reveal from "../components/Reveal";

const workExperience = [
  {
    period: "2023 — Present",
    title: "Senior Software Engineer",
    company: "Vercel",
    description: "Leading frontend infrastructure and developer tooling initiatives. Building next-generation deployment pipelines.",
  },
  {
    period: "2021 — 2023",
    title: "Software Engineer",
    company: "Stripe",
    description: "Worked on payment processing systems handling millions of transactions. Improved API latency by 40%.",
  },
  {
    period: "2019 — 2021",
    title: "Full Stack Developer",
    company: "Figma",
    description: "Built collaborative editing features and real-time sync infrastructure using WebSockets and CRDTs.",
  },
];

const education = [
  {
    period: "2015 — 2019",
    title: "B.S. Computer Science",
    company: "MIT",
    description: "Focus on distributed systems, algorithms, and machine learning. Dean's List all semesters.",
  },
];

interface TimelineItemProps {
  period: string;
  title: string;
  company: string;
  description: string;
  index: number;
}

const TimelineItem = ({ period, title, company, description, index }: TimelineItemProps) => (
  <Reveal delay={index * 0.1}>
    <div className="relative pl-8 pb-12 last:pb-0 group">
      {/* Vertical line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-border group-last:hidden" />
      {/* Dot */}
      <div className="absolute left-[-4px] top-2 w-[9px] h-[9px] rounded-full border-2 border-muted-foreground bg-background" />

      <p className="font-mono text-xs text-muted-foreground mb-1">{period}</p>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{company}</p>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{description}</p>
    </div>
  </Reveal>
);

const Experience = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <section className="px-6 mb-16">
        <Reveal className="max-w-6xl mx-auto">
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4">
            Experience
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
            Where I've worked.
          </h1>
        </Reveal>
      </section>

      <div className="w-full h-px bg-border" />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">
          {/* Work */}
          <div>
            <Reveal>
              <h2 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-8">
                Work
              </h2>
            </Reveal>
            <div>
              {workExperience.map((item, i) => (
                <TimelineItem key={item.title} {...item} index={i} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <Reveal>
              <h2 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-8">
                Education
              </h2>
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
