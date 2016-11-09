/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { loaders, alias } = require('./utils/phaser-shim')

const paths = {
  SRC: path.resolve(__dirname, 'src'),
  DEST: path.resolve(__dirname, 'dist'),
}

module.exports = {
  entry: {
    main: paths.SRC,
  },
  output: {
    path: paths.DEST,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      ...loaders,
      { test: /\.js$/, loader: 'babel', include: paths.SRC },
    ],
  },
  resolve: { alias },
  devServer: {
    historyApiFallback: true,
    inline: true,
    stats: 'errors-only',
  },
  devtool: 'source-map',
}
