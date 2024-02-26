const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LicenseWebpackPlugin =
  require('license-webpack-plugin').LicenseWebpackPlugin;

const {
  DEFAULT_CONFIG_FOR_LIB,
  DEFAULT_CONFIG_FOR_CHECK,
} = require('./webpack.base.js');

const { version } = require('./package.json');

const DEFAULT_CONFIG = {
  mode: 'production',
  devtool: 'cheap-source-map', // hidden-source-map
  performance: {
    maxEntrypointSize: 921600, // 900 KB
    maxAssetSize: 921600, // 900 KB
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: '"production"',
    }),
  ],
};

// For the main library

const config_for_library = merge(
  DEFAULT_CONFIG_FOR_LIB,
  DEFAULT_CONFIG,
  {
    plugins: [
      new LicenseWebpackPlugin({
        perChunkOutput: true,
      }),
    ],
  }
);

// For the checker app

const config_for_checker = merge(
  DEFAULT_CONFIG_FOR_CHECK,
  DEFAULT_CONFIG,
  {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src.check/check.html',
        inject: 'body',
        minify: false,
        version,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[fullhash].css',
        chunkFilename: 'css/[id].[chunkhash].css',
      }),
    ],
  }
);

module.exports = [config_for_library, config_for_checker];
