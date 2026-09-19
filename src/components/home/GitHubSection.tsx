import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Reveal from "../Reveal";
import { useTheme } from "../../hooks/useTheme";
import { useGitHubData } from "./useGitHubData";

const ActivityCalendar = lazy(() =>
  import("react-activity-calendar").then((m) => ({ default: m.ActivityCalendar })),
);

const GitHubSection = () => {
  const { resolvedTheme } = useTheme();
  const {
    githubStats,
    contributions,
    totalContributions,
    loading,
    contributionsLoading,
    achievements,
  } = useGitHubData();

  const stats = [
    {
      label: "Repositories",
      value: githubStats?.repos || "0",
      icon: "line-md:github-loop",
      text: "text-blue-400",
    },
    {
      label: "Total Stars",
      value: githubStats?.stars || "0",
      icon: "line-md:star-filled",
      text: "text-yellow-400",
    },
    {
      label: "Followers",
      value: githubStats?.followers || "0",
      icon: "line-md:account",
      text: "text-emerald-400",
    },
    {
      label: "Forks",
      value: githubStats?.forks || "0",
      icon: "line-md:fork-right",
      text: "text-purple-400",
    },
  ];

  return (
    <section
      className="relative z-10 max-w-[1400px] mx-auto border-t py-20 md:py-32"
      style={{ borderColor: "rgba(var(--surface),0.1)" }}
    >
      <div className="flex flex-col justify-center min-h-screen px-6  max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <p className="text-yellow-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
            // OPEN SOURCE JOURNEY
          </p>
          <h2 className="text-5xl sm:text-8xl font-bold tracking-tighter leading-[1.0] mb-8 uppercase">
            GitHub <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground italic">
              Activity.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-8 border cursor-pointer rounded-[2rem] text-center group transition-all backdrop-blur-sm"
                style={{
                  borderColor: "rgba(var(--surface),0.1)",
                  background: "rgba(var(--surface),0.03)",
                }}
              >
                <Icon
                  icon={stat.icon}
                  className={`mx-auto text-2xl mb-4 text-muted-foreground group-hover:scale-110 transition-all ${stat.text}`}
                />
                <div
                  className={`text-3xl md:text-5xl font-bold mb-2 tracking-tighter ${stat.text}`}
                >
                  {loading ? "..." : stat.value}
                </div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-foreground font-mono">
                  {stat.label}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4} className="max-w-[950px] mx-auto w-full mb-12">
          <div
            className="rounded-[2.5rem] p-6 md:p-10 border backdrop-blur-md overflow-x-auto scrollbar-hide text-sm"
            style={{
              borderColor: "rgba(var(--surface),0.1)",
              background: "rgba(var(--surface),0.03)",
            }}
          >
            <p className="font-mono text-sm text-muted-foreground mb-8 uppercase tracking-widest text-center">
              {contributionsLoading
                ? "Fetching Contributions..."
                : `${totalContributions} Total Lifetime Contributions`}
            </p>

            <div className="flex justify-center min-w-fit">
              {!contributionsLoading && (
                <Suspense fallback={null}>
                  <ActivityCalendar
                    data={contributions.filter((c) => c.date.startsWith("2026"))}
                    showWeekdayLabels
                    fontSize={12}
                    blockSize={12}
                    blockMargin={4}
                    theme={{
                      dark: ["#1e1e24", "#042d17", "#034a26", "#036531", "#01833c"],
                      light: ["#f0f0f0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                    }}
                    colorScheme={resolvedTheme as "light" | "dark"}
                  />
                </Suspense>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.45} className="max-w-[950px] mx-auto w-full mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.slug}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative p-6 rounded-[2rem] border backdrop-blur-sm flex flex-col items-center text-center group transition-all duration-300 ${achievement.border} ${achievement.bg}`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${achievement.bg}`}
                >
                  <Icon
                    icon={achievement.icon}
                    className={`text-4xl ${achievement.color}`}
                  />
                </div>
                <h3 className="font-bold text-foreground mb-1 uppercase tracking-tight text-sm">
                  {achievement.name}
                </h3>
                {achievement.tier && (
                  <span className="mb-1 px-2 py-0.5 rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 font-mono text-[9px] uppercase tracking-widest">
                    {achievement.tier}
                  </span>
                )}
                <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
                  {achievement.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.5} className="max-w-[950px] mx-auto w-full">
          <div
            className="rounded-[2.5rem] p-10 border cursor-pointer backdrop-blur-md"
            style={{
              borderColor: "rgba(var(--surface),0.1)",
              background: "rgba(var(--surface),0.03)",
            }}
          >
            <p className="font-mono text-sm text-muted-foreground mb-8 uppercase tracking-widest text-center">
              Top Languages Frequency
            </p>
            <div
              className="flex w-full h-3 rounded-full overflow-hidden gap-1 mb-10"
              style={{ background: "rgba(var(--surface),0.1)" }}
            >
              {githubStats?.languages.map((lang) => (
                <div
                  key={lang.name}
                  className={`${lang.color} h-full transition-all duration-1000`}
                  style={{ width: `${lang.pct}%` }}
                />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {githubStats?.languages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${lang.color} shadow-lg`}
                  />
                  <span className="font-mono text-sm text-foreground/70">
                    {lang.name}{" "}
                    <span className="text-muted-foreground ml-1">{lang.pct}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default GitHubSection;
