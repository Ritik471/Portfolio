import { useRef } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { gsap, useGSAP } from "../lib/gsap";

const modes = [
  { value: "light" as const, icon: Sun, label: "Light" },
  { value: "dark" as const, icon: Moon, label: "Dark" },
  { value: "system" as const, icon: Monitor, label: "System" },
];

const WIPE_DURATION = 1.6;
const WIPE_EASE = "power2.inOut";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentMode = modes.find((m) => m.value === theme) || modes[2];
  const Icon = currentMode.icon;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const mounted = useRef(false);

  // Icon swap: the new icon spins and pops in.
  useGSAP(
    () => {
      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        iconRef.current,
        { rotate: -120, scale: 0.3, autoAlpha: 0 },
        { rotate: 0, scale: 1, autoAlpha: 1, duration: 1.1, ease: "back.out(1.7)" },
      );
    },
    { dependencies: [theme], revertOnUpdate: false },
  );

  const cycleTheme = () => {
    const currentIndex = modes.findIndex((m) => m.value === theme);
    const next = modes[(currentIndex + 1) % modes.length].value;
    const nextResolved =
      next === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : next;

    const root = document.documentElement;
    const apply = () => {
      // Update the class right away so the transition captures the new look;
      // ThemeProvider applies the same class from its effect afterwards.
      root.classList.remove("dark", "light");
      root.classList.add(nextResolved);
      setTheme(next);
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      reduceMotion ||
      nextResolved === resolvedTheme ||
      typeof document.startViewTransition !== "function"
    ) {
      apply();
      return;
    }

    // Circular wipe from the toggle button. The radius is animated with the
    // browser's own animation engine on the transition layer (animating a CSS
    // variable on <html> would re-style the whole page every frame), and GSAP
    // supplies the easing curve.
    const rect = buttonRef.current!.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const ease = gsap.parseEase(WIPE_EASE);
    const steps = 90;
    const keyframes = Array.from({ length: steps + 1 }, (_, i) => ({
      clipPath: `circle(${(ease(i / steps) * radius).toFixed(1)}px at ${x}px ${y}px)`,
    }));

    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      root.animate(keyframes, {
        duration: WIPE_DURATION * 1000,
        easing: "linear", // the curve is already baked into the keyframes
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      });
    });
  };

  return (
    <div className="border-[1px] border-surface-20 rounded-3xl p-3 flex flex-col gap-2 shadow-2xl backdrop-blur-md">
      <button
        ref={buttonRef}
        onClick={cycleTheme}
        className="relative group flex items-center justify-center p-4 rounded-2xl transition-all duration-300 text-foreground hover:bg-[rgba(var(--surface),0.10)]"
      >
        <div
          className="absolute left-16 px-3 py-1 text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 shadow-lg whitespace-nowrap z-50"
          style={{
            background: resolvedTheme === "dark" ? "#fff" : "#111",
            color: resolvedTheme === "dark" ? "#000" : "#fff",
          }}
        >
          Theme: {currentMode.label}
          <div
            className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rotate-45"
            style={{
              background: resolvedTheme === "dark" ? "#fff" : "#111",
            }}
          />
        </div>

        <span ref={iconRef} className="relative z-10 inline-flex">
          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
