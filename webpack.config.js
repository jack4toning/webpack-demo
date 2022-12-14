/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const { DefinePlugin, ProvidePlugin } = require('webpack');

const mode =
  process.env.NODE_ENV.toLowerCase() === 'production'
    ? 'production'
    : 'development';

module.exports = {
  mode,
  entry: {
    index: './src/index.tsx',
    another: './src/another.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      utils: path.resolve('src/utils'),
    },
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
      filename: 'index.html',
      chunks: ['index', 'vendor', 'common'],
    }),
    new HtmlWebpackPlugin({
      template: './public/another.html',
      filename: 'another.html',
      chunks: ['another', 'common'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
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
    // new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            // drop_console: true,
            drop_debugger: true,
          },
        },
      }),
    ],
    splitChunks: {
      // all
      // async ????????????
      // initial ???????????????????????????, import chain
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          // ?????????????????????????????????????????? priority 0 ??? common ?????????
          priority: 1,
          test: /node_modules/,
          // ?????? 0 ??????????????????
          minSize: 0, // Usually 5 * 1024 (5KB)
          // ????????????1?????????????????????
          minChunks: 1,
        },
        common: {
          name: 'common',
          priority: 0,
          minSize: 0, // Usually 5 * 1024 (5KB)
          minChunks: 2,
        },
      },
    },
  },
  devtool: 'source-map',
  // devServer: {
  //   static: './dist',
  // },
};
