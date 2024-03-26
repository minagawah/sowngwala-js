const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const LicenseWebpackPlugin =
  require('license-webpack-plugin').LicenseWebpackPlugin;

const {
  DEFAULT_CONFIG_FOR_LIB,
  DEFAULT_CONFIG_FOR_CHECK,
} = require('./webpack.base.js');

const { version } = require('./package.json');

const DEFAULT_CONFIG = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
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
    devtool: 'cheap-source-map', // hidden-source-map
    performance: {
      maxEntrypointSize: 921600, // 900 KiB
      maxAssetSize: 921600, // 900 KiB
    },
    plugins: [
      new LicenseWebpackPlugin({
        perChunkOutput: true,
      }),
    ],
  }
);

// For the checker app

const get_check_chunk_name = name =>
  name === 'check' ? `check-${version}.js` : '[name].js';

const config_for_checker = merge(
  DEFAULT_CONFIG_FOR_CHECK,
  DEFAULT_CONFIG,
  {
    entry: {
      check: {
        import: './src.check/index.js',
        dependOn: 'data',
      },
      data: './src.check/data.js',
    },
    output: {
      filename: pathData =>
        get_check_chunk_name(pathData.chunk.name),
      chunkFilename: pathData =>
        get_check_chunk_name(pathData.chunk.id),
    },
    devtool: false,
    performance: {
      maxEntrypointSize: 2560000, // 2.5 MiB
      maxAssetSize: 2560000, // 2.5 MiB
    },
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
        VERSION: version,
        SOWNGWALA_PATH: `https://tokyo800.jp/mina/sowngwala-${version}.js`,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[fullhash].css',
        chunkFilename: 'css/[id].[chunkhash].css',
      }),
    ],
  }
);

module.exports = [config_for_library, config_for_checker];
