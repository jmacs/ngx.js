module.exports = {
    entry: {
        game: './src/game/main'
    },
    devtool: 'cheap-source-map',
    output: {
        path: './dist',
        filename: '[name].bundle.js',
        chunkFileName: '[id].bundle.js'
    }
};
