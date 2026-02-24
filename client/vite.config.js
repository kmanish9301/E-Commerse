import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default ({ mode }) => {
  // Load environment variables
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());

  const port = env.PORT ? parseInt(env.PORT, 10) : 5174;

  return defineConfig({
    test: {
      global: true,
      environment: "jsdom",
    },
    plugins: [react(), tailwindcss()],
    server: {
      host: "0.0.0.0", // Expose on network for deployment
      port,
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    },
    build: {
      target: "esnext",
      chunkSizeWarningLimit: 500,
      outDir: "dist",
      emptyOutDir: true,
    },
  });
};

