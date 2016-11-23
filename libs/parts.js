const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = function( options ) {
  return {
    devServer: {
      historyApiFallback: true,

      hot: true,
      inline: true,

      stats: 'errors-only',

      host: options.host,
      port: options.port
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}

exports.setupCSS = function( paths ) {
  return {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass'),
          include: paths
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('styles.css', {
          allChunks: true
      })
    ]
  }
};

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
};

exports.setFreeVariable = function( key, value ) {
  const env = {};
  env[ key ] = JSON.stringify( value );

  return {
    plugins: [
      new webpack.DefinePlugin( env )
    ]
  };
};
