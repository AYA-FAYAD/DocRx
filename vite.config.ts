import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "@trpc/server/unstable-core-do-not-import",
      "@trpc/server/observable",
    ],
  },
  server: {
    proxy: {
      "/trpc": "http://localhost:3000",
    },
  },
});
