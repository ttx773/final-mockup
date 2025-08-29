const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    return {
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 9000,
        },

        mode: env.mode ?? 'development',

        entry: './index.js', // Убрали слэш в начале

        output: {
            path: path.resolve(__dirname, 'build'), // Используем path.resolve
            filename: './js/bundle.js?v=[contenthash]',
            publicPath: '', // Добавили publicPath для относительных путей
            clean: true
        },

        devtool: "source-map",

        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src/js'),
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }
                },

                {
                    test: /\.hbs$/,
                    loader: "handlebars-loader",
                    options: {
                        helperDirs: path.join(__dirname, "src/helpers"),
                        partialDirs: path.join(__dirname, "src/components")
                    }
                },

                {
                    test: /\.(scss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },

                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext]'
                    }
                },

                {
                    test: /\.(svg|png|jpg|jpeg|webp)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'img/[name].[contenthash][ext]'
                    }
                },
            ],
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.hbs',
                filename: 'index.html',
                templateParameters:{
                    title: "CPS - Сервисный центр",
                    lang: 'ru'
                },
                inject: 'body'

            }),

            new MiniCssExtractPlugin({
                filename: 'style.css?v=[contenthash]',
            }),

            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src/img'),
                        to: path.resolve(__dirname, 'build/img'),
                        noErrorOnMissing: true
                    },
                    {
                        from: path.resolve(__dirname, 'src/assets'),
                        to: path.resolve(__dirname, 'build/assets'),
                        noErrorOnMissing: true
                    }
                ]
            }),
        ],

        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@img': path.resolve(__dirname, 'src/img')
            }
        }
    }
};