console.log("dev");
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfigBase = require('./webpack.base.config');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

console.log("dev");
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    })
  ]
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
