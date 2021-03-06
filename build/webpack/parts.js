const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');

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
          loaders: [ 'style', 'css', 'sass' ],
          include: paths
        }
      ]
    }
  };
};

exports.extractCSS = function( paths ) {
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
      new ExtractTextPlugin('[name].[chunkhash].css', {
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

// exports.extractBundle = function(options) {
//   const entry = {};
//   entry[ options.name ] = options.entries;
//
//   return {
//     // Define an entry point needed for splitting.
//     entry: entry,
//     plugins: [
//       // Extract bundle and manifest files. Manifest is
//       // needed for reliable caching.
//       new webpack.optimize.CommonsChunkPlugin({
//         names: [ options.name, 'manifest' ]
//       })
//     ]
//   };
// };

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      })
    ]
  };
};

exports.purifyCSS = function( paths ) {
  return {
    plugins: [
      new PurifyCSSPlugin({
        basePath: process.cwd(),
        // `paths` is used to point PurifyCSS to files not
        // visible to Webpack. You can pass glob patterns
        // to it.
        paths: paths
      }),
    ]
  }
};
