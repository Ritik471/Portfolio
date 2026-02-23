export const handler = async (event, context) => {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
    const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

    try {
        // 1. Get Access Token
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: SPOTIFY_REFRESH_TOKEN }),
        });
        const { access_token } = await tokenRes.json();

        // 2. TRY "Now Playing" first
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
                        isPlaying: true, // LIVE status
                        title: song.item.name,
                        artist: song.item.artists.map(a => a.name).join(', '),
                        albumArt: song.item.album.images[0].url,
                        link: song.item.external_urls.spotify
                    }),
                };
            }
        }

        // 3. FALLBACK to "Recently Played" if not currently listening
        const recentlyRes = await fetch('https://developer.spotify.com/documentation/web-api/reference/get-recently-played?limit=1', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const recentData = await recentlyRes.json();
        const lastTrack = recentData.items[0].track;

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
                isPlaying: false, // HISTORY status
                title: lastTrack.name,
                artist: lastTrack.artists.map(a => a.name).join(', '),
                albumArt: lastTrack.album.images[0].url,
                link: lastTrack.external_urls.spotify
            }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};