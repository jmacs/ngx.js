var Runtime = require('../Runtime');
var Graphics = require('./Graphics');
var Resource = require('../resources/Resource');

function getTextureConfig(url) {
    var textures = Runtime.properties().textures;

    if (!textures) {
        throw new Error('Cannot create texture: textures runtime property is missing');
    }

    if (!textures[url]) {
        throw new Error('Cannot create texture: textures runtime property does not define ' + url);
    }

    return textures[url];
}

class TextureResource extends Resource {

    getMediaType() {
        return 'image';
    }

    getResourceType() {
        return 'texture';
    }

    get(id) {
        var item = this.__cache[id];
        return item ? item.texture : null;
    }

    clear() {
        var keys = this.keys();
        for (var i = 0, l = keys.length; i < l; i++) {
            var texture = this.__cache[keys[i]].texture;
            Graphics.deleteTexture(texture);
        }
        this.__cache = Object.create(null);
    }

    onAssetDownloaded(image, asset) {
        var textureConfig = getTextureConfig(asset);
        if (this.__cache[textureConfig.id]) return;
        var texture = Graphics.createTexture(image);
        this.set(textureConfig.id, {
            id: textureConfig.id,
            url: asset,
            texture: texture
        });
    }
}

module.exports = TextureResource;