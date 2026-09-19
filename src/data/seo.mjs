export const SITE_URL = "https://ritikshah-portfolio.netlify.app";
export const SITE_NAME = "Ritik Shah";
export const DEFAULT_IMAGE = "/assets/images/og/default.png";

export const routeMeta = {
  "/": {
    title: "Software Engineer & Frontend Architect",
    description:
      "Ritik Shah - software engineer in Nagpur building high-performance landing pages and scalable web applications with React, Next.js and technical SEO.",
    image: "/assets/images/og/home.png",
  },
  "/about": {
    title: "The Engineer & Builder",
    description:
      "About Ritik Shah: frontend engineering with Next.js and React, scalable monorepo architectures, plus live coding activity and listening stats.",
    image: "/assets/images/og/about.png",
  },
  "/projects": {
    title: "Selected Engineering Works",
    description:
      "Selected projects by Ritik Shah, including a cloud-kitchen commerce platform and this portfolio - built with Next.js, React, Tailwind CSS and Flutter.",
    image: "/assets/images/og/projects.png",
  },
  "/experience": {
    title: "Pathway & Growth",
    description:
      "The professional pathway of Ritik Shah - engineering roles, responsibilities and the work delivered at each step.",
    image: "/assets/images/og/experience.png",
  },
  "/certificates": {
    title: "Certified Excellence",
    description:
      "Certifications and credentials earned by Ritik Shah across frontend engineering, web development and allied technologies.",
    image: "/assets/images/og/certificates.png",
  },
  "/contact": {
    title: "Initiate Connection",
    description:
      "Get in touch with Ritik Shah about frontend engineering work, collaborations or freelance projects.",
    image: "/assets/images/og/contact.png",
  },
  "/resume": {
    title: "Resume",
    description:
      "Resume of Ritik Shah - software engineer specializing in React, Next.js, TypeScript and technical SEO, based in Nagpur, India.",
    image: "/assets/images/og/resume.png",
  },
};

export const getRouteMeta = (pathname) => routeMeta[pathname] ?? routeMeta["/"];
