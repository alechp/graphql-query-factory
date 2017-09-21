const path = require("path");
const webpack = require("webpack");

module.exports = {
  target: "node",
  entry: "./exec.js",
  output: {
    path: path.resolve(__dirname, "dist/webpack"),
    filename: "main.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "flow",
                [
                  "env",
                  {
                    targets: {
                      node: "current"
                    }
                  }
                ]
              ],
              plugins: ["transform-flow-strip-types", "inline-dotenv"]
            }
          }
        ]
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};
