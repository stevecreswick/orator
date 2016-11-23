const webpack = require( 'webpack' );
const path = require( 'path' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

const merge = require( 'webpack-merge' )
const validate = require( 'webpack-validator' );

const parts = require( './libs/parts' );

const PATHS = {
  app: path.join( __dirname, 'app' ),
  build: path.join( __dirname, 'public' )
};

const common = {
  context: __dirname,
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
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
      }
    ]
  }
}

var config;

// Detect how npm is run and branch based on that
switch( process.env.npm_lifecycle_event ) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map'
      },

      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),

      parts.minify(),
      parts.setupCSS( PATHS.app )
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      }),
      parts.setupCSS( PATHS.app ),
      {}
    )
}

module.exports = validate( config );
