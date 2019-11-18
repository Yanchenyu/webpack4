const config = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ...config,
    entry: {
        'common/home': './src/common/home'
    },
    module: {
        rules: [
            ...config.module.rules,
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: 'style-loader'
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
        ...config.plugins,
    ],
    devServer: {
        hot: true,
        port: 9999
    },
}