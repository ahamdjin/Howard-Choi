import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        filter: ({ path: routePath }) =>
          !routePath.startsWith("/admin") && !routePath.startsWith("/auth"),
      },
    }),
    nitro(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
      "react-router-dom": path.resolve(rootDir, "./src/lib/router-compat.tsx"),
    },
  },
});
