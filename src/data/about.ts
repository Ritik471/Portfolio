import type { LucideIcon } from "lucide-react";
import { BookOpen, Calendar, Coffee, MapPin } from "lucide-react";

export interface Highlight {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  bg: string;
}

export const highlights: Highlight[] = [
  {
    icon: MapPin,
    label: "Based in",
    value: "Nagpur, India",
    color: "text-blue-400",
    bg: "group-hover:bg-blue-500/10",
  },
  {
    icon: Calendar,
    label: "Experience",
    value: "1+ Year",
    color: "text-purple-400",
    bg: "group-hover:bg-purple-500/10",
  },
  {
    icon: Coffee,
    label: "Projects",
    value: "10+ Live",
    color: "text-emerald-400",
    bg: "group-hover:bg-emerald-500/10",
  },
  {
    icon: BookOpen,
    label: "Status",
    value: "Lifelong Learner",
    color: "text-yellow-400",
    bg: "group-hover:bg-yellow-500/10",
  },
];

export interface SkillGroup {
  category: string;
  icon: string;
  items: string[];
  accent: string;
  glow: string;
}

export const skills: SkillGroup[] = [
  {
    category: "Frontend Architecture",
    icon: "logos:react",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    accent: "group-hover:border-blue-500/50",
    glow: "bg-blue-500/5",
  },
  {
    category: "Mobile Solutions",
    icon: "logos:flutter",
    items: ["Flutter", "React Native", "Dart"],
    accent: "group-hover:border-emerald-500/50",
    glow: "bg-emerald-500/5",
  },
  {
    category: "Design & UX",
    icon: "logos:figma",
    items: ["Figma", "Wireframing", "Prototyping", "Responsive Layouts"],
    accent: "group-hover:border-purple-500/50",
    glow: "bg-purple-500/5",
  },
  {
    category: "Specialized",
    icon: "logos:google-search-console",
    items: ["Technical SEO", "WordPress", "PostgreSQL", "Git & GitHub"],
    accent: "group-hover:border-yellow-500/50",
    glow: "bg-yellow-500/5",
  },
];
