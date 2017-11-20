const path = require('path')
const webpack = require('webpack')
const cssnext = require('postcss-cssnext')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const outputPath = path.resolve(__dirname, 'static/dist/')
const publicPath = '/dist/'


module.exports = {
  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath: publicPath
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'iview': 'iview'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {

    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders:{
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          'presets': ['env', 'stage-3'],
          "plugins": ["transform-runtime"]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'XY',
      alwaysWriteToDisk: true,
      template: './views/background.html',
      filename: 'background.html',
      chunks: ['background']
    }),
    new HtmlWebpackPlugin({
      title: 'XY',
      alwaysWriteToDisk: true,
      template: './views/front.html',
      filename: 'front.html',
      chunks: ['front']
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, '../views/dist')
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        postcss: [
          cssnext({
            "browserslist": [
              "last 3 version",
              "ie 9"
            ],
            features: {
              customProperties: {
                variables: {
                  '--main-color': '#409EFF',
                  '--light-color': '#eaf6fc',
                  '--c-color': '#ededed',
                  '--border-color': '#efefef'
                }
              }
            }
          })
        ]
      }
    }),
    new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
