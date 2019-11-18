'use strict';

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: process.env.NODE_ENV,
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
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: {
                source: false
            }
        })
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
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}