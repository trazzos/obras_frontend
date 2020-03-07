const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    disableHostCheck: true,
  },

  transpileDependencies: ['vue-world-map', 'vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
// If you add an alias here, remember to stop and run yarn serve again
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('globalModule', resolve('src/views/global'))
      .set('companyModule', resolve('src/views/company'))
      .set('userModule', resolve('src/views/user'))
      .set('stageModule', resolve('src/views/stage'))
      .set('projectModule', resolve('src/views/project'))
  },
}
