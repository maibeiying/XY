const path = require('path')
const os = require('os')
const webpack = require('webpack')
const cssnext = require('postcss-cssnext')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const HappyPack = require('happypack')

let happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
let outputPath = path.resolve(__dirname, 'static/dist/')
let publicPath = '/dist/'


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
        // loader: 'happypack/loader?id=styles',
        options: {
          loaders:{
            css: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            }))
          }
        }
      },
      {
        test: /\.js$/,
        // loader: 'happypack/loader?id=js',
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          'presets': ['env', 'stage-3'],
          "plugins": ["transform-runtime"]
        }
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: ['css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins () {
                return [cssnext({
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
                })]
              }
            }
          }]
        }))
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
    /*new HappyPack({
      id: 'js',
      loaders: [{
        path: 'babel-loader',
        options: {
          'presets': ['env', 'stage-3'],
          'plugins': ["transform-runtime"]
        }
      }],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    new HappyPack({
      id: 'styles',
      threadPool: happyThreadPool,
      loaders: [{
        path: 'vue-loader',
        options: {
          loaders:{
            css: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            }))
          }
        }
      }]
      // loaders: [ 'vue-style-loader', 'css-loader', 'postcss-loader', 'css-hot-loader']
    }),*/
    new HtmlWebpackPlugin({
      title: 'XY',
      alwaysWriteToDisk: true,
      template: './views/background.html',
      filename: 'background.html',
      chunks: ['background']
      /* minify: {
        removeComments: true, // 去掉注释
        minifyJS: true, // 压缩js
        minifyCSS: true, // 压缩css
        collapseWhitespace: true, // 去掉空格
        useShortDoctype: true,
        removeScriptTypeAttributes: true
      } */
    }),
    /* new HtmlWebpackPlugin({
      title: 'XY',
      alwaysWriteToDisk: true,
      template: './views/front.html',
      filename: 'front.html',
      chunks: ['front'],
      minify: {
        removeComments: true, // 去掉注释
        minifyJS: true, // 压缩js
        minifyCSS: true, // 压缩css
        collapseWhitespace: true, // 去掉空格
        useShortDoctype: true,
        removeScriptTypeAttributes: true
      }
    }),*/
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
