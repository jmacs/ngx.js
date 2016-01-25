var webpack = require('webpack');

var config = {
    entry: {
        game: './src/game/main'
    },
    devtool: 'source-map',
    output: {
        path: './dist',
        filename: '[name].bundle.js',
        chunkFileName: '[id].bundle.js'
    },
    module: {
        loaders: [
            {
                test: [/\.json$/],
                loader: "json-loader"
            },
            {
                test: [/\.txt$/,/\.glsl$/],
                loader: "raw"
            },
            {
                test: /\.js$/,
                exclude: /node_modules\//,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};

module.exports = config;