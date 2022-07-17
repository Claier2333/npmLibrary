const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "./dist"),
        library: {
            name: "_",
            type: "umd"
        }
    },
    externals: [nodeExternals()],
    devtool: 'source-map'
};