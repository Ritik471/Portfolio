import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { openCommandPalette } from "../lib/commandPalette";

const CommandHint = () => {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/mac|iphone|ipad/i.test(navigator.userAgent));
  }, []);

  return (
    <button
      type="button"
      onClick={openCommandPalette}
      aria-label="Open command palette"
      className="hidden lg:flex fixed bottom-6 right-6 z-50 items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md text-muted-foreground hover:text-foreground transition-colors group"
      style={{
        borderColor: "rgba(var(--surface),0.15)",
        background: "rgba(var(--surface),0.05)",
      }}
    >
      <Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Search</span>
      <kbd
        className="px-2 py-1 rounded-md font-mono text-[10px] border"
        style={{
          borderColor: "rgba(var(--surface),0.15)",
          background: "rgba(var(--surface),0.08)",
        }}
      >
        {isMac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  );
};

export default CommandHint;
