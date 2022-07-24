const path = require("path");
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "./dist"),
        library: {
            name: "_",
            type: "umd"
        },
        libraryTarget:'umd',     //支持库的引入方式
        libraryExport:'default'   //默认导出
    },
    externals: [nodeExternals()],
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({    //此插件在webpack4之后，当mode 设置为production时，默认开启压缩
                include: /\.min\.js$/ //匹配min.js结尾的文件进行压缩
            })
        ]
    }
};