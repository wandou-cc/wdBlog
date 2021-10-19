export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "BLOG",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "/rem.js", type: "text/javascript", charset: "utf-8" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["element-ui/lib/theme-chalk/index.css", "@assets/styles/global.less"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/element-ui",
    { src: "@/plugins/vue-mavon-editor", ssr: false },
    '@/plugins/axios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  modules: [
    '@nuxtjs/axios',
  ],
  axios:{
    proxy:true
  },
  proxy: {
    "/api": "http://localhost:24082/api"
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  }
};
