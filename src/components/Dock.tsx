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
} from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: User },
  { label: "Projects", path: "/projects", icon: FolderOpen },
  { label: "Experience", path: "/experience", icon: Briefcase },
  { label: "Certificates", path: "/certificates", icon: Award },
  { label: "Contact", path: "/contact", icon: Mail },
];

const Sidebar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-6 top-64 z-50 hidden lg:flex flex-col items-center gap-6"
      >
        {/* Logo Monogram */}
        <Link to="/" className="group relative">
          <div className="w-16 h-16 glass-strong rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden bg-black/40 transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
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
        <div className="glass-strong rounded-3xl p-3 flex flex-col gap-2 border border-white/10 shadow-2xl backdrop-blur-md bg-black/40">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative group flex items-center justify-center p-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-white/10 rounded-2xl border border-white/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}

                <div className="absolute left-16 px-3 py-1 bg-white text-black text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 shadow-lg whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
                </div>

                <Icon
                  className={`relative z-10 w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : ""}`}
                />
              </Link>
            );
          })}
        </div>
      </motion.aside>

      {/* Mobile Header (Updated to include Logo) */}
      <div className="fixed top-6 left-6 right-6 z-50 flex justify-between items-center lg:hidden">
        <Link
          to="/"
          className="w-16 h-16 glass-strong rounded-xl flex items-center justify-center border border-white/10 bg-black/60 backdrop-blur-md"
        >
          <img
            src="/assets/images/sidelogo.jpg"
            alt="RS"
            className=" rounded-xl object-cover brightness-125"
          />
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="glass-strong rounded-xl p-4 border border-white/10 shadow-xl bg-black/60 backdrop-blur-md"
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
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
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-white/10 rounded-t-[2.5rem] p-8 pb-12 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-8" />

              {/* Logo in Mobile Menu */}
              <div className="flex flex-col items-center mb-8">
                <img
                  src="/assets/images/sidelogo.jpg"
                  alt="Logo"
                  className="w-16 h-16 mb-2 brightness-125"
                />
                <span className="font-bold text-white tracking-widest uppercase text-xs">
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
                      className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                        isActive
                          ? "bg-white/10 text-white border border-white/10"
                          : "text-muted-foreground hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold text-lg">
                        {item.label}
                      </span>
                    </Link>
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
