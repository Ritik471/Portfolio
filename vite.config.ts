import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "localhost",
    port: 8080,
    strictPort: false,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api-waka': {
        target: 'https://wakatime.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-waka/, ''),
      },
      '/api-spotify': {
        target: 'https://api.spotify.com/v1',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-spotify/, ''),
      },
      '/spotify-token': {
        target: 'https://accounts.spotify.com/api/token',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/spotify-token/, ''),
      },
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("framer-motion")) return "motion";
          if (id.includes("@iconify")) return "iconify";
          if (id.includes("recharts") || id.includes("d3-")) return "charts";
          if (
            id.includes("react-activity-calendar") ||
            id.includes("react-github-calendar")
          ) {
            return "github-calendar";
          }
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("@tanstack")) return "query";
          if (id.includes("react-hook-form") || id.includes("@hookform")) {
            return "forms";
          }
          if (
            id.includes("react-router") ||
            id.includes("@remix-run/router")
          ) {
            return "router";
          }
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/")
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
}));
