import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// VITE_BASE_PATH: "/" for a custom domain or Vercel, "/<repo>/" for a GitHub Pages project site
// such as https://OWNER.github.io/<repo>/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
  build: { outDir: "dist", sourcemap: false },
});
