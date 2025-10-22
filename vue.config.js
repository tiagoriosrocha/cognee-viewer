const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // Configuração do Vuetify
  pluginOptions: {
    vuetify: {
      theme: {
        defaultTheme: "light",
      },
      icons: {
        defaultSet: "mdi",
      },
    },
  },

  // Configurações de desenvolvimento
  devServer: {
    port: 8080,
    open: true,
    hot: true,
  },

  // Configurações de build
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',

  // Configurações de CSS
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: process.env.NODE_ENV === 'development',
  },

  // Configurações de Webpack
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
      },
    },
  },

  // Configurações de chainWebpack
  chainWebpack: (config) => {
    // Configurações específicas do Webpack
    config.plugin('html').tap((args) => {
      args[0].title = 'Meu Projeto Vue'
      return args
    })
  },

  // Configurações de PWA (se necessário)
  pwa: {
    name: 'Meu Projeto Vue',
    themeColor: '#1976D2',
    msTileColor: '#1976D2',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
})
