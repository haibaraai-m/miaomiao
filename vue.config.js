module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://mxnzp.com',
        changeOrigin: true
      },
      '/ajax':{
        target:'https://m.maoyan.com',
        changeOrigin:true
      },
      '/dianying':{
        target:'https://m.maoyan.com',
        changeOrigin:true
      }
    }
  }
}