/**
 * GitHub exposes achievements only on the profile page — there is no REST or
 * GraphQL endpoint for them. This parses the rendered profile HTML, which is
 * inherently fragile: if GitHub changes its markup, parsing yields nothing and
 * the caller is expected to fall back rather than render an empty section.
 */

const TIERS = ["bronze", "silver", "gold", "platinum", "diamond"];

const ACHIEVEMENT_IMG = /<img[^>]*data-hovercard-type="achievement"[^>]*>/g;
const ATTR = (name) => new RegExp(`${name}="([^"]*)"`);

const readTier = (src) => {
    const file = src.split("/").pop() ?? "";
    const tier = TIERS.find((t) => file.includes(`-${t}-`) || file.includes(`-${t}.`));
    return tier ?? null;
};

/**
 * Extract achievements from a GitHub profile page.
 * Returns [{ slug, name, tier, image }], deduplicated by slug.
 */
export const parseAchievements = (html) => {
    if (typeof html !== "string" || html === "") return [];

    const bySlug = new Map();

    for (const [tag] of html.matchAll(ACHIEVEMENT_IMG)) {
        const src = ATTR("src").exec(tag)?.[1];
        const hovercard = ATTR("data-hovercard-url").exec(tag)?.[1] ?? "";
        const alt = ATTR("alt").exec(tag)?.[1] ?? "";

        const slug = /\/achievements\/([a-z0-9-]+)\//.exec(hovercard)?.[1];
        if (!slug || !src) continue;

        // alt reads "Achievement: Pull Shark" — GitHub's own display name.
        const name = alt.replace(/^Achievement:\s*/i, "").trim();
        if (bySlug.has(slug)) continue;

        bySlug.set(slug, {
            slug,
            name: name || slug,
            tier: readTier(src),
            image: src,
        });
    }

    return [...bySlug.values()];
};
