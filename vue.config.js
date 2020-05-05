// vue.config.js
module.exports = {
  // 选项...
  // runtimeCompiler: true,
  /* configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'  // $代表精确匹配
      }
    }
  } */
  // 配置开发代理服务器
  devServer: {
    // proxy: 'http://localhost:4000'
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // rewrite path
        },
        '/foo': {
          target: '<other_url>',
          pathRewrite: {
            '^/api/old-path': '/api/new-path', // rewrite path
            '^/api/remove/path': '/path', // remove base path
          },
        }
      }
    }
  }
}