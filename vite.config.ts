import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 8080,
    strictPort: true, // Prevents Vite from switching to 8081 if 8080 is busy
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
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));