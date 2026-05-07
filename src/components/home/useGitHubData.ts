import { useEffect, useState } from "react";
import { githubLangColors } from "../../data/home";

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

interface GitHubUserJson {
  public_repos?: number;
  followers?: number;
}

interface GitHubRepoJson {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface ContributionsApiResponse {
  contributions: ContributionDay[];
  total: Record<string, number>;
}

const GITHUB_USERNAME = "ritik471";
const CONTRIBUTIONS_USERNAME = "Ritik471";

export const useGitHubData = () => {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [contributionsLoading, setContributionsLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const userJson = (await userRes.json()) as GitHubUserJson;

        const allRepos: GitHubRepoJson[] = [];
        let page = 1;
        while (true) {
          const reposRes = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}`,
          );
          const reposJson: unknown = await reposRes.json();
          if (!Array.isArray(reposJson) || reposJson.length === 0) break;
          allRepos.push(...(reposJson as GitHubRepoJson[]));
          if (reposJson.length < 100) break;
          page++;
        }

        const totalStars = allRepos.reduce(
          (acc, repo) => acc + (repo.stargazers_count ?? 0),
          0,
        );
        const totalForks = allRepos.reduce(
          (acc, repo) => acc + (repo.forks_count ?? 0),
          0,
        );

        const langCounts: Record<string, number> = {};
        let totalLangs = 0;
        allRepos.forEach((repo) => {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            totalLangs++;
          }
        });

        const sortedLangs =
          totalLangs > 0
            ? Object.entries(langCounts)
                .map(([name, count]) => ({
                  name,
                  pct: Math.round((count / totalLangs) * 100),
                  color: githubLangColors[name] || "bg-gray-400",
                }))
                .sort((a, b) => b.pct - a.pct)
                .slice(0, 5)
            : [];

        setGithubStats({
          repos: userJson.public_repos?.toString() || "0",
          stars: totalStars.toString() || "0",
          followers: userJson.followers?.toString() || "0",
          forks: totalForks.toString() || "0",
          languages: sortedLangs,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchContributions = async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${CONTRIBUTIONS_USERNAME}`,
        );
        const data = (await res.json()) as ContributionsApiResponse;
        setContributions(data.contributions ?? []);
        const total = Object.values(data.total ?? {}).reduce(
          (a, b) => a + b,
          0,
        );
        setTotalContributions(total);
      } catch (error) {
        console.error("Error fetching contributions:", error);
      } finally {
        setContributionsLoading(false);
      }
    };

    fetchGitHubStats();
    fetchContributions();
  }, []);

  return {
    githubStats,
    contributions,
    totalContributions,
    loading,
    contributionsLoading,
  };
};
