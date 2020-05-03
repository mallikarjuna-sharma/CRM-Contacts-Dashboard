const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { env } = process;
const path = require('path');

const options = {
  mode: env.NODE_ENV,
  entry: './index.jsx',
  context: __dirname,
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js|.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)?$/,
        use: [
          "file-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']      
},
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV) }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      "React": "react",
   }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000
  },
  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
  devtool: env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : undefined
};
module.exports = options;