const webpack = require('webpack')
// const os = require('os')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// const UglifyJsParallelPlugin = require('webpack-uglify-parallel')

module.exports = merge(baseWebpackConfig, {
  entry: {
    'front': './vue/front/app.js',
    'background': './vue/background/app.js'
  },
  devtool: '',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    /*new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      mangle: true,
      compressor: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
       }
    })*/
    new webpack.optimize.UglifyJsPlugin()
  ]
})
