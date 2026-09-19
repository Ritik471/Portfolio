import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  User,
  FolderGit2,
  Briefcase,
  Award,
  Mail,
  FileText,
  Download,
  Github,
  Linkedin,
  Sun,
  Moon,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import { useTheme } from "../hooks/useTheme";
import { socials } from "../data/contact";
import { onOpenCommandPalette } from "../lib/commandPalette";

const ROUTES = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: User },
  { label: "Projects", path: "/projects", icon: FolderGit2 },
  { label: "Experience", path: "/experience", icon: Briefcase },
  { label: "Certificates", path: "/certificates", icon: Award },
  { label: "Resume", path: "/resume", icon: FileText },
  { label: "Contact", path: "/contact", icon: Mail },
];

const SOCIAL_ICONS: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const unsubscribe = onOpenCommandPalette(() => setOpen(true));

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unsubscribe();
    };
  }, []);

  const run = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to a page or run an action..." />
      <CommandList className="max-h-[380px] scrollbar-hide">
        <CommandEmpty>No results.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {ROUTES.map(({ label, path, icon: Icon }) => (
            <CommandItem key={path} value={label} onSelect={() => run(() => navigate(path))}>
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            value="Download CV resume pdf"
            onSelect={() =>
              run(() => {
                window.location.href = "/assets/images/pdf/cv.pdf";
              })
            }
          >
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </CommandItem>
          <CommandItem
            value={`Toggle theme ${nextTheme}`}
            onSelect={() => run(() => setTheme(nextTheme))}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            Switch to {nextTheme} theme
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Elsewhere">
          {socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.label] ?? Github;
            return (
              <CommandItem
                key={social.label}
                value={social.label}
                onSelect={() =>
                  run(() => window.open(social.href, "_blank", "noopener,noreferrer"))
                }
              >
                <Icon className="mr-2 h-4 w-4" />
                {social.label}
                <CommandShortcut>↗</CommandShortcut>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
