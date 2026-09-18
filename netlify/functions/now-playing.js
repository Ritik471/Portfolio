const JSON_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store",
};

// Last.fm serves this placeholder when a track has no real cover art.
const LASTFM_PLACEHOLDER = "2a96cbd8b46e442fc41c2b86b821562f";
const FALLBACK_ART = "https://i.scdn.co/image/ab67616d0000b273b5cecc2a52ae03ad213bf97c";

const fail = (statusCode, stage, detail) => ({
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify({ error: true, stage, detail }),
});

const pickArt = (images) => {
    if (!Array.isArray(images)) return FALLBACK_ART;
    const url = [...images].reverse().find(i => i["#text"])?.["#text"];
    if (!url || url.includes(LASTFM_PLACEHOLDER)) return FALLBACK_ART;
    return url;
};

export const handler = async (event, context) => {
    const { LASTFM_API_KEY, LASTFM_USERNAME } = process.env;

    const missing = Object.entries({ LASTFM_API_KEY, LASTFM_USERNAME })
        .filter(([, value]) => !value)
        .map(([key]) => key);

    if (missing.length) {
        return fail(500, "env", `Missing environment variable(s): ${missing.join(', ')}`);
    }

    const url = new URL("https://ws.audioscrobbler.com/2.0/");
    url.searchParams.set("method", "user.getrecenttracks");
    url.searchParams.set("user", LASTFM_USERNAME);
    url.searchParams.set("api_key", LASTFM_API_KEY);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");

    try {
        const res = await fetch(url, { headers: { "User-Agent": "ritikshah-portfolio" } });
        const json = await res.json().catch(() => ({}));

        // Last.fm signals API errors in the body, often still with HTTP 200.
        if (!res.ok || json.error) {
            return fail(502, "lastfm", {
                status: res.status,
                error: json.error ?? null,
                message: json.message ?? null,
            });
        }

        // Last.fm returns `track` as an object (not an array) when a single
        // result comes back, and prepends the now-playing track to the list
        // on top of the requested limit.
        const raw = json.recenttracks?.track;
        const track = Array.isArray(raw) ? raw[0] : raw;

        if (!track) {
            return fail(404, "empty", "Last.fm returned no scrobbles for this user");
        }

        return {
            statusCode: 200,
            headers: JSON_HEADERS,
            body: JSON.stringify({
                isPlaying: track["@attr"]?.nowplaying === "true",
                title: track.name,
                artist: track.artist?.["#text"] ?? "",
                album: track.album?.["#text"] ?? "",
                albumArt: pickArt(track.image),
                link: track.url,
                // Last.fm exposes neither track length nor playback position,
                // so the UI hides the progress bar when durationMs is 0.
                durationMs: 0,
                progressMs: 0,
            }),
        };
    } catch (error) {
        return fail(500, "exception", error.message);
    }
};
