const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  target: "web",
  plugins: [],
  devServer: {
    static: "./dist"
  }
}

module.exports = merge(common, devConfig);
