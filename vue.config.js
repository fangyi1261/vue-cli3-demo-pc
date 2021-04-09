/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");

const debug = process.env.NODE_ENV !== 'production';

let { version} = require('./package.json');
version = version.replace(/\./g, '_');
const openGzip = false;

module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'static', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    config.plugin('html').tap((args) => {
      args[0].title = 'PC--管理系统';
      return args;
    });

    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
      // 清除css，js版本号
      config.output.filename('static/js/[name].js').end();
      config.output.chunkFilename('static/js/[name].js').end();
      // 为生产环境修改配置...
      config.plugin('extract-css').tap(args => [{
              filename: `static/css/[name].css`,
              chunkFilename: `static/css/[name].css`
          }])
    }
    // 修复HMR
    config.resolve.symlinks(true);
    // 别名配置
    config.resolve.alias
      .set('@', path.resolve(__dirname, './src'))
      .set('@a', path.resolve(__dirname, './src/assets'))
      .set('@c', path.resolve(__dirname, './src/components'))
      .set('@p', path.resolve(__dirname, './src/pages'))
      .set('jquery$', 'jquery/dist/jquery.min.js');

    const fileRule = config.module.rule('file');
    fileRule.uses.clear()
    fileRule
        .test(/\.pdf|ico$/)
        .use('file-loader')
        .loader('file-loader')
        .options({
            limit: 10000,
        })
  },
  configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (debug) { // 开发环境配置
      config.mode = 'development';
      config.devtool = 'cheap-module-eval-source-map';
    } else { // 生产环境配置
      config.mode = 'production';
      const optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                
                return `npm.${packageName.replace('@', '')}`;
              }
            }
          }
        }
      };
      
      Object.assign(config, {
        output:{
          ...config.output,
          // filename: `static/js/[name].[chunkhash].${version}.js`,
          // chunkFilename: `static/js/[name].[chunkhash].${version}.js`
        },
        optimization,
        plugins: [
          ...config.plugins
        ]
      });
    }
    Object.assign(config, { // 开发生产共同配置，配置别名
      plugins:[
        ...config.plugins,
        new webpack.ProvidePlugin({
          jQuery: "jquery",
          $: "jquery",
          "windows.jQuery":"jquery"
        })
      ]
    });
  },
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  devServer: {
    open: true, // 本地自动打开页面
    host: 'localhost', // 主机
    port: 8081, // 端口
    https: false, // 启用https
    hotOnly: false,
    proxy: { // 配置跨域
      '/api': { // 要访问的跨域的api的域名
        target: 'http://hf.weixin.365keyuan.com',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {}
};
