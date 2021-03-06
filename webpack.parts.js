const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackStrip = require("strip-loader");

exports.generateSourceMaps = ({type}) => ({
  devtool: type
});

exports.extractCSS = ({include, exclude, use = []}) => {
  const plugin = new MiniCssExtractPlugin({
    filename: "./css/styles[hash].css"
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: [
            MiniCssExtractPlugin.loader
          ].concat(use)
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.devServer = ({host, port} = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: true,
    clientLogLevel: "warning"
  }
});

exports.fileLoader = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|mp4)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  }
});

exports.loadCSS = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude: [/node_modules/, /docs/],
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]_[local][hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  }
});

exports.buildJs = (env) => {
  const use = [
    {
      loader: "babel-loader"
    },
    {
      loader: "eslint-loader",
      options: {
        failOnError: true
      }
    }
  ];

  if (env === "production") {
    use.unshift({
      loader: WebpackStrip.loader("debug", "console.log")
    });
  }

  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          enforce: "pre",
          exclude: [/docs/, /node_modules/, /.spec.js/],
          use
        },
        {
          test: /\.(png|jpe?g|gif|ttf|eot|woff2?|svg)$/,
          exclude: /node_modules/,
          loader: "url-loader?limit=80000"
        }
      ]
    }
  };
};

exports.optimization = () => ({
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      chunks: "initial"
    }
  }
});
