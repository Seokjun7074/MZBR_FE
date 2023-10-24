/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2021',
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpg)$/i,
        issuer: /\.[jt]sx?$/,
        use: ['url-loader'],
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].bundle.js',
    publicPath: '/',
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@apis': path.resolve(__dirname, './src/apis'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      favicon: path.resolve(__dirname, './public/icons/favicon.ico'),
      manifest: path.resolve(__dirname, './public/manifest.json'),
    }),
    new CopyPlugin({
      patterns: [{ from: 'public/icons', to: '' }],
    }),
    new Dotenv(),
  ],
};
