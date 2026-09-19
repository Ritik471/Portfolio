export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  draft?: boolean;
  role?: string;
  timeline?: string;
  context?: string;
  problem?: string;
  approach?: string;
  challenges?: string;
  outcome?: string;
  metrics?: CaseStudyMetric[];
  techDecisions?: { choice: string; reason: string }[];
  highlights?: string[];
  gallery?: { src: string; caption?: string }[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  tech: string[];
  live: string;
  source: string;
  image?: string;
  statusId?: string;
  caseStudy?: CaseStudy;
  featured: boolean;
  color: string;
  accent: string;
}

export const projects: Project[] = [
  {
    slug: "krishna-foods",
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
    statusId: "krishna-foods",
    caseStudy: {
      draft: true,
      role: "SAMPLE - replace with your actual role on this project",
      timeline: "SAMPLE - e.g. 6 weeks, Feb-Mar 2026",
      context: "SAMPLE - one line on who this was for and why it existed.",
      problem:
        "SAMPLE PLACEHOLDER. Describe the concrete problem: what was broken, slow, manual or missing before Krishna Foods existed, and who it affected. Replace this text before publishing.",
      approach:
        "SAMPLE PLACEHOLDER. Describe how you solved it and, more importantly, why you made the choices you did. This is the section engineers actually read. Replace this text before publishing.",
      challenges:
        "SAMPLE PLACEHOLDER. Describe something that went wrong or turned out harder than expected, and how you handled it. Replace this text before publishing.",
      outcome:
        "SAMPLE PLACEHOLDER. Describe what measurably changed after launch. Replace this text before publishing.",
      metrics: [
        { label: "Sample metric", value: "--" },
        { label: "Sample metric", value: "--" },
        { label: "Sample metric", value: "--" },
      ],
      techDecisions: [
        {
          choice: "SAMPLE - technology or pattern chosen",
          reason: "SAMPLE - why it beat the alternative you considered.",
        },
        {
          choice: "SAMPLE - another decision",
          reason: "SAMPLE - the trade-off you accepted and why.",
        },
      ],
      highlights: [
        "SAMPLE highlight - replace before publishing",
        "SAMPLE highlight - replace before publishing",
        "SAMPLE highlight - replace before publishing",
      ],
    },


    image: "/assets/images/projects/krishna-foods.webp",
    live: "https://krishna-foods.netlify.app/",
    source: "https://github.com/Ritik471",
    featured: true,
    color: "from-orange-500/20",
    accent: "text-orange-400",
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio 2026",
    description:
      "An immersive software engineer dashboard with high-performance design. Features a custom theme system, interactive cursor effects, and responsive glassmorphic UI.",
    tags: ["logos:nextjs-icon", "logos:framer", "logos:tailwindcss-icon"],
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    statusId: "portfolio",
    caseStudy: {
      role: "Sole designer, engineer and maintainer",
      timeline: "Ongoing, 2026",
      context:
        "My own portfolio, rebuilt so that the site itself is evidence of the engineering it claims.",
      problem:
        "Most developer portfolios are brochures: a static list of projects, a stack of logos, and numbers nobody can check. I wanted the opposite. If I claim performance, SEO and systems thinking, the site should demonstrate them rather than assert them, and any figure it shows should be real enough that a visitor could verify it.",
      approach:
        "Every third-party integration runs server-side through Netlify functions rather than from the browser. That keeps credentials out of the client bundle, keeps rate limits under my control rather than the visitor's, and sidesteps CORS entirely. Each function reports failure by stage, so a broken integration tells me exactly which step failed instead of going quietly blank. When live data is unavailable the interface says so plainly; it never fills the gap with invented figures.",
      challenges:
        "Three things resisted the obvious solution. Spotify blocked Web API access without a Premium subscription, so the now-playing card reads Last.fm, which scrobbles the same listening history. GitHub exposes achievements in neither its REST nor GraphQL API, so those badges come from parsing the profile page, isolated behind one function that returns nothing rather than guessing when the markup changes. And because this is a single-page app, client-side meta tags were invisible to link crawlers, which do not execute JavaScript, so every shared URL previewed as the home page.",
      outcome:
        "The site now runs five serverless endpoints, prerenders nine routes with their own metadata at build time, and is covered by 61 automated tests. No API key reaches the browser. Every statistic on the page is fetched live or labelled as unavailable.",
      metrics: [
        { label: "Automated tests", value: "61" },
        { label: "Prerendered routes", value: "9" },
        { label: "Serverless endpoints", value: "5" },
        { label: "Keys in client bundle", value: "0" },
      ],
      techDecisions: [
        {
          choice: "Fetch third-party data server-side, not in the browser",
          reason:
            "An earlier version read Spotify credentials through import.meta.env, which compiles them into the public bundle. Moving every integration behind a function removed that exposure and replaced the visitor's shared rate limit with an edge-cached response.",
        },
        {
          choice: "Prerender each route at build time instead of adopting SSR",
          reason:
            "Link previews only needed correct metadata in the served HTML, not a full server-rendering framework. A post-build step writes one HTML file per route, which solved the problem without a migration.",
        },
        {
          choice: "Pre-generate social cards rather than render them per request",
          reason:
            "The routes are fixed, so generating the images once removes a runtime dependency, a cold start and a per-request cost. Regenerating is a single script when a title changes.",
        },
        {
          choice: "Show explicit empty states instead of fallback numbers",
          reason:
            "The coding-activity card used to display hardcoded defaults whenever its API returned nothing, presenting invented hours as live tracking. Real data or an honest blank is the only version worth shipping.",
        },
      ],
      highlights: [
        "Live coding activity from the authenticated WakaTime API, windowed in the account timezone so today is never dropped",
        "GitHub stats, contribution graph and achievement badges aggregated in one edge-cached request",
        "Uptime probing that shows a live response time on each project card",
        "Command palette, per-route structured data, generated social cards and a build-time sitemap",
        "An error boundary that contains a failed section instead of blanking the page",
      ],
    },

    image: "/assets/images/projects/portfolio.webp",
    live: "https://ritikshah-portfolio.netlify.app/",
    source: "https://github.com/Ritik471/starfall-port",
    featured: true,
    color: "from-emerald-500/10",
    accent: "text-emerald-400",
  },
];
