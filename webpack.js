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
            },
            {
                test: /\.js$/,
                exclude: /node_modules\//,
                loader: 'babel-loader',
                query: {
                    plugins: ['babel-plugin-transform-es2015-modules-commonjs']
                }
            }
        ]
    }
};

module.exports = config;