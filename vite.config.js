import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
    tailwindcss(),
    // optimasi gambar modern
    imagetools(),

    // compress final bundle (gzip + brotli)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],

  build: {
    target: 'esnext', // target browser modern
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // menegaskan lokasi cache (jika diperlukan)
    cacheDir: '.vite_cache',
  },

  resolve: {
    alias: {
      '@': '/resources/js', // contoh alias
    },
  },

  // opsi optimasi dependensi
  optimizeDeps: {
    // jika ada paket yang membutuhkan interop, tambahkan ke needsInterop
    needsInterop: ['some-legacy-pkg'],
  },
});
