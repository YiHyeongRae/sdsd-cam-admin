import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";
// https://vitejs.dev/config/

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react(), svgr(), optimizeLodashImports()],
    resolve: {
      alias: [{ find: "#", replacement: "/src" }],
    },
    server: {
      proxy: {
        "/api/v1/admin": {
          target: env.VITE_API_CAMPUS_SERVER_URL,
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              const module = id.split("node_modules/").pop()?.split("/")[0];
              return `vendor/${module}`;
            }
          },
        },
      },
    },
  });
};
