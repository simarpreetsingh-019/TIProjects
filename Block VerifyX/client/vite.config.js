import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      stream: "stream-browserify",
      crypto: "crypto-browserify",
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    "process.env": {},
    global: {},
  },
  optimizeDeps: {
    include: ["crypto-browserify", "stream-browserify"],
  },
});
