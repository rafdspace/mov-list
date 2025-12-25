/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/__tests__/**/*.{test,spec}.{ts,tsx}"],
    setupFiles: "./vitest.setup.ts",
    css: true,
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/__tests__/**",
        "src/main.tsx",
        "src/types/**",
        "src/vite-env.d.ts",
        "src/App.tsx",
      ],
    },
  },
});
