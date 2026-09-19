import { describe, it, expect, vi, afterEach } from "vitest";
import { rateLimit } from "../lib/rate-limit.js";

afterEach(() => vi.useRealTimers());

describe("rateLimit", () => {
  it("allows up to max requests then blocks", () => {
    const key = `k-${Math.random()}`;
    expect(rateLimit(key, { max: 2 }).allowed).toBe(true);
    expect(rateLimit(key, { max: 2 }).allowed).toBe(true);
    expect(rateLimit(key, { max: 2 }).allowed).toBe(false);
  });

  it("reports how long to wait when blocked", () => {
    const key = `k-${Math.random()}`;
    rateLimit(key, { max: 1, windowMs: 60_000 });
    const blocked = rateLimit(key, { max: 1, windowMs: 60_000 });
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
    expect(blocked.retryAfter).toBeLessThanOrEqual(60);
  });

  it("tracks callers independently", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    rateLimit(a, { max: 1 });
    expect(rateLimit(a, { max: 1 }).allowed).toBe(false);
    expect(rateLimit(b, { max: 1 }).allowed).toBe(true);
  });

  it("lets the caller through again once the window expires", () => {
    vi.useFakeTimers();
    const key = `k-${Math.random()}`;
    rateLimit(key, { max: 1, windowMs: 1000 });
    expect(rateLimit(key, { max: 1, windowMs: 1000 }).allowed).toBe(false);
    vi.advanceTimersByTime(1001);
    expect(rateLimit(key, { max: 1, windowMs: 1000 }).allowed).toBe(true);
  });
});
