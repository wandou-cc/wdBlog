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
  css: ["@static/element-ui/index.css", { src: "@assets/styles/global.less", lang: 'less' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/element-ui",
    { src: "@/plugins/vue-mavon-editor", ssr: false },
    { src: "@/plugins/axios", ssr: false },
    '@plugins/publicFunction.js',
    '@plugins/router.js',
    '@components/globalRC.js'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  modules: [
    '@nuxtjs/axios',
    '@gauseen/nuxt-proxy',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    less: './assets/styles/global.less'
  },

  axios: {
    proxy: true,
    baseURL: 'http://192.168.108.216:24084/api',
  },
  proxy: {
    '/api': { target: 'http://192.168.108.216:24084/api', pathRewrite: {'^/api': ''}, changeOrigin: true }
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },
  // proxyTable: {
  //   '/api': { target: 'http://192.168.108.216:24083/api', ws: false, pathRewrite: { '^/api': '' } }
  // },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    vendor: ['axios']
  }
};
