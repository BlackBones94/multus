const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == "development";

const config = {

  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },

  mode: 'development',
  devServer: {
    open: true,
    host: "localhost",
    hot: false,
    watchFiles: ['./src/**/*.*'],
    static: {
      directory: './',
      serveIndex: true,
      watch: true,
    },
    port: 8000,
    compress: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
