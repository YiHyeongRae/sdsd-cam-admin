import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";

// https://vitejs.dev/config/

export default ({ mode }: { mode: string }) => {
  return defineConfig({
    plugins: [react(), svgr()],
    resolve: {
      alias: [{ find: "#", replacement: "/src" }],
    },
  });
};
