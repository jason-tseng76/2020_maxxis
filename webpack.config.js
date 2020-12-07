const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'js/main': './src/main',
    // 'content/content': './src/assets/content/content',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      images: path.join(__dirname, 'src', 'images'),
      // '~': path.join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
        // use: [
        //   'style-loader',
        //   { loader: 'css-loader', options: { url: true } },
        //   { loader: 'stylus-loader?resolve url', options: { preferPathResolver: 'webpack' } },
        // ],
      },
      {
        test: /\.(png|jpg|gif|jpe?g|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name][hash:5].[ext]',
              limit: 1024,
              outputPath: 'assets',
              // publicPath: './img',
              // emitFile: false,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    }),
    // # 在plugins裡新增路徑與轉出的位置及細節調整
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/pug/${process.env.APP_ENV}.pug`),
      hash: true,
      filename: 'index.html',
      // 等於'body',javascript 資源將被放置到body元素的底部
      inject: true,
      // 指定需要引入的js，沒有設置默認全部引入
      chunks: ['js/main'],
      // 排除的js
      // excludeChunks: ['devor.js'],
      minify: {
        sortAttributes: true,
        // 折疊空白字元就是壓縮Html
        collapseWhitespace: false,
        // 折疊布林值属性，例:readonly checked
        collapseBooleanAttributes: true,
        // 移除註釋
        removeComments: true,
        // 移除屬性的引號
        removeAttributeQuotes: true,
      },
    }),
    new CopyPlugin([
      { from: 'src/images/kv.png', to: 'assets/kv.png' },
      { from: 'src/images/kv_pad.png', to: 'assets/kv_pad.png' },
      // { from: 'other', to: 'public' },
    ]),
  ],
};
