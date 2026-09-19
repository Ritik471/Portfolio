import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { handler } from "./now-playing.js";

const track = (overrides = {}) => ({
  artist: { "#text": "Tame Impala" },
  name: "The Less I Know The Better",
  album: { "#text": "Currents" },
  url: "https://www.last.fm/music/x",
  image: [
    { "#text": "https://img.test/34s/a.png", size: "small" },
    { "#text": "https://img.test/300x300/a.png", size: "extralarge" },
  ],
  ...overrides,
});

const mockLastfm = (body, { ok = true, status = 200 } = {}) => {
  global.fetch = vi.fn(async () => ({ ok, status, json: async () => body }));
};

const body = (res) => JSON.parse(res.body);

beforeEach(() => {
  process.env.LASTFM_API_KEY = "key";
  process.env.LASTFM_USERNAME = "user";
});

afterEach(() => vi.restoreAllMocks());

describe("now-playing", () => {
  it("reports a currently playing track", async () => {
    mockLastfm({ recenttracks: { track: [track({ "@attr": { nowplaying: "true" } })] } });
    const res = await handler({}, {});
    expect(res.statusCode).toBe(200);
    expect(body(res)).toMatchObject({
      isPlaying: true,
      title: "The Less I Know The Better",
      artist: "Tame Impala",
    });
  });

  it("reports the last played track when nothing is playing", async () => {
    mockLastfm({ recenttracks: { track: [track({ date: { uts: "1" } })] } });
    expect(body(await handler({}, {})).isPlaying).toBe(false);
  });

  it("picks the highest resolution artwork", async () => {
    mockLastfm({ recenttracks: { track: [track()] } });
    expect(body(await handler({}, {})).albumArt).toBe("https://img.test/300x300/a.png");
  });

  it("falls back when Last.fm serves its placeholder image", async () => {
    mockLastfm({
      recenttracks: {
        track: [track({ image: [{ "#text": "https://img.test/2a96cbd8b46e442fc41c2b86b821562f.png" }] })],
      },
    });
    expect(body(await handler({}, {})).albumArt).toBe("/placeholder.svg");
  });

  it("handles `track` returned as an object instead of an array", async () => {
    mockLastfm({ recenttracks: { track: track() } });
    expect(body(await handler({}, {})).title).toBe("The Less I Know The Better");
  });

  it("surfaces a Last.fm error delivered with HTTP 200", async () => {
    mockLastfm({ error: 10, message: "Invalid API key" });
    const res = await handler({}, {});
    expect(res.statusCode).toBe(502);
    expect(body(res).stage).toBe("lastfm");
  });

  it("reports missing configuration rather than failing silently", async () => {
    delete process.env.LASTFM_API_KEY;
    const res = await handler({}, {});
    expect(res.statusCode).toBe(500);
    expect(body(res).stage).toBe("env");
    expect(body(res).detail).toContain("LASTFM_API_KEY");
  });

  it("reports an empty history", async () => {
    mockLastfm({ recenttracks: { track: [] } });
    expect(body(await handler({}, {})).stage).toBe("empty");
  });
});
