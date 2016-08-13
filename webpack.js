module.exports = {
    entry: {
        game: './src/main'
    },
    devtool: 'cheap-source-map',
    output: {
        path: './dist',
        filename: '[name].bundle.js',
        chunkFileName: '[id].bundle.js'
    }
};
