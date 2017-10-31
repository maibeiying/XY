const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  entry: {
    'front': './vue/front/entry/app.js',
    'background': './vue/background/entry/app.js'
  },
  devtool: '',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      title: '乐趣',
      template: './views/background.html',
      filename: '../../views/dist/background.html',
      chunks: ['background']
    }),
    new HtmlWebpackPlugin({
      title: '乐趣',
      template: './views/front.html',
      filename: '../../views/dist/front.html',
      chunks: ['front']
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
})
