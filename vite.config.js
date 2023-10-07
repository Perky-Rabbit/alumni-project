import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),

    // VitePWA({
    //   manifest: {
    //     name: 'My App',
    //     short_name: 'My App',
    //     icons: [
    //       {
    //         src: '/icons/icon192.png',
    //         sizes: '192x192',
    //         type: "image/png"
    //       },
    //       {
    //         src: "/icons/icon512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "any maskable"
    //       },
    //     ],
    //   },

    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         // Cache GET requests

    //         // urlPattern: /^http:\/\/127.0.0.1:8000\//,
    //         urlPattern: ({ url }) => {
    //           return url.pathname.startsWith("/");
    //         },
    //         handler: 'NetworkFirst',
    //         options: {
    //           cacheName: 'alumni-cache-get',
    //           expiration: {
    //             maxAgeSeconds: 60 * 60 * 24, // Cache for 1 day
    //           },
    //           cacheableResponse: {
    //             statuses: [0, 200],
    //           },
    //         },
    //       },

    //       {
    //         // Cache POST requests
    //         urlPattern: ({ url }) => {
    //           return url.pathname.startsWith("/");
    //         },
    //         handler: 'NetworkFirst',
    //         method: 'POST',
    //         options: {
    //           cacheName: 'alumni-cache-post',
    //           backgroundSync: {
    //             name: 'alumni-post-queue',
    //             options: {
    //               maxRetentionTime: 60, // Retry for up to 1 Minutes
    //             },
    //           },
    //         },
    //       },

    //     ],
    //   },
    // }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
