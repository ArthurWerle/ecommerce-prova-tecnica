const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const PUBLIC_DIR = 'front-end/categoria-owme-es6-sass'

module.exports = {
    devServer: {

        contentBase: path.join(__dirname, PUBLIC_DIR),
        port: 3030

    },
    entry: path.resolve(__dirname, 'main.js'),
    mode: 'development',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        '@babel/preset-env'
                    ]
                },
                test: /\.js$/
            },
            {
                exclude: /node_modules/,
                test: /\.scss$/,
                use: [
                    'style-loader' ,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                exclude: /node_modules/,
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    output: {

        filename:  '[name] - [hash].js',
        path: path.resolve(__dirname, 'dist')

    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve( __dirname, 'front-end/categoria-owme-es6-sass/index.html')
        })
    ],
    target: 'web'
}