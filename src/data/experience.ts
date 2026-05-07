export interface TimelineEntry {
  period: string;
  title: string;
  company: string;
  location: string;
  website?: string;
  description: string;
  achievements: string[];
  icon: string;
  accent: string;
}

export const workExperience: TimelineEntry[] = [
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

export const education: TimelineEntry[] = [
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
    description: "Foundational computer science and software principles.",
    achievements: ["Percentage: 88.35%", "Technical Excellence Award"],
    icon: "logos:android-icon",
    accent: "group-hover:border-blue-500",
  },
];
