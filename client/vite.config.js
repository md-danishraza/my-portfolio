// vite.config.js - Simplified version
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          "icons-fa": ["react-icons/fa"],
          "icons-md": ["react-icons/md"],
          "icons-hi": ["react-icons/hi"],
          contentful: ["contentful"],
          toast: ["react-toastify"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: false,
    target: "es2020",
  },
});
