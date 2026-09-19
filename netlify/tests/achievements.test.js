import { describe, it, expect } from "vitest";
import { parseAchievements } from "../lib/achievements.js";

// Shaped after the real profile markup.
const html = `
  <a href="/Ritik471?achievement=pull-shark&tab=achievements">
    <img src="https://github.githubassets.com/assets/pull-shark-gold-90985540b385.png">
  </a>
  <a href="/Ritik471?achievement=quickdraw&tab=achievements">
    <img src="https://github.githubassets.com/assets/quickdraw-default--light-medium-5450fadcbe37.png">
  </a>
  <a href="/Ritik471?achievement=pair-extraordinaire&tab=achievements">
    <img src="https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png">
  </a>
`;

describe("parseAchievements", () => {
  it("extracts each achievement once", () => {
    expect(parseAchievements(html).map((a) => a.slug)).toEqual([
      "pull-shark",
      "quickdraw",
      "pair-extraordinaire",
    ]);
  });

  it("reads the medal tier from the asset filename", () => {
    const byslug = Object.fromEntries(parseAchievements(html).map((a) => [a.slug, a]));
    expect(byslug["pull-shark"].tier).toBe("gold");
  });

  it("treats the default tier as no tier", () => {
    const byslug = Object.fromEntries(parseAchievements(html).map((a) => [a.slug, a]));
    expect(byslug["quickdraw"].tier).toBeNull();
  });

  it("maps known slugs to their display names", () => {
    const names = parseAchievements(html).map((a) => a.name);
    expect(names).toContain("Pull Shark");
    expect(names).toContain("Pair Extraordinaire");
  });

  it("title-cases an unrecognised slug rather than dropping it", () => {
    const out = parseAchievements('<a href="?achievement=galactic-otter"></a>');
    expect(out[0]).toMatchObject({ slug: "galactic-otter", name: "Galactic Otter", tier: null });
  });

  it("returns nothing when the markup does not match, so callers can fall back", () => {
    expect(parseAchievements("<html><body>redesigned</body></html>")).toEqual([]);
    expect(parseAchievements("")).toEqual([]);
    expect(parseAchievements(null)).toEqual([]);
  });
});
