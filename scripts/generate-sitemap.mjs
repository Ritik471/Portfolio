import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const SITE = process.env.SITE_URL ?? "https://ritikshah-portfolio.netlify.app";
const ROUTES = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/experience", changefreq: "monthly", priority: "0.7" },
  { path: "/certificates", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "yearly", priority: "0.6" },
];
const lastmod = new Date().toISOString().slice(0, 10);
const urls = ROUTES.map(
  ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
).join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
writeFileSync(out, xml, "utf8");
console.log(`sitemap: ${ROUTES.length} routes, lastmod ${lastmod}`);
