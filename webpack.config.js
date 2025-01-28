const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { ProvidePlugin } = require("webpack");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    entry: "./src/app/index.js",
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "source-map",
    stats: "errors-warnings",
    output: {
      filename: isProduction ? "bundle.[contenthash].js" : "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath:'/',
      environment: {
        arrowFunction: false,
        destructuring: false,
        forOf: false,
        optionalChaining: false,
        templateLiteral: false,
        const: false,
      },
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 3000,
      client: {
        progress: true,
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: true,
        },
      },
      compress:true,
      open:false
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      chrome: 39,
                    },
                    useBuiltIns: "usage",
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules:false,
                // modules: {
                //   mode: "local",
                //   auto: true,
                //   localIdentName: "testapp__[local]--[hash:base64:5]",
                // },
                sourceMap: true,
                url: true,
              },
            },
            // "sass-loader",
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: "asset/resource", // Handle images as assets
      generator: {
        filename: 'assets/images/[name][ext][query]', // Path in the output
      },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction ? true : false, // Remove console.log statements
            },
            format: {
              comments: isProduction ? false : true, // Remove comments
            },
          },
          extractComments: isProduction ? false : true, // Prevent license comments from being extracted into separate files
        }),
        new CssMinimizerPlugin()
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        cache: false,
      }),
      ...(isProduction
        ? [new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" })]
        : []),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public"),
            to: ".",
            noErrorOnMissing: true, // Avoid errors for missing files
            globOptions: {
              verbose: true, // Enable detailed logs
            },
          },
        ],
      }),
      new ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }),
    ],
  };
};
