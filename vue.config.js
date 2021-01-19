// https://cli.vuejs.org/zh/config/#pages
const pages = {
  index: {
    entry: './src/pages/index/index.js',
    template: './src/pages/index/index.html',
    title: 'MapPlat',
  },
  login: {
    entry: './src/pages/login/login.js',
    template: './src/pages/login/login.html',
    title: 'MapPlat-Login',
  },
};

module.exports = {
  productionSourceMap: false,
  publicPath: '/',
  outputDir: './dist/',
  pages,
  devServer: {
    port: 9999,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hotOnly: false,
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/style/variable.scss";',
      },
    },
  },
};
