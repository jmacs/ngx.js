import Graphics from './Graphics.js';

function ImageLoader(asset) {
    return Graphics.createTexture(asset.tex, asset.url);
}

export default {
    id: 'image',
    load: ImageLoader
}
