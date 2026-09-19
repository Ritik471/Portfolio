import { useEffect, useState } from "react";
import {
  githubLangColors,
  achievementStyles,
  achievementFallbackStyle,
  fallbackAchievements,
  type Achievement,
} from "../../data/home";

export interface GitHubLanguage {
  name: string;
  pct: number;
  color: string;
}

export interface GitHubStats {
  repos: string;
  stars: string;
  followers: string;
  forks: string;
  languages: GitHubLanguage[];
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubStatsResponse {
  stats: {
    repos: string;
    stars: string;
    followers: string;
    forks: string;
    languages: { name: string; pct: number }[];
  };
  achievements: { slug: string; name: string; tier: string | null }[];
  contributions: ContributionDay[];
  totalContributions: number;
}

interface GitHubStatsError {
  error: true;
  stage: string;
  detail: unknown;
}

export const useGitHubData = () => {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [achievements, setAchievements] = useState<Achievement[]>(fallbackAchievements);
  const [loading, setLoading] = useState(true);
  const [contributionsLoading, setContributionsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Aggregated server-side: the browser used to paginate api.github.com
    // directly, which burns the caller's 60 requests/hour and can fail
    // outright on a shared IP.
    const fetchGitHub = async () => {
      try {
        const res = await fetch("/.netlify/functions/github-stats");
        const json = (await res.json().catch(() => undefined)) as
          | GitHubStatsResponse
          | GitHubStatsError
          | undefined;

        if (cancelled) return;

        if (!res.ok || !json || "error" in json) {
          console.warn("[github-stats] failed", res.status, json);
          return;
        }

        setGithubStats({
          ...json.stats,
          languages: json.stats.languages.map((lang) => ({
            ...lang,
            color: githubLangColors[lang.name] || "bg-gray-400",
          })),
        });
        // Scraped from the profile page, so it can legitimately come back
        // empty; keep the last known-good list rather than blanking the row.
        if (json.achievements?.length) {
          setAchievements(
            json.achievements.map((a) => ({
              slug: a.slug,
              name: a.name,
              tier: a.tier,
              ...(achievementStyles[a.slug] ?? achievementFallbackStyle),
            })),
          );
        }

        setContributions(json.contributions ?? []);
        setTotalContributions(json.totalContributions ?? 0);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
          setContributionsLoading(false);
        }
      }
    };

    fetchGitHub();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    githubStats,
    achievements,
    contributions,
    totalContributions,
    loading,
    contributionsLoading,
  };
};
