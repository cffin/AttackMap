
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 9527 // dev port
var webpack = require('webpack');
module.exports = {
  publicPath: '/',
  outputDir: 'dist/visualization',
  assetsDir: 'visualizationStatic',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}