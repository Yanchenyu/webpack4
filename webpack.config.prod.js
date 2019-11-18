const config = require('./webpack.config.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    ...config,
    entry: {
        'common/appdownload': './src/common/appdownload',
        'common/button': './src/common/button',
        'components/button': './src/components/button',
        'utils/i18n': './src/utils/i18n',
        'utils/tools': './src/utils/tools',
    },
    module: {
        rules: [
            ...config.module.rules,
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
        new CleanWebpackPlugin(),
        ...config.plugins,
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[hash].css"
        }),
    ],
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