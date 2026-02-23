import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  MapPin,
  Calendar,
  Coffee,
  BookOpen,
} from "lucide-react";
import Reveal from "../components/Reveal";

const highlights = [
  {
    icon: MapPin,
    label: "Based in",
    value: "Nagpur, India",
    color: "text-blue-400",
    bg: "group-hover:bg-blue-500/10",
  },
  {
    icon: Calendar,
    label: "Experience",
    value: "3+ Years",
    color: "text-purple-400",
    bg: "group-hover:bg-purple-500/10",
  },
  {
    icon: Coffee,
    label: "Projects",
    value: "25+ Live",
    color: "text-emerald-400",
    bg: "group-hover:bg-emerald-500/10",
  },
  {
    icon: BookOpen,
    label: "Status",
    value: "Lifelong Learner",
    color: "text-yellow-400",
    bg: "group-hover:bg-yellow-500/10",
  },
];

const skills = [
  {
    category: "Frontend Architecture",
    icon: "logos:react",
    items: [
      "React 19",
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    accent: "group-hover:border-blue-500/50",
    glow: "bg-blue-500/5",
  },
  {
    category: "Mobile Systems",
    icon: "logos:flutter",
    items: ["Flutter", "Android (Kotlin)", "React Native", "Dart"],
    accent: "group-hover:border-emerald-500/50",
    glow: "bg-emerald-500/5",
  },
  {
    category: "Engineering Tools",
    icon: "logos:visual-studio-code",
    items: ["Monorepos", "Git", "Docker", "Figma", "Appwrite"],
    accent: "group-hover:border-purple-500/50",
    glow: "bg-purple-500/5",
  },
  {
    category: "Specialized",
    icon: "logos:google-search-console",
    items: ["Technical SEO", "WordPress", "System Design", "UI/UX"],
    accent: "group-hover:border-yellow-500/50",
    glow: "bg-yellow-500/5",
  },
];

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressMs, setProgressMs] = useState(0);
  const [track, setTrack] = useState({
    title: "",
    artist: "Spotify",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273b5cecc2a52ae03ad213bf97c",
    durationMs: 0,
    link: "#"
  });

  const [wakaData, setWakaData] = useState([
    { name: "TypeScript", percent: 45, color: "#60A5FA" },
    { name: "React", percent: 25, color: "#22D3EE" },
    { name: "Rust", percent: 15, color: "#FB923C" },
    { name: "Other", percent: 15, color: "#9CA3AF" }
  ]);
  const [wakaTotalTime, setWakaTotalTime] = useState("34 hrs 12 mins");

  // --- WAKATIME FETCH ---
  useEffect(() => {
    const ACTIVITY_URL = "/api-waka/share/@30d10488-53fc-4d72-9936-4cfb98c87812/cb282e26-c3b9-42a6-b9ed-9e4cc04da725.json";
    const LANGUAGES_URL = "/api-waka/share/@30d10488-53fc-4d72-9936-4cfb98c87812/b21c1d91-8b1a-4892-a0ba-1fcded6e4bd8.json";

    Promise.all([
      fetch(ACTIVITY_URL).then(res => res.json()),
      fetch(LANGUAGES_URL).then(res => res.json())
    ])
      .then(([activityRes, languagesRes]) => {
        const days = activityRes.data;
        if (Array.isArray(days)) {
          const totalSeconds = days.reduce((acc: number, day: any) => acc + (day.grand_total?.total_seconds || 0), 0);
          const hours = Math.floor(totalSeconds / 3600);
          const mins = Math.floor((totalSeconds % 3600) / 60);
          setWakaTotalTime(`${hours} hrs ${mins} mins`);
        }

        const langs = languagesRes.data;
        if (Array.isArray(langs)) {
          const topLangs = langs.slice(0, 4).map((lang: any) => ({
            name: lang.name || "Other",
            percent: lang.percent || 0,
            color: lang.color || "#9CA3AF",
          }));
          setWakaData(topLangs);
        }
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const isLocal = window.location.hostname === "localhost";
        let data;

        if (isLocal) {
          const basic = btoa(`${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`);
          const tokenRes = await fetch("/spotify-token", {
            method: "POST",
            headers: {
              Authorization: `Basic ${basic}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN,
            }),
          });
          const { access_token } = await tokenRes.json();

          const nowPlayingRes = await fetch("/api-spotify/me/player/currently-playing", {
            headers: { Authorization: `Bearer ${access_token}` },
          });

          if (nowPlayingRes.status === 200) {
            const song = await nowPlayingRes.json();
            if (song.item) {
              data = {
                isPlaying: true,
                title: song.item.name,
                artist: song.item.artists.map((a: any) => a.name).join(', '),
                albumArt: song.item.album.images[0].url,
                link: song.item.external_urls.spotify,
                durationMs: song.item.duration_ms,
                progressMs: song.progress_ms,
              };
            }
          }

          if (!data) {
            const recentRes = await fetch("/api-spotify/me/player/recently-played?limit=1", {
              headers: { Authorization: `Bearer ${access_token}` },
            });
            const recentData = await recentRes.json();
            if (recentData.items?.length > 0) {
              const lastTrack = recentData.items[0].track;
              data = {
                isPlaying: false,
                title: lastTrack.name,
                artist: lastTrack.artists.map((a: any) => a.name).join(', '),
                albumArt: lastTrack.album.images[0].url,
                link: lastTrack.external_urls.spotify,
                durationMs: lastTrack.duration_ms,
              };
            }
          }
        } else {
          const res = await fetch("/.netlify/functions/now-playing");
          if (res.ok) data = await res.json();
        }
        if (data && data.title) {
          setTrack({
            title: data.title,
            artist: data.artist,
            albumArt: data.albumArt,
            durationMs: data.durationMs || 0,
            link: data.link
          });
          setIsPlaying(data.isPlaying);
          if (data.progressMs) setProgressMs(data.progressMs);
        }
      } catch (err) {
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 15000);
    return () => clearInterval(interval);
  }, []);


  // --- PROGRESS BAR LOGIC ---
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    if (isPlaying && track.durationMs > 0) {
      progressInterval = setInterval(() => {
        setProgressMs(prev => {
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
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-blue-500 selection:text-white pb-20 md:pb-28 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-4 md:px-6 pt-32 md:pt-32 pb-16 md:pb-20 border-b border-white/10">
        <Reveal className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] text-blue-400 tracking-[0.3em] uppercase mb-8">
            // The Engineer
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.85] mb-8 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-400/50">
              ENGINEER, BUILDER,
            </span>{" "}
            <br />
            <span className="inline-block py-2 text-transparent bg-clip-text bg-gradient-to-b from-white/60 to-white/10 italic">
              LIFELONG LEARNER.
            </span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-white/70 font-light leading-relaxed">
            I am <span className="text-white font-medium">Ritik Shah</span>, a
            software engineer based in Nagpur specialized in building{" "}
            <span className="text-blue-400">performant web applications</span>,
            scalable monorepo architectures, and high-efficacy technical SEO
            systems.
          </p>
        </Reveal>
      </section>

      {/* Highlights Grid */}
      <section className="relative z-10 py-12 md:py-16 px-4 md:px-6 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => {
            const IconComp = h.icon;
            return (
              <Reveal key={h.label} delay={i * 0.1}>
                <div
                  className={`p-6 md:p-8 border border-white/10 bg-white/[0.03] backdrop-blur-md rounded-2xl md:rounded-3xl group hover:border-white/30 transition-all ${h.bg}`}
                >
                  <IconComp
                    className={`w-5 h-5 mb-4 group-hover:scale-110 transition-all ${h.color}`}
                  />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
                    {h.label}
                  </p>
                  <p className="text-lg md:text-xl font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
                    {h.value}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Narrative & Live Widgets */}
      <section className="relative z-10 py-16 md:py-24 px-4 md:px-6">
        {/* items-stretch ensures the total height of both columns is identical */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

          {/* LEFT COLUMN: Narrative Bio */}
          <Reveal className="h-full">
            <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-white/60 font-light leading-relaxed h-full flex flex-col justify-center">
              <p>
                I'm <span className="text-white font-medium">Ritik Shah</span>,
                a software engineer with a deep passion for building scalable
                systems that bridge the gap between technical excellence and
                thoughtful design. Based in
                <span className="text-blue-400 font-normal"> Nagpur</span>, I've
                spent the last few years mastering the modern web stack.
              </p>
              <p>
                I specialize in{" "}
                <span className="text-white font-medium border-b border-blue-500/30">
                  Frontend Architecture
                </span>
                , specifically focusing on the React/Next.js ecosystem. I build
                with a{" "}
                <span className="text-emerald-400/80">"Performance-First"</span>{" "}
                mindset.
              </p>
              <p>
                My experience spans across technical SEO for international firms
                and crafting pixel-perfect UIs for high-growth startups. I
                believe great software is about creating
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 italic font-medium ml-1">
                  delightful digital experiences.
                </span>
              </p>
            </div>
          </Reveal>

          {/* RIGHT COLUMN: Widgets Stack */}
          <div className="space-y-6 flex flex-col h-full">

            {/* Spotify Widget - flex-1 allows it to grow to fill half the space */}
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
                      <p className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 truncate group-hover/link:text-[#1DB954] transition-colors">
                        {track.title || "Offline"}
                      </p>
                    </a>
                    <p className="text-sm md:text-base text-white/50 truncate font-light">
                      {track.title ? track.artist : "Syncing Spotify..."}
                    </p>

                    {isPlaying && (
                      <div className="w-full mt-4 animate-in fade-in duration-500">
                        <div className="flex justify-between text-[10px] font-mono text-white/40 mb-2">
                          <span>{formatTime(progressMs)}</span>
                          <span>{formatTime(track.durationMs)}</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ width: `${(progressMs / track.durationMs) * 100}%` }}
                            transition={{ duration: 1, ease: "linear" }}
                            className="h-full bg-[#1DB954]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* WakaTime Widget - flex-1 allows it to fill the other half of the space */}
            <Reveal delay={0.3} className="flex-1">
              <div className="p-6 md:p-8 border border-white/10 bg-white/[0.02] rounded-3xl md:rounded-[2.5rem] flex flex-col justify-between gap-4 group hover:border-purple-500/30 transition-all backdrop-blur-sm h-full shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <Icon icon="simple-icons:wakatime" className="text-2xl text-white/80" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      WakaTime / 7 Days
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[10px] uppercase tracking-widest rounded-full">
                    Live
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6 group-hover:text-purple-100 transition-colors">
                    {wakaTotalTime}
                  </p>

                  <div className="flex w-full h-2 rounded-full overflow-hidden gap-0.5 mb-6 bg-white/10">
                    {wakaData.map(lang => (
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
                    {wakaData.map(lang => (
                      <div key={lang.name} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full shadow-lg" style={{ backgroundColor: lang.color }} />
                        <span className="text-xs text-white/60 font-mono uppercase group-hover:text-white/80 transition-colors">
                          {lang.name} <span className="text-white/60">({lang.percent.toFixed(1)}%)</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="relative z-10 py-16 md:py-24 px-4 md:px-6 border-t border-white/10 bg-white/[0.01]">
        <Reveal className="max-w-7xl mx-auto mb-16 text-left lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-4">
            Technical <span className="text-white/40 italic">Expertise.</span>
          </h2>
          <p className="text-blue-400 font-mono text-xs md:text-sm tracking-widest uppercase">
            // Industry standard toolsets
          </p>
        </Reveal>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.1}>
              <div
                className={`p-8 border border-white/10 bg-white/[0.03] backdrop-blur-md rounded-[2rem] h-full transition-all group relative overflow-hidden ${group.accent}`}
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${group.glow}`}
                />
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <Icon
                    icon={group.icon}
                    className="text-3xl grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  />
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                    Expertise_{i + 1}
                  </span>
                </div>
                <p className="text-lg font-semibold mb-6 tracking-tight relative z-10 text-white/90 group-hover:text-white uppercase transition-colors">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 group-hover:text-white/90 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="mt-20 text-center text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] relative z-10">
        © 2026 Ritik Shah — Built with Precision
      </footer>
    </div>
  );
};

export default About;