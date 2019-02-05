// vue.config.js
module.exports = {
  // disable sourcemap
  productionSourceMap: false,

  css: {
      loaderOptions: {
          sass: {
              data: `@import "@/styles/main.scss";`
          }
      }
  }
}