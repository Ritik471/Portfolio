import type { LucideIcon } from "lucide-react";
import { Cpu, Monitor, Search, Smartphone } from "lucide-react";

export interface Service {
  title: string;
  desc: string;
  icon: LucideIcon;
  accent: string;
  hoverBorder: string;
  glow: string;
}

export const services: Service[] = [
  {
    title: "Frontend Engineering",
    desc: "Architecting sub-second TTI interfaces with React and Next.js server components.",
    icon: Monitor,
    accent: "!text-blue-400",
    hoverBorder: "hover:!border-blue-400",
    glow: "bg-blue-800",
  },
  {
    title: "Mobile Solutions",
    desc: "Cross-platform mastery using Flutter for native-performance apps.",
    icon: Smartphone,
    accent: "!text-emerald-400",
    hoverBorder: "hover:!border-emerald-400/50",
    glow: "bg-emerald-800",
  },
  {
    title: "SEO Architecture",
    desc: "Technical SEO integration with JSON-LD and semantic HTML for global search dominance.",
    icon: Search,
    accent: "!text-yellow-400",
    hoverBorder: "hover:!border-yellow-400/50",
    glow: "bg-yellow-800",
  },
  {
    title: "System Design",
    desc: "Building scalable monorepo structures and type-safe backend integrations.",
    icon: Cpu,
    accent: "!text-purple-400",
    hoverBorder: "hover:!border-purple-400/50",
    glow: "bg-purple-800",
  },
];

export interface Principle {
  title: string;
  desc: string;
  icon: string;
  tag: string;
  glow: string;
}

export const principles: Principle[] = [
  {
    title: "Performance First",
    desc: "I prioritize Core Web Vitals, ensuring sub-second TTI is my baseline for production deployment.",
    icon: "line-md:gauge-loop",
    tag: "Optimization",
    glow: "bg-blue-500/10",
  },
  {
    title: "Scalable Architecture",
    desc: "Implementing modular monorepos and type-safe systems to ensure enterprise platforms remain maintainable.",
    icon: "line-md:cloud-braces-loop",
    tag: "Architecture",
    glow: "bg-purple-500/10",
  },
  {
    title: "SEO Engineering",
    desc: "Integrating structured data during development to ensure maximum organic reach and discoverability.",
    icon: "line-md:search-twotone",
    tag: "Growth",
    glow: "bg-emerald-500/10",
  },
];

export interface TechItem {
  name: string;
  icon: string;
  color: string;
  border: string;
}

export const techStack: TechItem[] = [
  {
    name: "React",
    icon: "logos:react",
    color: "group-hover:shadow-blue-500/40",
    border: "hover:border-blue-500/50",
  },
  {
    name: "Next.js",
    icon: "logos:nextjs-icon",
    color: "group-hover:shadow-white/20",
    border: "hover:border-white/50",
  },
  {
    name: "TypeScript",
    icon: "logos:typescript-icon",
    color: "group-hover:shadow-blue-600/40",
    border: "hover:border-blue-600/50",
  },
  {
    name: "Tailwind",
    icon: "logos:tailwindcss-icon",
    color: "group-hover:shadow-cyan-400/40",
    border: "hover:border-cyan-400/50",
  },
  {
    name: "Dart",
    icon: "logos:dart",
    color: "group-hover:shadow-blue-400/40",
    border: "hover:border-blue-400/50",
  },
  {
    name: "Flutter",
    icon: "logos:flutter",
    color: "group-hover:shadow-blue-400/40",
    border: "hover:border-blue-400/50",
  },
  {
    name: "Figma",
    icon: "logos:figma",
    color: "group-hover:shadow-purple-500/40",
    border: "hover:border-purple-500/50",
  },
  {
    name: "VS Code",
    icon: "logos:visual-studio-code",
    color: "group-hover:shadow-blue-500/40",
    border: "hover:border-blue-500/50",
  },
  {
    name: "Postman",
    icon: "logos:postman-icon",
    color: "group-hover:shadow-orange-500/40",
    border: "hover:border-orange-500/50",
  },
  {
    name: "GitHub",
    icon: "line-md:github-loop",
    color: "group-hover:shadow-white/20",
    border: "hover:border-white/50",
  },
  {
    name: "Android",
    icon: "logos:android-icon",
    color: "group-hover:shadow-green-500/40",
    border: "hover:border-green-500/50",
  },
  {
    name: "WordPress",
    icon: "logos:wordpress-icon",
    color: "group-hover:shadow-blue-900/40",
    border: "hover:border-blue-900/50",
  },
];

export interface Achievement {
  slug: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
  border: string;
  bg: string;
  tier?: string | null;
}

/** Presentation for each achievement, keyed by GitHub's own slug. */
export const achievementStyles: Record<
  string,
  Pick<Achievement, "desc" | "icon" | "color" | "border" | "bg">
> = {
  "pull-shark": {
    desc: "Merged multiple Pull Requests",
    icon: "mdi:shark",
    color: "text-blue-400",
    border: "border-blue-400/20",
    bg: "bg-blue-400/5",
  },
  quickdraw: {
    desc: "Closed PRs within 5 minutes",
    icon: "ph:timer-duotone",
    color: "text-purple-400",
    border: "border-purple-400/20",
    bg: "bg-purple-400/5",
  },
  yolo: {
    desc: "Merged without review",
    icon: "ph:lightning-duotone",
    color: "text-orange-400",
    border: "border-orange-400/20",
    bg: "bg-orange-400/5",
  },
  "pair-extraordinaire": {
    desc: "Co-authored merged commits",
    icon: "ph:users-three-duotone",
    color: "text-emerald-400",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/5",
  },
  starstruck: {
    desc: "Created a repository with many stars",
    icon: "ph:star-duotone",
    color: "text-yellow-400",
    border: "border-yellow-400/20",
    bg: "bg-yellow-400/5",
  },
  "galaxy-brain": {
    desc: "Answered discussions",
    icon: "ph:brain-duotone",
    color: "text-pink-400",
    border: "border-pink-400/20",
    bg: "bg-pink-400/5",
  },
};

export const achievementFallbackStyle = {
  desc: "GitHub achievement",
  icon: "ph:trophy-duotone",
  color: "text-slate-300",
  border: "border-slate-300/20",
  bg: "bg-slate-300/5",
};

/**
 * Shown only if the live lookup fails. Kept in sync with the real profile so a
 * fallback never shows something untrue.
 */
export const fallbackAchievements: Achievement[] = [
  { slug: "pull-shark", name: "Pull Shark", tier: "gold", ...achievementStyles["pull-shark"] },
  { slug: "quickdraw", name: "Quickdraw", tier: null, ...achievementStyles.quickdraw },
  { slug: "yolo", name: "YOLO", tier: null, ...achievementStyles.yolo },
  {
    slug: "pair-extraordinaire",
    name: "Pair Extraordinaire",
    tier: null,
    ...achievementStyles["pair-extraordinaire"],
  },
];

export const githubLangColors: Record<string, string> = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-400",
  Rust: "bg-orange-400",
  Go: "bg-cyan-400",
  Dart: "bg-blue-300",
  HTML: "bg-orange-500",
  CSS: "bg-pink-400",
  Java: "bg-red-400",
  PHP: "bg-indigo-400",
  C: "bg-gray-300",
};
