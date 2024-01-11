import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "2d-visibility",
      fileName: "index",
      formats: ["es"],
    },
  },
});
