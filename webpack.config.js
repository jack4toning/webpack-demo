/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin, ProvidePlugin } = require('webpack');

const mode =
  process.env.NODE_ENV.toLowerCase() === 'production'
    ? 'production'
    : 'development';

module.exports = {
  mode,
  entry: './src/index.tsx',
  output: {
    path: path.resolve('dist'),
    filename: 'main.[hash].bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // use: ['style-loader', 'css-loader'],
        // use: ['css-loader'],
      },
      {
        test: /\.jpg/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[hash].css',
    }),
    new DefinePlugin({
      TEST_STR:
        process.env.NODE_ENV.toLowerCase() === 'production'
          ? JSON.stringify('This is the test str for production')
          : JSON.stringify('This is the test str for development'),
    }),
    new ProvidePlugin({
      _: 'lodash',
    }),
  ],
  devtool: 'source-map',
};
