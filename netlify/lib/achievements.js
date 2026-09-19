/**
 * GitHub exposes achievements only on the profile page — there is no REST or
 * GraphQL endpoint for them. This parses the rendered profile HTML, which is
 * inherently fragile: if GitHub changes its markup, parsing yields nothing and
 * the caller is expected to fall back rather than render an empty section.
 */

// Slug -> display name. Unknown slugs are title-cased from the slug itself, so
// a newly introduced achievement still renders with a sensible label.
const KNOWN_NAMES = {
    "pull-shark": "Pull Shark",
    "quickdraw": "Quickdraw",
    "yolo": "YOLO",
    "pair-extraordinaire": "Pair Extraordinaire",
    "starstruck": "Starstruck",
    "galaxy-brain": "Galaxy Brain",
    "public-sponsor": "Public Sponsor",
    "arctic-code-vault-contributor": "Arctic Code Vault Contributor",
    "heart-on-your-sleeve": "Heart On Your Sleeve",
    "open-sourcerer": "Open Sourcerer",
};

const TIERS = ["bronze", "silver", "gold", "platinum", "diamond"];

const titleCase = (slug) =>
    slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

/**
 * Extract achievements from a GitHub profile page.
 * Returns [{ slug, name, tier }], tier being a medal name or null.
 */
export const parseAchievements = (html) => {
    if (typeof html !== "string" || html === "") return [];

    const slugs = new Set();
    for (const match of html.matchAll(/achievement=([a-z0-9-]+)/g)) {
        slugs.add(match[1]);
    }

    return [...slugs].map((slug) => {
        // Asset filenames carry the tier, e.g. pull-shark-gold-<hash>.png
        const assetRe = new RegExp(`${slug}-(${TIERS.join("|")}|default)[a-z0-9-]*\.png`);
        const tier = assetRe.exec(html)?.[1] ?? null;

        return {
            slug,
            name: KNOWN_NAMES[slug] ?? titleCase(slug),
            tier: tier === "default" ? null : tier,
        };
    });
};
