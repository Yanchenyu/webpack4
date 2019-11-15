'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const mode = process.env.NODE_ENV;
const devMode = mode !== 'production';

module.exports = {
    mode,
    entry: {
        common: './src/common',
        components: './src/components',
        utils: './src/utils',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader?cacheDirectory'
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? "[name].css" : "[name].[hash].css"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            Utils: path.resolve(__dirname, 'src/utils')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
        modules: [
            // 告诉 webpack 解析模块时应该搜索的目录
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    },
    devServer: {
        hot: true
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    optimization: {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: false, // Must be set to true if using source-maps in production
          }),
        ],
    }
}