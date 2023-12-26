const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_JOKE_API_URL,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  pwa: {
    pluginOptions: {
      workboxOptions: {
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: new RegExp(`^${process.env.VUE_APP_JOKE_API_URL}/.*\\?Lang=`),
            handler: 'networkFirst',
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
    },
  },
});
