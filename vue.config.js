const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer:{
    proxy:{
      '':{
        target:'localhost:8080',
        ws:true,
        changeOrigin:true
      },
      // proxy:{
      //   '/api':{
      //     target:'http://127.0.0.1:8000/',
      //     ws:true,
      //     changeOrigin:true
      //   },
      // }
    }
  }
})
