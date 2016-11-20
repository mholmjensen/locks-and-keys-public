// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');
var path = require('path');

let development = {
  entry: {
    app: [
      './src/app/App.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'app.bundle.js',
  },
  devtool: 'inline-sourcemap',
  module: {
    loaders: [
      {
        test: /\.css$/, // See https://github.com/gajus/react-css-modules
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}

module.exports = development
