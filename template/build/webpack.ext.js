'use strict'

const glob = require('glob')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = require('../config')


const isPro = process.env.NODE_ENV === 'production'

// #region assist
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// file Exists
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK)
  } catch (e) {
    return false
  }
  return true
}
// getEntry
function getEntry() {
  let entry = {}
  // 读取开发目录,并进行路径裁剪
  let _entryjs = '/entry.js'
  let _dir = 'src/pages/'
  glob.sync('./' + _dir + '**' + _entryjs)
    .forEach(function (name) {
      let start = name.indexOf(_dir) + _dir.length
      let end = name.length - _entryjs.length
      let eArr = []
      let n = name.slice(start, end)
      n = n.split('/').join('_')
      // n = n[n.length - 1]
      // console.log(n)
      // eArr.push(name)
      // entry[n] = eArr
      entry[n] = name
    })
  return entry
}
// getHtmlPlugin
function getHtmlPlugin(name, tpl) {
  tpl = tpl.replace('entry.js', 'template.html')
  if (!fsExistsSync(tpl)) {
    console.log(tpl)
    tpl = './src/template.html'
  }
  if (isPro) {
    return (new HtmlWebpackPlugin({
      // favicon: resolve('../src/APPcommon/img/fav.png'),
      filename: 'html/' + name + '.html',
      template: tpl,
      inject: true,
      chunks: ['_manifest.app', name],
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }))
  } else {
    return (new HtmlWebpackPlugin({
      filename: 'html/' + name + '.html',
      template: tpl,
      chunks: ['_manifest.app', name],
      inject: true
    }))
  }
}
// #endregion

// #region convert entry rules plugins output
function convert(wc) {
  let entryObj = getEntry()
  let pageNameList = Object.keys(entryObj)
  let proHtmlPlugin = []
  // #region rules
  wc.module.rules.forEach(function (item, index, array) {
    if (item.test) {
      if (item.test.toString() === /\.(png|jpe?g|gif|svg)(\?.*)?$/.toString()) {
        item.options = {
          limit: 10000,
          name: './img/[name].[hash:7].[ext]'
        }
      } else if (item.test.toString() === /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/.toString()) {
        item.options = {
          limit: 10000,
          name: './media/[name].[hash:7].[ext]'
        }
      } else if (item.test.toString() === /\.(woff2?|eot|ttf|otf)(\?.*)?$/.toString()) {
        item.options = {
          limit: 10000,
          name: './fonts/[name].[hash:7].[ext]'
        }
      }
    }
  });

  // #endregion

  // #region plugins output
  wc.plugins = wc.plugins.filter((p) => {
    let keeps = !(p instanceof HtmlWebpackPlugin) &&
      !(p instanceof ExtractTextPlugin) &&
      (!(p instanceof webpack.optimize.CommonsChunkPlugin)) &&
      (!(p instanceof UglifyJsPlugin))
    return keeps
  })
  if (isPro) {
    // 输出目录的配置，js,css,img,html等存放目录
    wc.output = {
      path: resolve('./dist'),
      // 转换相对路径
      publicPath: '..' + config.build.assetsPublicPath,
      filename: 'js/[name].[chunkhash].js'
    }
    proHtmlPlugin = [new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),  // 根目录
      verbose: false // 在控制台输出信息
    }), new UglifyJsPlugin({
      uglifyOptions: {
        beautify: false,
        // https://github.com/mishoo/UglifyJS2/blob/master/lib/output.js
        output: {
          // 中文ascii化，非常有用！防止中文乱码的神配置
          ascii_only: true,
          // 在输出中保存版权注释
          comments: false
        },
        // https://github.com/mishoo/UglifyJS2/blob/master/lib/compress.js
        compress: {
          // 不输出警告
          warnings: false,
          // 去掉 console
          drop_console: false,
          // 去掉 debugger
          drop_debugger: true
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }), new webpack.optimize.CommonsChunkPlugin({
      name: '_manifest.app',
      // async: 'vendor-async',
      minChunks: pageNameList.length > 1 ? pageNameList.length : Infinity
    }), new ExtractTextPlugin({
      filename: 'css/[name].css?[contenthash]',
      allChunks: true
    })]
  } else {
    // 输出目录的配置，js,css,img,html等存放目录
    wc.output = {
      path: resolve('./dist'),
      publicPath: config.dev.assetsPublicPath,
      filename: 'js/[name].js'
    }
    const HOST = wc.devServer.host
    const PORT = wc.devServer.port && Number(wc.devServer.port)
    proHtmlPlugin = [new OpenBrowserPlugin({
      url: 'http://' + HOST + ':' + PORT + '/html/index.html' // 测试页面选择test.html，可以自己更改
    }), new webpack.optimize.CommonsChunkPlugin({
      name: '_manifest.app',
      // async: 'vendor-async',
      minChunks: pageNameList.length
    }), new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    })]
  }
  for (let i = 0; i < pageNameList.length; i++) {
    proHtmlPlugin.push(getHtmlPlugin(pageNameList[i], entryObj[pageNameList[i]]))
  }
  wc.entry = entryObj
  wc.plugins = (wc.plugins || []).concat(proHtmlPlugin)
  // #endregion
}
// #endregion

// exports
if (isPro) {
  let webpackConfig = require('./webpack.prod.conf')
  convert(webpackConfig)
  module.exports = webpackConfig
} else {
  let tmp = require('./webpack.dev.conf')
  module.exports = tmp.then(function (message) {
    convert(message)
    return message
  }, function (err) {
    return err
  })
}
