export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'NuxtBnB: %s',
    htmlAttrs: {
      lang: 'en',
    },
    bodyAttrs: {
      class: ['body-style'],
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/sass/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/auth.client.js',
    '~/plugins/maps.client.js',
    '~/plugins/api.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['~/modules/auth', '~/modules/algolia'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    },
  },

  // Router Configuration: https://nuxtjs.org/docs/configuration-glossary/configuration-router
  router: {
    prefetchLinks: true,
  },

  publicRuntimeConfig: {
    maps: {
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
    auth: {
      cookieName: process.env.GOOGLE_AUTH_COOKIE_NAME,
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    },
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_PUBLIC_API_KEY,
    },
  },

  privateRuntimeConfig: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_PRIVATE_API_KEY,
    },
  },
}
