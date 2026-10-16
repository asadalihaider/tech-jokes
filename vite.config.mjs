import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  // Keep the VUE_APP_ prefix so existing .env files and hosting config keep working.
  const env = loadEnv(mode, process.cwd(), 'VUE_APP_');

  return {
    envPrefix: 'VUE_APP_',
    plugins: [
      vue(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        // public/manifest.json is linked from index.html
        manifest: false,
        workbox: {
          navigateFallback: '/index.html',
          runtimeCaching: [
            {
              urlPattern: new RegExp(`^${env.VUE_APP_JOKE_API_URL}/.*\\?Lang=`),
              handler: 'NetworkFirst',
              options: {
                networkTimeoutSeconds: 30,
                cacheName: 'api-cache',
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: env.VUE_APP_JOKE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
