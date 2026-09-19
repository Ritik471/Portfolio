import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Reveal from "../components/Reveal";
import usePageMeta from "../hooks/usePageMeta";
import { highlights, skills } from "../data/about";

interface WakaLang {
  name: string;
  percent: number;
  color: string;
  text?: string;
}

interface WakaStatsPayload {
  hasData: boolean;
  totalSeconds: number;
  totalText: string;
  languages: WakaLang[];
  editors: { name: string; text: string }[];
  projects: { name: string; text: string }[];
  range: { start: string; end: string };
}

type WakaStatus = "loading" | "ready" | "empty";

interface NowPlayingError {
  error: true;
  stage: string;
  detail: unknown;
}

interface NowPlayingPayload {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string;
  link: string;
  durationMs: number;
  progressMs?: number;
  album?: string;
}

const About = () => {
  usePageMeta({
    title: "The Engineer & Builder",
    description:
      "About Ritik Shah: frontend engineering with Next.js and React, scalable monorepo architectures, plus live coding activity and listening stats.",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressMs, setProgressMs] = useState(0);
  const [track, setTrack] = useState({
    title: "",
    artist: "Spotify",
    albumArt: "/placeholder.svg",
    durationMs: 0,
    link: "#",
  });

  const [wakaData, setWakaData] = useState<WakaLang[]>([]);
  const [wakaTotalTime, setWakaTotalTime] = useState<string | null>(null);
  const [wakaStatus, setWakaStatus] = useState<WakaStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    fetch("/.netlify/functions/waka-stats")
      .then(async (res) => {
        const json = (await res.json().catch(() => undefined)) as
          | WakaStatsPayload
          | NowPlayingError
          | undefined;

        if (cancelled) return;

        if (!res.ok || !json || "error" in json) {
          console.warn("[waka-stats] failed", res.status, json);
          setWakaStatus("empty");
          return;
        }

        if (!json.hasData || json.languages.length === 0) {
          setWakaStatus("empty");
          return;
        }

        setWakaTotalTime(json.totalText);
        setWakaData(json.languages);
        setWakaStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setWakaStatus("empty");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/.netlify/functions/now-playing");
        if (res.status === 204) return;

        const json = (await res.json().catch(() => undefined)) as
          | NowPlayingPayload
          | NowPlayingError
          | undefined;

        if (!res.ok || !json || "error" in json) {
          console.warn("[now-playing] failed", res.status, json);
          return;
        }

        if (cancelled || !json.title) return;

        setTrack({
          title: json.title,
          artist: json.artist,
          albumArt: json.albumArt,
          durationMs: json.durationMs || 0,
          link: json.link,
        });
        setIsPlaying(json.isPlaying);
        setProgressMs(json.progressMs || 0);
      } catch {
        return;
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    if (isPlaying && track.durationMs > 0) {
      progressInterval = setInterval(() => {
        setProgressMs((prev) => {
          if (prev >= track.durationMs) return prev;
          return prev + 1000;
        });
      }, 1000);
    }
    return () => clearInterval(progressInterval);
  }, [isPlaying, track.durationMs, track.title]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="relative min-h-screen themed-bg themed-text selection:bg-blue-500 pb-20 md:pb-28 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.svg')]" />
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] rounded-full" />
      </div>

      <section className="relative z-10 max-w-[1400px] mx-auto pt-32 sm:pt-40 pb-16 md:pb-20 border-b" style={{ borderColor: 'rgba(var(--surface),0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-0">
          <Reveal className="">
            <p className="font-mono text-[9px] sm:text-[10px] text-blue-400 tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6 md:mb-8">
              // The Engineer
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter leading-[1.0] sm:leading-[0.85] mb-8 uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-blue-400/50">
                ENGINEER, BUILDER,
              </span>{" "}
              <br />
              <span className="inline-block py-1 sm:py-2 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground italic">
                LIFELONG LEARNER.
              </span>
            </h1>

            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              I am <span className="text-foreground font-medium">Ritik Shah</span>, a
              software engineer based in Nagpur specialized in building{" "}
              <span className="text-blue-400">performant web applications</span>,
              scalable monorepo architectures, and high-efficacy technical SEO
              systems.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 py-12 md:py-16 px-6 lg:px-0 " style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.01)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => {
            const IconComp = h.icon;
            return (
              <Reveal key={h.label} delay={i * 0.1}>
                <div
                  className={`p-6 md:p-8 border backdrop-blur-md rounded-2xl md:rounded-3xl group transition-all ${h.bg}`}
                  style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.03)' }}
                >
                  <IconComp
                    className={`w-5 h-5 mb-4 group-hover:scale-110 transition-all ${h.color}`}
                  />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                    {h.label}
                  </p>
                  <p className="text-lg md:text-xl font-semibold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
                    {h.value}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="relative max-w-[1400px] mx-auto z-10 py-16 md:py-24 border-t " style={{ borderColor: 'rgba(var(--surface),0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-0">
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

            <Reveal className="h-full">
              <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-muted-foreground font-light leading-relaxed h-full flex flex-col justify-center">
                <p>
                  I'm <span className="text-foreground font-medium">Ritik Shah</span>,
                  a software engineer with a deep passion for building scalable
                  systems that bridge the gap between technical excellence and
                  thoughtful design. Based in
                  <span className="text-blue-400 font-normal"> Nagpur</span>, I focus on crafting
                  high-performance, SEO-friendly digital platforms.
                </p>
                <p>
                  I specialize in{" "}
                  <span className="text-foreground font-medium border-b border-blue-500/30">
                    Frontend Engineering
                  </span>
                  , with strong expertise in the Next.js and React ecosystem. My approach
                  is defined by a <span className="text-green-400/90">"User-First"</span> philosophy
                  integrated with technical SEO best practices.
                </p>
                <p>
                  My experience spans across delivering international AI projects,
                  designing intuitive UIs, and building cross-platform mobile solutions.
                  I believe great software is about creating
                  <span className="text-transparent bg-clip-text  bg-gradient-to-r from-purple-400 to-blue-400 italic font-medium ml-1">
                    intuitive and functional digital experiences.
                  </span>
                </p>
              </div>
            </Reveal>

            <div className="space-y-6 flex flex-col h-full">

              <Reveal delay={0.2} className="flex-1">
                <div className="p-6 md:p-8 border border-white/10 bg-white/[0.03] rounded-3xl md:rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group hover:border-[#1DB954]/50 transition-all duration-500 shadow-2xl h-full flex flex-col justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                      <Icon
                        icon="logos:spotify-icon"
                        className={`text-2xl ${isPlaying ? 'animate-spin-slow' : ''}`}
                      />
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#1DB954]">
                        {isPlaying ? "Currently Listening" : "Last Played"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
                    <div className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(29,185,84,0.2)] group-hover:shadow-[0_0_50px_rgba(29,185,84,0.4)] transition-shadow duration-500">
                      <img src={track.albumArt} alt="Album Art" className={`w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'} group-hover:scale-110`} />
                      {isPlaying && (
                        <div className="absolute inset-0 bg-[#1DB954]/20 mix-blend-overlay animate-pulse" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center h-full pt-2">
                      <a href={track.link} target="_blank" rel="noreferrer" className="group/link block">
                        <p className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2 truncate group-hover/link:text-[#1DB954] transition-colors">
                          {track.title || "Offline"}
                        </p>
                      </a>
                      <p className="text-sm md:text-base text-muted-foreground truncate font-light">
                        {track.title ? track.artist : "Syncing Spotify..."}
                      </p>

                      {isPlaying && track.durationMs > 0 && (
                        <div className="w-full mt-4 animate-in fade-in duration-500">
                          <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-2">
                            <span>{formatTime(progressMs)}</span>
                            <span>{formatTime(track.durationMs)}</span>
                          </div>
                          <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: 'rgba(var(--surface),0.1)' }}>
                            <motion.div
                              animate={{ width: `${(progressMs / track.durationMs) * 100}%` }}
                              transition={{ duration: 1, ease: "linear" }}
                              className="h-full bg-[#1DB954]"
                            />
                          </div>
                        </div>
                      )}

                      {isPlaying && track.durationMs === 0 && (
                        <div className="flex items-center gap-2 mt-4 animate-in fade-in duration-500">
                          <div className="flex items-end gap-[3px] h-3">
                            {[0, 150, 300].map((delay) => (
                              <span
                                key={delay}
                                className="w-[3px] bg-[#1DB954] animate-pulse"
                                style={{ height: "100%", animationDelay: `${delay}ms` }}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                            Live
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3} className="flex-1">
                <div className="p-6 md:p-8 border border-white/10 bg-white/[0.02] rounded-3xl md:rounded-[2.5rem] flex flex-col justify-between gap-4 group hover:border-purple-500/30 transition-all backdrop-blur-sm h-full shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <Icon icon="simple-icons:wakatime" className="text-2xl text-foreground/80" />
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        WakaTime / 7 Days
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 font-mono text-[10px] uppercase tracking-widest rounded-full border ${
                        wakaStatus === "ready"
                          ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                          : "border-white/10 text-muted-foreground"
                      }`}
                      style={wakaStatus === "ready" ? undefined : { background: 'rgba(var(--surface),0.05)' }}
                    >
                      {wakaStatus === "ready" ? "Live" : wakaStatus === "loading" ? "Syncing" : "No Data"}
                    </div>
                  </div>

                  {wakaStatus !== "ready" ? (
                    <div className="relative z-10">
                      <p className="text-2xl md:text-3xl font-bold tracking-tight text-muted-foreground/60 mb-4">
                        {wakaStatus === "loading" ? "—" : "0 hrs 0 mins"}
                      </p>
                      <div
                        className="flex w-full h-2 rounded-full overflow-hidden mb-6"
                        style={{ background: 'rgba(var(--surface),0.1)' }}
                      />
                      <p className="text-xs text-muted-foreground font-light leading-relaxed">
                        {wakaStatus === "loading"
                          ? "Fetching coding activity…"
                          : "No coding activity tracked in the last 7 days."}
                      </p>
                    </div>
                  ) : (
                  <div className="relative z-10">
                    <p className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6 group-hover:text-purple-300 transition-colors">
                      {wakaTotalTime}
                    </p>

                    <div className="flex w-full h-2 rounded-full overflow-hidden gap-0.5 mb-6" style={{ background: 'rgba(var(--surface),0.1)' }}>
                      {wakaData.map((lang) => (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.percent}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          key={lang.name}
                          className="h-full relative group/bar"
                          style={{ backgroundColor: lang.color }}
                        >
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-white border border-black/10 text-black text-[10px] font-bold rounded opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-opacity z-20 whitespace-nowrap">
                            {lang.name} - {lang.percent.toFixed(1)}%
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                      {wakaData.map((lang) => (
                        <div key={lang.name} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full shadow-lg" style={{ backgroundColor: lang.color }} />
                          <span className="text-xs text-muted-foreground font-mono uppercase group-hover:text-foreground/80 transition-colors">
                            {lang.name} <span className="text-muted-foreground">({lang.percent.toFixed(1)}%)</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 md:py-24 max-w-[1400px] mx-auto border-t" style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.01)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-0">
          <Reveal className=" mb-16 text-left lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-4">
              Technical <span className="text-muted-foreground italic">Expertise.</span>
            </h2>
            <p className="text-blue-400 font-mono text-xs md:text-sm tracking-widest uppercase">
              // Industry standard toolsets
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((group, i) => (
              <Reveal key={group.category} delay={i * 0.1}>
                <div
                  className={`p-8 border backdrop-blur-md rounded-[2rem] h-full transition-all group relative overflow-hidden ${group.accent}`}
                  style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.03)' }}
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${group.glow}`}
                  />
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <Icon
                      icon={group.icon}
                      className="text-3xl grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                    />
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                      Expertise_{i + 1}
                    </span>
                  </div>
                  <p className="text-lg font-semibold mb-6 tracking-tight relative z-10 text-foreground/90 group-hover:text-foreground uppercase transition-colors">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[10px] px-3 py-1.5 rounded-lg border text-muted-foreground group-hover:text-foreground/90 transition-all"
                        style={{ borderColor: 'rgba(var(--surface),0.1)', background: 'rgba(var(--surface),0.05)' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-20 text-center text-[10px] font-mono text-muted-foreground uppercase tracking-[0.5em] relative z-10">
        © 2026 Ritik Shah — Built with Precision
      </footer>
    </div>
  );
};

export default About;
