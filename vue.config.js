module.exports = {
  lintOnSave: false,
  publicPath: process.env.DEPLOY_ENV === 'GH_PAGES'
    ? '/admin-null-vue-bulma-dashboard/'
    : '/',

  // Remove moment.js from chart.js
  // https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc
  configureWebpack: config => {
    return {
      externals: {
        moment: 'moment'
      }
    }
  }
}
