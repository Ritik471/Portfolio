export interface Project {
  title: string;
  description: string;
  tags: string[];
  tech: string[];
  live: string;
  source: string;
  featured: boolean;
  color: string;
  accent: string;
}

export const projects: Project[] = [
  {
    title: "Krishna Foods Platform",
    description:
      "A comprehensive digital platform for a cloud kitchen to streamline online presence and order management. Built with a custom WhatsApp ordering system and digital menu.",
    tags: [
      "logos:nextjs-icon",
      "logos:tailwindcss-icon",
      "logos:typescript-icon",
      "logos:react",
    ],
    tech: ["Next.js", "Tailwind CSS", "WhatsApp API", "Cloud Kitchen"],
    live: "https://krishna-foods.netlify.app/",
    source: "https://github.com/Ritik471",
    featured: true,
    color: "from-orange-500/20",
    accent: "text-orange-400",
  },
  {
    title: "Personal Portfolio 2026",
    description:
      "An immersive software engineer dashboard with high-performance design. Features a custom theme system, interactive cursor effects, and responsive glassmorphic UI.",
    tags: ["logos:nextjs-icon", "logos:framer-motion", "logos:tailwindcss-icon"],
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    live: "https://ritikshah-portfolio.netlify.app/",
    source: "https://github.com/Ritik471/starfall-port",
    featured: true,
    color: "from-emerald-500/10",
    accent: "text-emerald-400",
  },
];
