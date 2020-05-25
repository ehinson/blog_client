const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const Dotenv = require('dotenv-webpack');

const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      state: path.resolve(__dirname, 'src/state/'),
      views: path.resolve(__dirname, 'src/views/'),
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin({
      dry: true,
      cleanAfterEveryBuildPatterns: ['**/*', '!index.html'],
    }),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      favicon: 'src/favicon.ico',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 3000,
    watchContentBase: true,
    progress: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false,
      },
    },
  },
};
