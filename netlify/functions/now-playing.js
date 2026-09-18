const JSON_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store",
};

const fail = (statusCode, stage, detail) => ({
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify({ error: true, stage, detail }),
});

const toPayload = (track, isPlaying, progressMs = 0) => ({
    isPlaying,
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    albumArt: track.album.images[0]?.url ?? null,
    link: track.external_urls.spotify,
    durationMs: track.duration_ms,
    progressMs,
});

export const handler = async (event, context) => {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

    const missing = Object.entries({ SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN })
        .filter(([, value]) => !value)
        .map(([key]) => key);

    if (missing.length) {
        return fail(500, "env", `Missing environment variable(s): ${missing.join(', ')}`);
    }

    const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

    try {
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: SPOTIFY_REFRESH_TOKEN
            }),
        });

        const tokenJson = await tokenRes.json().catch(() => ({}));

        if (!tokenRes.ok || !tokenJson.access_token) {
            return fail(502, "token", {
                status: tokenRes.status,
                error: tokenJson.error ?? null,
                description: tokenJson.error_description ?? null,
            });
        }

        const access_token = tokenJson.access_token;
        const auth = { Authorization: `Bearer ${access_token}` };

        const nowPlayingRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: auth,
        });

        if (nowPlayingRes.status === 200) {
            const song = await nowPlayingRes.json().catch(() => ({}));
            if (song.item) {
                return {
                    statusCode: 200,
                    headers: JSON_HEADERS,
                    body: JSON.stringify(toPayload(song.item, true, song.progress_ms ?? 0)),
                };
            }
        } else if (nowPlayingRes.status === 401 || nowPlayingRes.status === 403) {
            const detail = await nowPlayingRes.text().catch(() => "");
            return fail(502, "currently-playing", { status: nowPlayingRes.status, detail });
        }

        const recentlyRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
            headers: auth,
        });

        if (!recentlyRes.ok) {
            const detail = await recentlyRes.text().catch(() => "");
            return fail(502, "recently-played", { status: recentlyRes.status, detail });
        }

        const recentData = await recentlyRes.json().catch(() => ({}));

        if (recentData.items?.length) {
            return {
                statusCode: 200,
                headers: JSON_HEADERS,
                body: JSON.stringify(toPayload(recentData.items[0].track, false)),
            };
        }

        return fail(404, "empty", "Spotify returned no currently-playing track and no recent history");
    } catch (error) {
        return fail(500, "exception", error.message);
    }
};
