module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://mxnzp.com',
        changeOrigin: true
      },
    }
  }
}