import { parseAchievements } from "../lib/achievements.js";

const JSON_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=600",
};

const GITHUB_USERNAME = "ritik471";
const CONTRIBUTIONS_USERNAME = "Ritik471";
const MAX_PAGES = 5;
const TOP_LANGUAGES = 5;

const fail = (statusCode, stage, detail) => ({
    statusCode,
    headers: { ...JSON_HEADERS, "Cache-Control": "no-store" },
    body: JSON.stringify({ error: true, stage, detail }),
});

export const handler = async (event, context) => {
    const { GITHUB_TOKEN } = process.env;

    const headers = {
        Accept: "application/vnd.github+json",
        "User-Agent": "ritikshah-portfolio",
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
    };

    try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            headers,
        });

        if (!userRes.ok) {
            const rateLimited =
                userRes.status === 403 && userRes.headers.get("x-ratelimit-remaining") === "0";
            return fail(502, "github-user", {
                status: userRes.status,
                rateLimited,
                hint: rateLimited ? "Set GITHUB_TOKEN to raise the rate limit" : null,
            });
        }

        const user = await userRes.json();

        const repos = [];
        for (let page = 1; page <= MAX_PAGES; page += 1) {
            const res = await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}`,
                { headers },
            );
            if (!res.ok) break;
            const batch = await res.json();
            if (!Array.isArray(batch) || batch.length === 0) break;
            repos.push(...batch);
            if (batch.length < 100) break;
        }

        const stars = repos.reduce((acc, r) => acc + (r.stargazers_count ?? 0), 0);
        const forks = repos.reduce((acc, r) => acc + (r.forks_count ?? 0), 0);

        const counts = new Map();
        for (const repo of repos) {
            if (!repo.language) continue;
            counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
        }
        const totalLangs = [...counts.values()].reduce((a, b) => a + b, 0);

        const languages =
            totalLangs > 0
                ? [...counts.entries()]
                      .map(([name, count]) => ({
                          name,
                          pct: Math.round((count / totalLangs) * 100),
                      }))
                      .sort((a, b) => b.pct - a.pct)
                      .slice(0, TOP_LANGUAGES)
                : [];

        let achievements = [];
        try {
            const profileRes = await fetch(`https://github.com/${GITHUB_USERNAME}`, {
                headers: { "User-Agent": "ritikshah-portfolio" },
            });
            if (profileRes.ok) {
                achievements = parseAchievements(await profileRes.text());
            }
        } catch {
        }

        let contributions = [];
        let totalContributions = 0;
        try {
            const cRes = await fetch(
                `https://github-contributions-api.jogruber.de/v4/${CONTRIBUTIONS_USERNAME}`,
            );
            if (cRes.ok) {
                const cJson = await cRes.json();
                contributions = Array.isArray(cJson.contributions) ? cJson.contributions : [];
                totalContributions = Object.values(cJson.total ?? {}).reduce(
                    (a, b) => a + b,
                    0,
                );
            }
        } catch {
        }

        return {
            statusCode: 200,
            headers: JSON_HEADERS,
            body: JSON.stringify({
                stats: {
                    repos: String(user.public_repos ?? 0),
                    stars: String(stars),
                    followers: String(user.followers ?? 0),
                    forks: String(forks),
                    languages,
                },
                achievements,
                contributions,
                totalContributions,
            }),
        };
    } catch (error) {
        return fail(500, "exception", error.message);
    }
};
