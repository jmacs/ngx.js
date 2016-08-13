var ResourceManager = require('../core/ResourceManager');
var Graphics = require('./Graphics');
var Resource = require('../core/Resource');

function getTextureConfig(url) {
    var textures = ResourceManager.get('config', 'textures.json');

    if (!textures) {
        throw new Error('Cannot create texture: textures.json config resource is missing');
    }

    if (!textures[url]) {
        throw new Error('Cannot create texture: textures.json does not define ' + url);
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