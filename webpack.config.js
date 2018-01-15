
const path = require('path');

module.exports = {
    context: __dirname,
    entry: "./index.js",
    target: "node",
    node: {
        __filename: false,
        __dirname: false
    },
    output: {
        path: __dirname,
        filename: 'build/bundle.js',
        library: 'library',
        libraryTarget: 'umd'
    },
    resolveLoader: {
        modules: ['node_modules'],
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ["env", "stage-3", "es2017"],
                    plugins: ["transform-object-rest-spread", "transform-export-extensions"]
                }
            },

        ]
    },
};