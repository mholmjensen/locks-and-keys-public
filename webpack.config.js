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
  devtool: 'sourcemap',
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
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}

module.exports = development
