const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const htmlPlugin = new HtmlWebPackPlugin({
  template: 'public/index.html',
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  // chunkFilename: '[id].css'
});

const syncPlugin = new BrowserSyncPlugin(
  {
    host: 'localhost',
    port: '8081',
    proxy: 'http://localhost:8080/',
  },
  {
    reload: false,
  },
);

const cleanPlugin = new CleanWebpackPlugin('build', {});

const DotenvPlugin = new Dotenv();

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  // entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:5]',
              minimize: true,
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|ico|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'images/',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true, // Redirect 404s to /index.html
  },
  plugins: [
    htmlPlugin,
    cssPlugin,
    // syncPlugin,
    cleanPlugin,
    DotenvPlugin,
  ],
};
