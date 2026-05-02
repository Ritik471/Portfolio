import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  FolderOpen,
  Briefcase,
  Award,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: User },
  { label: "Projects", path: "/projects", icon: FolderOpen },
  { label: "Experience", path: "/experience", icon: Briefcase },
  { label: "Certificates", path: "/certificates", icon: Award },
  { label: "Contact", path: "/contact", icon: Mail },
];

const mobileThemeModes = [
  { value: "light" as const, icon: Sun, label: "Light" },
  { value: "dark" as const, icon: Moon, label: "Dark" },
  { value: "system" as const, icon: Monitor, label: "Auto" },
];

const Sidebar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-6 top-64 z-50 hidden lg:flex flex-col items-center gap-4"
      >
        {/* Logo Monogram */}
        <Link to="/" className="group relative">
          <div className="w-16 h-16 glass-strong border border-surface-20 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <img
              src="/assets/images/sidelogo.jpg"
              alt="RS Logo"
              className="object-contain rounded-2xl brightness-125 group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          {/* Subtle glow effect behind logo */}
          <div className="absolute inset-0 -z-10 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Navigation Items */}
        <div className="border-[1px] border-surface-20 rounded-3xl p-3 flex flex-col gap-2 shadow-2xl backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative group flex items-center justify-center p-4 rounded-2xl transition-all duration-300 ${isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-2xl border"
                    style={{
                      background: "rgba(var(--surface), 0.10)",
                      borderColor: "rgba(var(--surface), 0.20)",
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}

                <div
                  className="absolute left-16 px-3 py-1 text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 shadow-lg whitespace-nowrap z-50"
                  style={{
                    background: resolvedTheme === "dark" ? "#fff" : "#111",
                    color: resolvedTheme === "dark" ? "#000" : "#fff",
                  }}
                >
                  {item.label}
                  <div
                    className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rotate-45"
                    style={{
                      background: resolvedTheme === "dark" ? "#fff" : "#111",
                    }}
                  />
                </div>

                <Icon
                  className={`relative z-10 w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-foreground" : ""}`}
                />
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle - below sidebar in matching box */}
        <ThemeToggle />
      </motion.aside>

      {/* Mobile Header */}
      <div className="fixed top-6 left-6 right-6 z-50 flex justify-between items-center lg:hidden">
        <Link
          to="/"
          className="w-16 h-16 glass-strong rounded-xl flex items-center justify-center backdrop-blur-md"
        >
          <img
            src="/assets/images/sidelogo.jpg"
            alt="RS"
            className="rounded-xl object-cover brightness-125"
          />
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="glass-strong rounded-xl p-4 shadow-xl backdrop-blur-md"
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 backdrop-blur-md"
              style={{ background: "rgba(var(--surface-invert), 0.8)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 border-t rounded-t-[2.5rem] p-8 pb-12 shadow-2xl"
              style={{
                background: resolvedTheme === "dark" ? "#0A0A0A" : "#ffffff",
                borderColor: "rgba(var(--surface), 0.20)",
              }}
            >
              <div
                className="w-12 h-1.5 rounded-full mx-auto mb-8"
                style={{ background: "rgba(var(--surface), 0.20)" }}
              />

              {/* Logo in Mobile Menu */}
              <div className="flex flex-col items-center mb-8">
                <img
                  src="/assets/images/sidelogo.jpg"
                  alt="Logo"
                  className="w-16 h-16 mb-2 brightness-125"
                />
                <span className="font-bold text-foreground tracking-widest uppercase text-xs">
                  Ritik Shah
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${isActive
                        ? "text-foreground border"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                      style={
                        isActive
                          ? {
                            background: "rgba(var(--surface), 0.10)",
                            borderColor: "rgba(var(--surface), 0.10)",
                          }
                          : undefined
                      }
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold text-lg">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Theme Toggle */}
              <div
                className="mt-6 pt-6 border-t flex items-center justify-center gap-2"
                style={{ borderColor: "rgba(var(--surface), 0.20)" }}
              >
                {mobileThemeModes.map((mode) => {
                  const Icon = mode.icon;
                  const isActive = theme === mode.value;
                  return (
                    <button
                      key={mode.value}
                      onClick={() => setTheme(mode.value)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${isActive
                        ? "text-foreground"
                        : "text-muted-foreground"
                        }`}
                      style={
                        isActive
                          ? {
                            background: "rgba(var(--surface), 0.10)",
                            border: "1px solid rgba(var(--surface), 0.15)",
                          }
                          : { border: "1px solid transparent" }
                      }
                    >
                      <Icon className="w-4 h-4" />
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
