import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import tsconfigPath from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), viteSingleFile(), tsconfigPath()],
  build: {
    target: "es2015",
    cssCodeSplit: false,
    assetsInlineLimit: Infinity,
    emptyOutDir: false,
    outDir: "../dist",
    rollupOptions: {
      input: "index.html",
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
