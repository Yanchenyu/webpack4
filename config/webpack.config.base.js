'use strict';

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

console.log('NODE_ENV: ', process.env.NODE_ENV);

module.exports = {
    mode: process.env.NODE_ENV,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        libraryTarget: 'umd'    // 这里不写，导出的组件库将无法调用
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
                    loader: 'babel-loader'
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
            Utils: path.resolve(__dirname, '../src/utils'),
            Styles: path.resolve(__dirname, '../src/style'),
            Dist: path.resolve(__dirname, '../dist')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
        modules: [
            // 告诉 webpack 解析模块时应该搜索的目录
            path.resolve(__dirname, '../src'),
            'node_modules'
        ]
    },
    externals: [ // 排除外部库
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        },
        {
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        }
    ],
}