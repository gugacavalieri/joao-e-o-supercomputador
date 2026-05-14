import { defineConfig } from "vite";

export default defineConfig({
  base: "/joao-e-o-supercomputador/",
  build: {
    outDir: "dist",
    minify: "terser",
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
});
