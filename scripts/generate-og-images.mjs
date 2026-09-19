import { spawnSync } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

import { routeMeta, SITE_NAME } from "../src/data/seo.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "assets", "images", "og");

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

const ACCENTS = {
  "/": "#60A5FA",
  "/about": "#818CF8",
  "/projects": "#22D3EE",
  "/experience": "#A78BFA",
  "/certificates": "#34D399",
  "/contact": "#F472B6",
  "/resume": "#FBBF24",
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const page = (title, description, accent) => `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Fira+Code:wght@500&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #050505;
    font-family: 'Inter', system-ui, sans-serif;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .glow-a {
    position: absolute; top: -220px; left: -160px;
    width: 720px; height: 720px; border-radius: 50%;
    background: ${accent}; opacity: 0.16; filter: blur(130px);
  }
  .glow-b {
    position: absolute; bottom: -280px; right: -140px;
    width: 640px; height: 640px; border-radius: 50%;
    background: #7C3AED; opacity: 0.14; filter: blur(130px);
  }
  .frame {
    position: absolute; inset: 40px;
    border: 1px solid rgba(255,255,255,0.10); border-radius: 28px;
  }
  .inner {
    position: relative; height: 100%;
    padding: 88px 104px 210px;
    display: flex; flex-direction: column; justify-content: center;
  }
  .eyebrow {
    font-family: 'Fira Code', monospace; font-size: 20px; font-weight: 500;
    letter-spacing: 0.34em; text-transform: uppercase;
    color: ${accent}; margin-bottom: 30px;
  }
  h1 {
    font-size: 78px; font-weight: 800; letter-spacing: -0.035em;
    line-height: 1.02; margin-bottom: 26px; max-width: 900px;
  }
  p {
    font-size: 25px; font-weight: 400; line-height: 1.45;
    color: rgba(255,255,255,0.62); max-width: 840px;
  }
  .footer {
    position: absolute; left: 104px; right: 104px; bottom: 82px;
    display: flex; align-items: center; justify-content: space-between;
    font-family: 'Fira Code', monospace; font-size: 20px;
    letter-spacing: 0.16em; text-transform: uppercase;
  }
  .name { color: #fff; font-weight: 500; }
  .domain { color: rgba(255,255,255,0.40); }
  .rule { height: 4px; width: 92px; border-radius: 3px; background: ${accent}; margin-bottom: 34px; }
</style>
</head>
<body>
  <div class="glow-a"></div>
  <div class="glow-b"></div>
  <div class="frame"></div>
  <div class="inner">
    <div class="eyebrow">${escapeHtml(SITE_NAME)}</div>
    <div class="rule"></div>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(description)}</p>
  </div>
  <div class="footer">
    <span class="name">Software Engineer</span>
    <span class="domain">ritikshah-portfolio.netlify.app</span>
  </div>
</body>
</html>`;

const truncate = (text, max) =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error("No Chrome or Edge binary found; skipping OG image generation.");
  process.exit(0);
}

mkdirSync(OUT_DIR, { recursive: true });
const work = join(tmpdir(), `og-${Date.now()}`);
mkdirSync(work, { recursive: true });

let count = 0;
for (const [route, meta] of Object.entries(routeMeta)) {
  const name = meta.image?.split("/").pop() ?? `${route.replace(/\W+/g, "") || "home"}.png`;
  const htmlPath = join(work, `${name}.html`);
  const outPath = join(OUT_DIR, name);

  writeFileSync(
    htmlPath,
    page(meta.title, truncate(meta.description, 104), ACCENTS[route] ?? "#60A5FA"),
  );

  const result = spawnSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      `--user-data-dir=${join(work, "profile")}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--window-size=1200,630",
      "--virtual-time-budget=6000",
      `--screenshot=${outPath}`,
      `file://${htmlPath.replace(/\\/g, "/")}`,
    ],
    { stdio: "ignore" },
  );

  if (result.status !== 0 || !existsSync(outPath)) {
    console.error(`  failed: ${name}`);
    continue;
  }
  count += 1;
  console.log(`  ${name}`);
}

rmSync(work, { recursive: true, force: true });
console.log(`\ngenerated ${count} OG images in public/assets/images/og/`);
