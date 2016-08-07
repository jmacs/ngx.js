var Graphics = require('./Graphics.js');

function ImageLoader(asset) {
    return Graphics.createTexture(asset.tex, asset.url);
}

module.exports = {
    id: 'image',
    load: ImageLoader
}
