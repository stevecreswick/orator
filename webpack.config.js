const webpack = require( 'webpack' );
const path = require( 'path' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require( 'webpack-merge' )
const validate = require( 'webpack-validator' );

const parts = require( './libs/parts' );
const package = require('./package.json');

const PATHS = {
  app: path.join( __dirname, 'app' ),
  style: path.join(__dirname, 'app/styles/', 'main.scss'),
  build: path.join( __dirname, 'public' )
};

const common = {
  context: __dirname,
  entry: {
    app: PATHS.app,
    style: PATHS.style,
    vendor: Object.keys( package.dependencies )
  },
  // output: {
  //   path: PATHS.build,
  //   filename: '[name].js'
  // },
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
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars'
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin( { names: [ 'vendor', 'manifest' ] } ),
    new HtmlWebpackPlugin({
      title: 'Orator',
      template: './index.html'
    })
  ],
}

var config;

// Detect how npm is run and branch based on that
switch( process.env.npm_lifecycle_event ) {

  case 'build':
  case 'stats':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          // This is used for require.ensure. The setup
          // will work without but this is useful to set.
          chunkFilename: '[chunkhash].js'
        }
      },

      parts.clean( PATHS.build ),


      // parts.extractBundle({
      //   name: 'vendor',
      //   entries: Object.keys( package.dependencies )
      // }),

      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),

      // parts.minify(),
      parts.extractCSS( PATHS.style ),
      parts.purifyCSS([PATHS.app])
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
      parts.setupCSS( PATHS.style ),
      {}
    )
}

module.exports = validate( config, {
  quiet: true
});
