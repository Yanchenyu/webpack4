'use strict';

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

console.log('NODE_ENV: ', process.env.NODE_ENV);

module.exports = {
    mode: process.env.NODE_ENV,
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        fix: true
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader?cacheDirectory'
                }
            },
            {
                test: /\.(png|jpg|svg|gif|eot|otf|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [],
    resolve: {
        alias: {
            Utils: path.resolve(__dirname, 'src/utils'),
            Styles: path.resolve(__dirname, 'src/style')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
        modules: [
            // 告诉 webpack 解析模块时应该搜索的目录
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}