const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    entry: {
        'colllisionball': './src/colllisionball/index.js',
        'dragball': './src/dragball/index.js',
        'gravityball': './src/gravityball/index.js',
        'random': './src/random/index.js',
    }, //打包入口文件,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'src/[name]/[name].[contenthash].js',
    }, //打包出口文件,
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/colllisionball/index.html',
            chunks: ['colllisionball'],
            filename: 'src/colllisionball/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/dragball/index.html',
            chunks: ['dragball'],
            filename: 'src/dragball/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/gravityball/index.html',
            chunks: ['gravityball'],
            filename: 'src/gravityball/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/random/index.html',
            chunks: ['random'],
            filename: 'src/random/index.html'
        }),
    ], //配置插件
    module: {
        rules: [] //配置各种用于源文件编译加载的loader
    },
    devServer: {} //配置开发静态http服务
}