import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiTarget = process.env.API_PROXY_TARGET ?? "http://127.0.0.1:4000";

/**
 * Set VITE_SINGLE_FILE=true to inline everything into one HTML file (handy for
 * emailing a demo or dropping on a static host). It is OFF by default because
 * inlining disables hashing, splitting and long-lived asset caching.
 */
const singleFile = process.env.VITE_SINGLE_FILE === "true";

/** Browser-facing code must call the dev server with relative URLs so the API
 *  works identically in local dev, preview and production. */
const proxy = {
  "/api": { target: apiTarget, changeOrigin: true },
  "/health": { target: apiTarget, changeOrigin: true },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), ...(singleFile ? [viteSingleFile()] : [])],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
    proxy,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: true,
    proxy,
  },
  build: {
    outDir: "dist/client",
    sourcemap: true,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: singleFile
          ? undefined
          : {
              react: ["react", "react-dom"],
              motion: ["framer-motion"],
              icons: ["lucide-react"],
            },
      },
    },
  },
});
