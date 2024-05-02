import i18nConfig from './configs/i18n.config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   app: {
      head: {
         link: [
            {
               rel: 'icon',
               href: '/favicon-light.svg',
               media: '(prefers-color-scheme: light)',
            },
            {
               rel: 'icon',
               href: '/favicon-dark.svg',
               media: '(prefers-color-scheme: dark)',
            },
            {
               rel: 'dns-prefetch',
               href: 'https://camdigi.rab.rest',
            },
            {
               rel: 'preconnect',
               href: 'https://camdigi.rab.rest',
            },
         ],
         meta: [{ name: 'theme-color', content: process.env.MAIN_COLOR }],
      },
   },

   css: ['@/assets/scss/steps.scss'],

   devtools: { enabled: true },

   modules: [
      '@nuxt/ui',
      '@nuxtjs/i18n',
      '@nuxtjs/seo',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      // '@vite-pwa/nuxt',
      'nuxt-directus-next',
   ],

   runtimeConfig: {
      directus_url: process.env.DIRECTUS_URL,
      directus_token: process.env.DIRECTUS_STATIC_TOKEN,
      public: {
         mainColor: process.env.MAIN_COLOR,
      },
   },

   site: {
      url: process.env.BASE_URL,
      name: 'Normativa',
      description: 'Canal de denuncias Campus Digital FP.',
   },

   srcDir: 'src/',

   // Modules config

   colorMode: {
      preference: 'light',
   },

   directus: {
      url: process.env.DIRECTUS_URL,
      staticToken: process.env.DIRECTUS_STATIC_TOKEN,
      staticTokenServer: process.env.DIRECTUS_STATIC_TOKEN,
      authConfig: {
         refreshTokenCookieName: 'api_refresh_token',
      },
   },

   i18n: { ...i18nConfig, strategy: 'prefix' },

   ui: {
      icons: ['heroicons', 'mdi'],
   },
});
