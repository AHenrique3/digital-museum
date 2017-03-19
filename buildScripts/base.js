const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (path, outputPath) => ({
  entry: {
    app: './src/app.js',
  },
  output: {
    path: outputPath,
    filename: path.join('js', '[name].bundle.js'),
    // publicPath: '/',
    sourceMapFilename: '[name].map',
  },
  // resolve: {
  //   extensions: ['.js', '.json'],
  //   modules: [ path.join(__dirname, 'src'), 'node_modules' ]
  // },
  module: {
    loaders: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['latest', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.hbs',
      chunksSortMode: 'dependency',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: path.join('js', 'commons.bundle.js'),
    }),

    // new ForkCheckerPlugin(),
  ]
});