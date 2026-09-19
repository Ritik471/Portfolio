import { describe, it, expect, afterEach, vi } from "vitest";
import { handler } from "./github-stats.js";

const ok = (json, headers = {}) => ({
  ok: true,
  status: 200,
  json: async () => json,
  headers: { get: (k) => headers[k] ?? null },
});

const body = (res) => JSON.parse(res.body);

const mockGitHub = ({ user, repoPages = [[]], contributions = null }) => {
  let page = 0;
  global.fetch = vi.fn(async (url) => {
    const href = String(url);
    if (href.includes("jogruber.de")) {
      if (!contributions) throw new Error("contributions down");
      return ok(contributions);
    }
    if (href.includes("/repos?")) return ok(repoPages[page++] ?? []);
    return ok(user);
  });
};

afterEach(() => vi.restoreAllMocks());

describe("github-stats", () => {
  it("aggregates stars, forks and language shares", async () => {
    mockGitHub({
      user: { public_repos: 3, followers: 12 },
      repoPages: [[
        { stargazers_count: 5, forks_count: 1, language: "TypeScript" },
        { stargazers_count: 2, forks_count: 0, language: "TypeScript" },
        { stargazers_count: 0, forks_count: 3, language: "Go" },
      ]],
      contributions: { contributions: [{ date: "2026-01-01", count: 2, level: 1 }], total: { 2026: 2 } },
    });

    const out = body(await handler({}, {}));
    expect(out.stats).toMatchObject({ repos: "3", stars: "7", forks: "4", followers: "12" });
    expect(out.stats.languages).toEqual([
      { name: "TypeScript", pct: 67 },
      { name: "Go", pct: 33 },
    ]);
    expect(out.totalContributions).toBe(2);
  });

  it("ignores repos with no detected language", async () => {
    mockGitHub({
      user: { public_repos: 1 },
      repoPages: [[{ stargazers_count: 0, forks_count: 0, language: null }]],
      contributions: { contributions: [], total: {} },
    });
    expect(body(await handler({}, {})).stats.languages).toEqual([]);
  });

  it("still returns stats when the contributions API is down", async () => {
    mockGitHub({
      user: { public_repos: 1, followers: 1 },
      repoPages: [[{ stargazers_count: 1, forks_count: 0, language: "Rust" }]],
      contributions: null,
    });
    const out = body(await handler({}, {}));
    expect(out.stats.stars).toBe("1");
    expect(out.contributions).toEqual([]);
    expect(out.totalContributions).toBe(0);
  });

  it("flags rate limiting with an actionable hint", async () => {
    global.fetch = vi.fn(async () => ({
      ok: false,
      status: 403,
      json: async () => ({}),
      headers: { get: (k) => (k === "x-ratelimit-remaining" ? "0" : null) },
    }));
    const res = await handler({}, {});
    expect(res.statusCode).toBe(502);
    expect(body(res).detail.rateLimited).toBe(true);
    expect(body(res).detail.hint).toContain("GITHUB_TOKEN");
  });

  it("stops paginating on a short page", async () => {
    mockGitHub({
      user: { public_repos: 1 },
      repoPages: [[{ stargazers_count: 1, forks_count: 0, language: "Go" }]],
      contributions: { contributions: [], total: {} },
    });
    await handler({}, {});
    const repoCalls = global.fetch.mock.calls.filter((c) => String(c[0]).includes("/repos?"));
    expect(repoCalls).toHaveLength(1);
  });
});
