import Graphics from './Graphics.js';

export default function(asset) {
    return Graphics.createTexture(asset.tex, asset.url);
}
