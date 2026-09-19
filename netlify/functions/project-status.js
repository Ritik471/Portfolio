const JSON_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=300",
};

const TARGETS = [
    { id: "krishna-foods", url: "https://krishna-foods.netlify.app/" },
    { id: "portfolio", url: "https://ritikshah-portfolio.netlify.app/" },
];

const TIMEOUT_MS = 8000;

const probe = async ({ id, url }) => {
    const startedAt = Date.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const res = await fetch(url, {
            method: "GET",
            redirect: "follow",
            signal: controller.signal,
            headers: { "User-Agent": "ritikshah-portfolio-status" },
        });
        return {
            id,
            url,
            up: res.ok,
            status: res.status,
            ms: Date.now() - startedAt,
        };
    } catch (error) {
        return {
            id,
            url,
            up: false,
            status: null,
            ms: Date.now() - startedAt,
            reason: error.name === "AbortError" ? "timeout" : "unreachable",
        };
    } finally {
        clearTimeout(timer);
    }
};

export const handler = async (event, context) => {
    try {
        const results = await Promise.all(TARGETS.map(probe));
        return {
            statusCode: 200,
            headers: JSON_HEADERS,
            body: JSON.stringify({
                checkedAt: new Date().toISOString(),
                results,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { ...JSON_HEADERS, "Cache-Control": "no-store" },
            body: JSON.stringify({ error: true, stage: "exception", detail: error.message }),
        };
    }
};
