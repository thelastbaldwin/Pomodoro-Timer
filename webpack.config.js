const path = require("path");
const merge = require("webpack-merge");
const parts = require("./webpack.parts");
// add this to plugins array to debug size issues
// var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

// copies the index.html to dist and adds the appropriate link and script tags
const htmlPlugin = new HtmlWebPackPlugin({
  template: "index.html",
  filename: "index.html"
});

const cleanWebpackPlugin = new CleanWebpackPlugin(["docs"])

const commonConfig = merge([
  {
    entry: {
      app: "./js/index.jsx"
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    context: path.resolve("src/"),
    output: {
      path: path.resolve(__dirname, "docs"),
      filename: "[name].[contenthash].js"
    },
    plugins: [
      htmlPlugin
    ]
  },
  parts.fileLoader()
]);

const productionConfig = merge([
  parts.buildJs("production"),
  parts.extractCSS({
    use: [{
      loader: "css-loader",
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: "[name]_[hash:base64:5]"
      }
    },
    {
      loader: "postcss-loader"
    }]
  }),
  parts.optimization(),
  parts.generateSourceMaps("cheap-module-source-map"),
  {
    plugins: [
      cleanWebpackPlugin
    ]
  }
]);

const developmentConfig = merge([
  parts.buildJs(),
  parts.loadCSS(),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.generateSourceMaps("cheap-module-eval-source-map"),
  {watch: true}
]);

module.exports = (mode) => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, {mode});
  }

  return merge(commonConfig, developmentConfig, {mode});
};
