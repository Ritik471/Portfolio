export const handler = async (event, context) => {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
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
        const { access_token } = await tokenRes.json();

        const nowPlayingRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        if (nowPlayingRes.status === 200) {
            const song = await nowPlayingRes.json();
            if (song.item) {
                return {
                    statusCode: 200,
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                    body: JSON.stringify({
                        isPlaying: true,
                        title: song.item.name,
                        artist: song.item.artists.map(a => a.name).join(', '),
                        albumArt: song.item.album.images[0].url,
                        link: song.item.external_urls.spotify,
                        durationMs: song.item.duration_ms,
                    }),
                };
            }
        }

        const recentlyRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const recentData = await recentlyRes.json();

        if (recentData.items && recentData.items.length > 0) {
            const lastTrack = recentData.items[0].track;
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    isPlaying: false,
                    title: lastTrack.name,
                    artist: lastTrack.artists.map(a => a.name).join(', '),
                    albumArt: lastTrack.album.images[0].url,
                    link: lastTrack.external_urls.spotify,
                    durationMs: lastTrack.duration_ms,
                }),
            };
        }

        return { statusCode: 204, body: "No content found" };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
