import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const modes = [
  { value: "light" as const, icon: Sun, label: "Light" },
  { value: "dark" as const, icon: Moon, label: "Dark" },
  { value: "system" as const, icon: Monitor, label: "System" },
];

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentMode = modes.find((m) => m.value === theme) || modes[2];
  const Icon = currentMode.icon;

  const cycleTheme = () => {
    const currentIndex = modes.findIndex((m) => m.value === theme);
    const nextIndex = (currentIndex + 1) % modes.length;
    setTheme(modes[nextIndex].value);
  };

  return (
    <div className="border-[1px] border-surface-20 rounded-3xl p-3 flex flex-col gap-2 shadow-2xl backdrop-blur-md">
      <button
        onClick={cycleTheme}
        className="relative group flex items-center justify-center p-4 rounded-2xl transition-all duration-300 text-foreground hover:bg-[rgba(var(--surface),0.10)]"
      >
        {/* Tooltip matching Sidebar Dock */}
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

        <Icon className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      </button>
    </div>
  );
};

export default ThemeToggle;
