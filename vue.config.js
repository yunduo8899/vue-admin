const path = require('path')

module.exports = {
  publicPath: './', // 基本路径,打包时加上.
  outputDir: process.env.outputDir, // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // webpack配置
  chainWebpack: (config) => {
    config.resolve.symlinks(true)
  },
  configureWebpack: (config) => {
    if (process.env.VUE_APP_MODE === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
    } else {
        // 为开发环境修改配置...
        config.mode = 'development'
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          // 'vue$': 'vue/dist/vue.js',
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@v': path.resolve(__dirname, './src/views'),
          '@s': path.resolve(__dirname, './src/styles')
        } // 别名配置
      }
    })
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      scss: {
        // ~@为./的别名
        prependData: `@import "~@s/common.scss";`
      },
      // 给 less-loader 传递 Less.js 相关选项
    }
  },
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 自动打开浏览器
    host: '0.0.0.0', // 允许外部ip访问
    port: 8022, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    // proxy: {
        // [process.env.VUE_APP_MODE]: {
        //     target: `http://cs.ep.eichong.com:2482/api`,
        //     changeOrigin: true,
        //     pathRewrite: {//看后台是否有，决定是否重写
        //         ["^" + process.env.VUE_APP_API_URL]: ""
        //     }
        // }
        proxy: {
          '/api': {
              // target: `http://960882.com/index.php/`,
              target: `http://dev.cc/index.php/`,
              changeOrigin: true,
              pathRewrite: {//看后台是否有，决定是否重写
                  "^\api": ""
              }
          }
        }
  },
  // 第三方插件配置
  pluginOptions: {}
}