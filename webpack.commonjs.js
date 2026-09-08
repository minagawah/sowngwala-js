const path = require('path');
const { version } = require('./package.json');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `sowngwala-${version}.cjs`,
    library: {
      type: 'commonjs2',
    },
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
};
