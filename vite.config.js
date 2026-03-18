import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  strategies: "injectManifest",
  srcDir: "apps/main/src",
  filename: "sw.js",
  injectRegister: "auto",
  injectManifest: {
    maximumFileSizeToCacheInBytes: 0,
  },
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "maskable-icon-512x512.png"],
  manifest: {
    name: "Locket Dio",
    short_name: "Locket Dio",
    description: "Locket Dio - Đăng ảnh & Video lên Locket",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
};

const brand = process.env.VITE_BRAND;
const publicDir = brand ? `apps/main/public-${brand}` : "apps/main/public";

export default defineConfig({
  root: "apps/main",
  publicDir: path.resolve(__dirname, publicDir),
  server: {
    host: true,
  },
  plugins: [tailwindcss(), react(), VitePWA(manifestForPlugIn), visualizer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "apps/main/src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    rollupOptions: {
      output: {
        manualChunks: {
          icons: ["lucide-react", "react-icons"],
          swiper: ["swiper"],
          tour: ["driver.js"],
          marquee: ["react-fast-marquee"],
          toast: ["sonner"],
          crop: ["react-easy-crop"],
          vendor: ["axios", "zustand", "dexie"]
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
});
