import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import ViteImagemin from "vite-plugin-imagemin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            refresh: true,
        }),
        tailwindcss(),
        react(),

        // Plugin untuk auto-compress file (gzip + brotli)
        viteCompression({
            algorithm: "brotliCompress", // bisa 'gzip' atau 'brotliCompress'
            ext: ".br", // ekstensi file brotli
            threshold: 1024, // hanya file >1KB yang di-compress
            deleteOriginFile: false, // jangan hapus file asli
        }),
        viteCompression({
            algorithm: "gzip",
            ext: ".gz",
            threshold: 1024,
            deleteOriginFile: false,
        }),

        // Plugin optimasi gambar (JPEG, PNG, SVG, GIF)
        ViteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 75, // sesuaikan kualitas
            },
            pngquant: {
                quality: [0.65, 0.8],
                speed: 4,
            },
            svgo: {
                plugins: [
                    { name: "removeViewBox" },
                    { name: "removeEmptyAttrs", active: false },
                ],
            },
        }),
    ],

    build: {
        sourcemap: false,
        chunkSizeWarningLimit: 600, // naikkan limit agar tidak ada warning chunk besar
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ["react", "react-dom"],
                },
            },
        },
    },
});
