const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const { version } = require('./package.json');

const DEFAULT_CONFIG = {
  stats: {
    colors: true,
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};

// For the main library

const DEFAULT_CONFIG_FOR_LIB = merge(DEFAULT_CONFIG, {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `sowngwala-${version}.js`,
    library: 'Sowngwala',
    libraryTarget: 'umd',
  },
});

// For the checker app

const DEFAULT_CONFIG_FOR_CHECK = merge(DEFAULT_CONFIG, {
  entry: './src.check/index.js',
  output: {
    path: path.resolve(__dirname, './dist/check'),
    filename: `check-${version}.js`,
    library: 'Check',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
});

module.exports = {
  DEFAULT_CONFIG_FOR_LIB,
  DEFAULT_CONFIG_FOR_CHECK,
};
