const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { webpack,ProvidePlugin } = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      environment:{
        arrowFunction: false,
        destructuring:false,
        forOf:false,
        optionalChaining:false,
        templateLiteral:false,
        const:false,
      }
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'source-map',
    devServer: {
      static: './dist',
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", {
                targets: {
                  chrome: 39,
                },
                useBuiltIns: "usage",
                corejs: 3
              }]],
            },
          },
        },
        {
          test: /\.scss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader', // Compiles SCSS to CSS
          ],
        },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator:{
            publicPath: path.resolve(__dirname, 'public'),
          }
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console.log statements
          },
          format: {
            comments: false, // Remove comments
          },
        },
        extractComments: false, // Prevent license comments from being extracted into separate files
      })],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      ...(isProduction ? [new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' })] : []),
      new CopyWebpackPlugin({
        patterns: [
          { 
            from: path.resolve(__dirname, 'public'), 
            to: '.', 
            noErrorOnMissing: true, // Avoid errors for missing files
            globOptions: {
              verbose: true, // Enable detailed logs
            },
          },
        ],
      }),
      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
  };
};
