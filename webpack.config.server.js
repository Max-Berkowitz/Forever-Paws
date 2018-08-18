const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'server'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'server/dist'),
    filename: 'server.js',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: nodeExternals(),
  devtool: 'source-map',
};
