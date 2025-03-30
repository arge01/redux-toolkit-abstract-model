import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import path from "path";
import tailwindcss from "tailwindcss";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
