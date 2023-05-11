// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";
export default defineNuxtConfig({
  build: { transpile: ["vuetify"] },
  modules: ['@nuxtjs/supabase']
})
