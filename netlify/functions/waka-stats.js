const JSON_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=300",
};

const LANG_COLORS = {
    TypeScript: "#3178C6",
    JavaScript: "#F1E05A",
    "TSX": "#3178C6",
    "JSX": "#61DAFB",
    Python: "#3572A5",
    Rust: "#DEA584",
    Go: "#00ADD8",
    Java: "#B07219",
    "C++": "#F34B7D",
    C: "#555555",
    "C#": "#178600",
    HTML: "#E34C26",
    CSS: "#563D7C",
    SCSS: "#C6538C",
    JSON: "#8BC34A",
    Markdown: "#9CA3AF",
    YAML: "#CB171E",
    TOML: "#9C4221",
    Bash: "#89E051",
    Shell: "#89E051",
    SQL: "#E38C00",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Dart: "#00B4AB",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Vue: "#41B883",
    Svelte: "#FF3E00",
    Other: "#9CA3AF",
};

const FALLBACK_COLOR = "#9CA3AF";
const MAX_LANGS = 4;

const fail = (statusCode, stage, detail) => ({
    statusCode,
    headers: { ...JSON_HEADERS, "Cache-Control": "no-store" },
    body: JSON.stringify({ error: true, stage, detail }),
});

const humanize = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} hrs ${mins} mins`;
};

const isoDateIn = (date, timeZone) =>
    new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);

const aggregate = (days, key) => {
    const totals = new Map();
    for (const day of days) {
        for (const entry of day[key] ?? []) {
            if (!entry?.name) continue;
            totals.set(entry.name, (totals.get(entry.name) ?? 0) + (entry.total_seconds ?? 0));
        }
    }
    return [...totals.entries()]
        .filter(([, seconds]) => seconds > 0)
        .sort((a, b) => b[1] - a[1]);
};

export const handler = async (event, context) => {
    const { WAKATIME_API_KEY } = process.env;

    if (!WAKATIME_API_KEY) {
        return fail(500, "env", "Missing environment variable: WAKATIME_API_KEY");
    }

    const auth = Buffer.from(WAKATIME_API_KEY).toString("base64");
    const authHeader = { Authorization: `Basic ${auth}` };

    try {
        const meRes = await fetch("https://wakatime.com/api/v1/users/current", {
            headers: authHeader,
        });
        const meJson = await meRes.json().catch(() => ({}));

        if (!meRes.ok || meJson.error) {
            return fail(502, "auth", { status: meRes.status, error: meJson.error ?? null });
        }

        const timeZone = meJson.data?.timezone || "UTC";

        const now = new Date();
        const startDate = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
        const start = isoDateIn(startDate, timeZone);
        const end = isoDateIn(now, timeZone);

        const url = new URL("https://wakatime.com/api/v1/users/current/summaries");
        url.searchParams.set("start", start);
        url.searchParams.set("end", end);

        const res = await fetch(url, { headers: authHeader });
        const json = await res.json().catch(() => ({}));

        if (!res.ok || json.error) {
            return fail(502, "wakatime", { status: res.status, error: json.error ?? null });
        }

        const days = Array.isArray(json.data) ? json.data : [];
        const totalSeconds = days.reduce(
            (acc, day) => acc + (day.grand_total?.total_seconds ?? 0),
            0,
        );

        const rankedLangs = aggregate(days, "languages");

        if (totalSeconds <= 0 && rankedLangs.length === 0) {
            return {
                statusCode: 200,
                headers: JSON_HEADERS,
                body: JSON.stringify({
                    hasData: false,
                    totalSeconds: 0,
                    totalText: humanize(0),
                    languages: [],
                    editors: [],
                    projects: [],
                    range: { start, end },
                }),
            };
        }

        const top = rankedLangs.slice(0, MAX_LANGS);
        const restSeconds = rankedLangs.slice(MAX_LANGS).reduce((acc, [, s]) => acc + s, 0);
        const langBase = rankedLangs.reduce((acc, [, s]) => acc + s, 0) || 1;

        const languages = top.map(([name, seconds]) => ({
            name,
            percent: Number(((seconds / langBase) * 100).toFixed(1)),
            color: LANG_COLORS[name] ?? FALLBACK_COLOR,
            text: humanize(seconds),
        }));

        if (restSeconds > 0) {
            languages.push({
                name: "Other",
                percent: Number(((restSeconds / langBase) * 100).toFixed(1)),
                color: LANG_COLORS.Other,
                text: humanize(restSeconds),
            });
        }

        const simplify = (ranked) =>
            ranked.slice(0, 5).map(([name, seconds]) => ({ name, text: humanize(seconds) }));

        return {
            statusCode: 200,
            headers: JSON_HEADERS,
            body: JSON.stringify({
                hasData: true,
                totalSeconds,
                totalText: humanize(totalSeconds),
                languages,
                editors: simplify(aggregate(days, "editors")),
                projects: simplify(aggregate(days, "projects")),
                range: { start, end },
            }),
        };
    } catch (error) {
        return fail(500, "exception", error.message);
    }
};
