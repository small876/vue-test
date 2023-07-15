const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath :process.env.NODE_ENV === 'prodution'
  ? '/vue-test/'
  : '/'
  ,
  devServer:{
    proxy:{
      '':{
        target:'http://127.0.0.1:3000/',
        ws:true,
        changeOrigin:true
      }
    }
  }
})
