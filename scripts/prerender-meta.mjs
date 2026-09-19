import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { routeMeta, SITE_URL, SITE_NAME, DEFAULT_IMAGE } from "../src/data/seo.mjs";
import { projects } from "../src/data/projects.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const replaceMeta = (html, attr, key, value) => {
  const pattern = new RegExp(
    `(<meta\\s+${attr}="${key}"\\s+content=")([^"]*)(")`,
    "i",
  );
  if (pattern.test(html)) {
    return html.replace(pattern, `$1${escapeAttr(value)}$3`);
  }
  return html.replace(
    "</head>",
    `  <meta ${attr}="${key}" content="${escapeAttr(value)}" />\n</head>`,
  );
};

const replaceCanonical = (html, href) =>
  html.replace(
    /(<link\s+rel="canonical"\s+href=")([^"]*)(")/i,
    `$1${escapeAttr(href)}$3`,
  );

const replaceTitle = (html, title) =>
  html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(title)}</title>`);

const template = readFileSync(join(DIST, "index.html"), "utf8");
let written = 0;

const projectRoutes = Object.fromEntries(
  projects.map((p) => [
    `/projects/${p.slug}`,
    { title: p.title, description: p.description, image: p.image },
  ]),
);

for (const [route, meta] of Object.entries({ ...routeMeta, ...projectRoutes })) {
  const fullTitle = `${meta.title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${route}`;
  const image = `${SITE_URL}${meta.image ?? DEFAULT_IMAGE}`;

  let html = template;
  html = replaceTitle(html, fullTitle);
  html = replaceMeta(html, "name", "title", fullTitle);
  html = replaceMeta(html, "name", "description", meta.description);
  html = replaceCanonical(html, url);

  html = replaceMeta(html, "property", "og:title", fullTitle);
  html = replaceMeta(html, "property", "og:description", meta.description);
  html = replaceMeta(html, "property", "og:url", url);
  html = replaceMeta(html, "property", "og:image", image);

  html = replaceMeta(html, "name", "twitter:title", fullTitle);
  html = replaceMeta(html, "name", "twitter:description", meta.description);
  html = replaceMeta(html, "name", "twitter:url", url);
  html = replaceMeta(html, "name", "twitter:image", image);

  const outPath =
    route === "/" ? join(DIST, "index.html") : join(DIST, route.slice(1), "index.html");

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  written += 1;
}

console.log(`prerender: ${written} routes with baked-in metadata`);
