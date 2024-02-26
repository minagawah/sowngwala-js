const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  DEFAULT_CONFIG_FOR_LIB,
  DEFAULT_CONFIG_FOR_CHECK,
} = require('./webpack.base.js');

const { version } = require('./package.json');

const DEFAULT_CONFIG = {
  mode: 'development',
  devtool: 'inline-source-map',
};

// For the main library

const config_for_library = merge(
  DEFAULT_CONFIG_FOR_LIB,
  DEFAULT_CONFIG
);

// For the checker app

const config_for_checker = merge(
  DEFAULT_CONFIG_FOR_CHECK,
  DEFAULT_CONFIG,
  {
    output: {
      filename: 'check.[fullhash].js',
    },
    devServer: {
      port: 3000,
      static: {
        directory: path.resolve(__dirname, './dist/check'),
      },
      devMiddleware: {
        writeToDisk: true,
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        NODE_ENV: '"development"',
      }),
      new HtmlWebpackPlugin({
        template: './src.check/check.html',
        inject: 'body',
        minify: false,
        version,
      }),
    ],
  }
);

module.exports = [config_for_library, config_for_checker];
