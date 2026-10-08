import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    css: false,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})
