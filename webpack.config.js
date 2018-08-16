const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'client/src'),
  entry: {
    app: './index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'client/dist/assets'),
    filename: 'bundle.js',
    publicPath: '/assets',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
              plugins: ['transform-object-rest-spread', 'async-to-promises', 'transform-runtime'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
