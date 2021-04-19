const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    filename: 'bundle.[fullhash].js',
    publicPath: '/',
  },
  devServer: {
    port: 7891,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(),
    new Dotenv({
      systemvars: true,
    }),
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.(jpeg|jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 1000 },
        },
      },
    ],
  },
};
