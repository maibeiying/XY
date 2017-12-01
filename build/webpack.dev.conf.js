const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=__webpack_hmr'

module.exports = merge(baseWebpackConfig, {
  entry: {
    'front': [hotMiddlewareScript, './src/front/entry/app.js'],
    'background': [hotMiddlewareScript, './src/background/entry/app.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
