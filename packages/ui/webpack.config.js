const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const proxy = require('./src/setupProxy');

const getPath = dir => path.resolve(__dirname, dir);

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: argv.mode || 'production',
        entry: getPath('src/index.tsx'),
        output: {
            path: getPath('build'),
            filename: isProduction
                ? 'static/js/[name].[contenthash:8].js'
                : 'static/js/bundle.js',
            chunkFilename: isProduction
                ? 'static/js/[name].[contenthash:8].chunk.js'
                : 'static/js/[name].chunk.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
            modules: ['node_modules', './src'],
            alias: {
                '@api': path.resolve(__dirname, '../api/src'),
            },
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebPackPlugin({
                inject: true,
                template: getPath('public/index.html'),
            }),
            !isProduction && new ReactRefreshWebpackPlugin(),
            isProduction &&
                new MiniCssExtractPlugin({
                    filename: 'static/css/[name].[contenthash:8].css',
                    chunkFilename:
                        'static/css/[name].[contenthash:8].chunk.css',
                }),
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /.scss$/,
                    use: [
                        isProduction
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    // https://babeljs.io/docs/en/config-files#monorepos
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    include: [path.resolve('src'), path.resolve('../api')],
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: { envName: argv.mode },
                },
            ],
        },
        devServer: {
            port: 3000,
            overlay: true,
            contentBase: './public',
            disableHostCheck: true,
            noInfo: true,
            clientLogLevel: 'error',
            before: proxy,
        },
    };
};
