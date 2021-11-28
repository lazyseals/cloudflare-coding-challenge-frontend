import { getMetadata } from "./services/metadata";
import { title, metaDescription, author } from "./utils/constants";

export default {
  ssr: false,

  head: getMetadata(),

  modern: true,

  css: [],

  plugins: ["~/plugins/axios-accessor"],

  components: true,

  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/tailwindcss",
    "@aceforth/nuxt-optimized-images",
    "@nuxtjs/google-fonts",
    "@nuxtjs/pwa",
  ],

  modules: ["@nuxtjs/axios", "nuxt-lazy-load", "nuxt-client-init-module"],

  axios: {
    baseUrl:
      process.env.NODE_ENV === "production"
        ? "https://backend.danielvonmirbach.workers.dev"
        : "http://localhost:8787",
  },

  googleFonts: {
    families: {
      Roboto: true,
    },
    display: "swap",
    preload: true,
    prefetch: true,
  },

  pwa: {
    meta: {
      name: title,
      author,
      description: metaDescription,
      lang: "en",
    },
    icon: {
      fileName: "icon.png",
    },
  },

  build: {},
};
