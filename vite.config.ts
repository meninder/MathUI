import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/MathUI/", // Base path for GitHub Pages project site
  build: {
    outDir: "docs", // Set output directory to 'docs'
    emptyOutDir: true, // Clear the output directory before building
    copyPublicDir: true, // Copy public directory to outDir
  },
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
