var config = {
    entry: {
        game: './src/main'
    },
    devtool: 'cheap-source-map',
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
            }
        ]
    }
};

module.exports = config;