var Graphics = require('./Graphics');
var Resource = require('../core/Resource');

class TextureResource extends Resource {

    getMediaType() {
        return 'image';
    }

    getResourceType() {
        return 'texture';
    }

    clear() {
        var keys = this.keys();
        for (var i = 0, l = keys.length; i < l; i++) {
            var texture = this.__cache[keys[i]];
            Graphics.deleteTexture(texture);
        }
        this.__cache = Object.create(null);
    }

    onAssetDownloaded(image, asset) {
        if (this.__cache[asset.textureId]) return;
        var texture = Graphics.createTexture(image);
        this.set(asset.textureId, texture);
    }
}

module.exports = TextureResource;