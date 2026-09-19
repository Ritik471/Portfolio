import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { handler } from "../functions/waka-stats.js";

const day = (seconds, languages = [], editors = []) => ({
  grand_total: { total_seconds: seconds },
  languages,
  editors,
  projects: [],
});

const mockWaka = (summaries, { timezone = "Asia/Kolkata" } = {}) => {
  global.fetch = vi.fn(async (url) => {
    const href = String(url);
    if (href.includes("/users/current/summaries")) {
      mockWaka.lastUrl = href;
      return { ok: true, status: 200, json: async () => summaries };
    }
    return { ok: true, status: 200, json: async () => ({ data: { timezone } }) };
  });
};

const body = (res) => JSON.parse(res.body);

beforeEach(() => {
  process.env.WAKATIME_API_KEY = "waka_test";
});

afterEach(() => vi.restoreAllMocks());

describe("waka-stats", () => {
  it("aggregates totals and language percentages across days", async () => {
    mockWaka({
      data: [
        day(3600, [{ name: "TypeScript", total_seconds: 3600 }]),
        day(1200, [{ name: "CSS", total_seconds: 1200 }]),
      ],
    });

    const out = body(await handler({}, {}));
    expect(out.hasData).toBe(true);
    expect(out.totalText).toBe("1 hrs 20 mins");
    expect(out.languages.map((l) => [l.name, l.percent])).toEqual([
      ["TypeScript", 75],
      ["CSS", 25],
    ]);
  });

  it("assigns a known colour and falls back for unknown languages", async () => {
    mockWaka({
      data: [day(20, [
        { name: "TypeScript", total_seconds: 10 },
        { name: "Brainfuck", total_seconds: 10 },
      ])],
    });
    const langs = body(await handler({}, {})).languages;
    expect(langs.find((l) => l.name === "TypeScript").color).toBe("#3178C6");
    expect(langs.find((l) => l.name === "Brainfuck").color).toBe("#9CA3AF");
  });

  it("rolls languages beyond the top four into Other", async () => {
    mockWaka({
      data: [day(600, [
        { name: "TypeScript", total_seconds: 300 },
        { name: "JavaScript", total_seconds: 150 },
        { name: "CSS", total_seconds: 100 },
        { name: "JSON", total_seconds: 30 },
        { name: "YAML", total_seconds: 15 },
        { name: "TOML", total_seconds: 5 },
      ])],
    });
    const langs = body(await handler({}, {})).languages;
    expect(langs).toHaveLength(5);
    expect(langs.at(-1).name).toBe("Other");
    const sum = langs.reduce((a, l) => a + l.percent, 0);
    expect(Math.abs(sum - 100)).toBeLessThan(0.5);
  });

  it("reports hasData false rather than inventing numbers", async () => {
    mockWaka({ data: [day(0), day(0)] });
    const out = body(await handler({}, {}));
    expect(out.hasData).toBe(false);
    expect(out.languages).toEqual([]);
    expect(out.totalText).toBe("0 hrs 0 mins");
  });

  it("builds the date window in the account timezone, including today", async () => {
    mockWaka({ data: [day(60, [{ name: "Go", total_seconds: 60 }])] }, {
      timezone: "Pacific/Kiritimati", // UTC+14: furthest ahead of UTC
    });
    await handler({}, {});
    const expectedEnd = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Pacific/Kiritimati",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    expect(mockWaka.lastUrl).toContain(`end=${expectedEnd}`);
  });

  it("reports missing configuration", async () => {
    delete process.env.WAKATIME_API_KEY;
    const res = await handler({}, {});
    expect(res.statusCode).toBe(500);
    expect(body(res).stage).toBe("env");
  });

  it("surfaces a rejected API key", async () => {
    global.fetch = vi.fn(async () => ({ ok: false, status: 401, json: async () => ({ error: "Unauthorized" }) }));
    const res = await handler({}, {});
    expect(res.statusCode).toBe(502);
    expect(body(res).stage).toBe("auth");
  });
});
