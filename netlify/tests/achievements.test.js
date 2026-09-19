import { describe, it, expect } from "vitest";
import { parseAchievements } from "../lib/achievements.js";

const img = (slug, file, name) =>
  `<img src="https://github.githubassets.com/assets/${file}" ` +
  `data-hovercard-type="achievement" ` +
  `data-hovercard-url="/users/Ritik471/achievements/${slug}/detail?hovercard=1" ` +
  `width="64" alt="Achievement: ${name}" class="achievement-badge-sidebar" />`;

const html = [
  img("pair-extraordinaire", "pair-extraordinaire-default-579438a20e01.png", "Pair Extraordinaire"),
  img("pull-shark", "pull-shark-gold-90985540b385.png", "Pull Shark"),
  img("quickdraw", "quickdraw-default--light-medium-5450fadcbe37.png", "Quickdraw"),
  img("yolo", "yolo-default-be0bbff04951.png", "YOLO"),
  img("pull-shark", "pull-shark-gold-90985540b385.png", "Pull Shark"),
].join("\n");

describe("parseAchievements", () => {
  it("extracts each achievement once, despite duplicate renders", () => {
    expect(parseAchievements(html).map((a) => a.slug)).toEqual([
      "pair-extraordinaire",
      "pull-shark",
      "quickdraw",
      "yolo",
    ]);
  });

  it("returns GitHub's own badge image", () => {
    const shark = parseAchievements(html).find((a) => a.slug === "pull-shark");
    expect(shark.image).toBe(
      "https://github.githubassets.com/assets/pull-shark-gold-90985540b385.png",
    );
  });

  it("takes the display name from the alt text", () => {
    const names = parseAchievements(html).map((a) => a.name);
    expect(names).toContain("Pair Extraordinaire");
    expect(names).toContain("YOLO");
  });

  it("reads the medal tier from the asset filename", () => {
    const byslug = Object.fromEntries(parseAchievements(html).map((a) => [a.slug, a]));
    expect(byslug["pull-shark"].tier).toBe("gold");
  });

  it("treats the default tier as no tier", () => {
    const byslug = Object.fromEntries(parseAchievements(html).map((a) => [a.slug, a]));
    expect(byslug.quickdraw.tier).toBeNull();
    expect(byslug.yolo.tier).toBeNull();
  });

  it("handles an achievement it has never seen before", () => {
    const out = parseAchievements(img("galactic-otter", "galactic-otter-silver-abc.png", "Galactic Otter"));
    expect(out[0]).toMatchObject({
      slug: "galactic-otter",
      name: "Galactic Otter",
      tier: "silver",
    });
  });

  it("returns nothing when the markup does not match, so callers can fall back", () => {
    expect(parseAchievements("<html><body>redesigned</body></html>")).toEqual([]);
    expect(parseAchievements("")).toEqual([]);
    expect(parseAchievements(null)).toEqual([]);
  });

  it("skips a malformed tag rather than emitting a broken entry", () => {
    const broken = '<img data-hovercard-type="achievement" alt="Achievement: No Src" />';
    expect(parseAchievements(broken)).toEqual([]);
  });
});
