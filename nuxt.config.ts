// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: [
        "@nuxt/ui",
        "@nuxt/image",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
    ],
    ui: { icons: ["mdi"] },
    // TODO: Use a cream color instead of #FFFFFF?
    colorMode: { preference: "light" },
});

