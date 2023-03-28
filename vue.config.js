const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir:'static',
  parallel:false,
  publicPath:'./'
//   outputDir:'dist'
//   publicPath:process.env.NODE_ENV === 'production'?'/home/':'/',
//   outputDir:'home'
})
