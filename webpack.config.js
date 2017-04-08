/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { rules, alias, noParse } = require('./utils/phaser-shim')

const paths = {
  SRC: path.resolve(__dirname, 'src'),
  DEST: path.resolve(__dirname, 'dist'),
}

const config = {
  entry: {
    main: paths.SRC,
  },
  output: {
    path: paths.DEST,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    noParse,
    rules: [
      ...rules,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(paths.SRC, 'index.html') }),
    new CleanWebpackPlugin([paths.DEST]),
    new CopyWebpackPlugin([{ from: 'assets', to: 'assets' }]),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: { alias },
  devServer: {
    historyApiFallback: true,
    inline: true,
    stats: 'errors-only',
  },
  devtool: 'source-map',
}

module.exports = config
