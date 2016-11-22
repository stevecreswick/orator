var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'public')
};

module.exports = {
  context: __dirname,
  entry: {
    app: PATHS.app
  },
  // entry: './js/App.jsx',
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  resolve: {
    moduleDirectories: ['node_modules', 'js'],
    extensions: ['', '.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./styles")]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader:  ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!sass-loader'
        )
      }
    ]
  }
}
