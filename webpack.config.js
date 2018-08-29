const WebpackPwaManifest = require('webpack-pwa-manifest');

const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'client/src'),
  entry: './index.jsx',
  output: {
    path: path.resolve(__dirname, 'client/dist/'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{ loader: 'file-loader', options: {} }],
      },
      {
        test: /manifest.json$/,
        use: [{ loader: 'file-loader?name=manifest.json' }],
      },
    ],
  },

  plugins: [
    new WebpackPwaManifest({
      name: 'Forever Paws',
      short_name: 'ForeverPaws',
      description: 'swipe for cuteness and more!',
      background_color: '#ffffff',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('client/src/app/Images/icons/paw-48.png'),
          sizes: [48, 64, 128, 256, 512],
        },
      ],
    }),
  ],
};
