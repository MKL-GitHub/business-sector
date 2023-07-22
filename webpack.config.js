const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require("path");

let config = {
  context: path.join(__dirname, '/src'), // Директория с исходным кодом приложения
  entry: 'index.js', // Главный файл приложения
  output: {
    path: path.join(__dirname, 'dist'), // Куда делать оброку
    filename: '[name].js', // Шаблон для названия файлов
    clean: true, // Очистить ./dist перед сборкой
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx'], // расширения по умолчанию если не указаны в import
    modules: ['./', 'node_modules'], // Где искать файлы подключаемых модулей (пакетов)
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        loader: "url-loader",
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'assets/svgs/',
          limit: false
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(), // Плагин для вытаскивания собранных стилей в отдельный файл
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
      title: 'Сектор бизнеса',
      base: '/',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}

module.exports = config;