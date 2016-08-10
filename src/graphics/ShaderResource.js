var Graphics = require('./Graphics');
var Resource = require('../core/Resource');

class ShaderResource extends Resource {

    getMediaType() {
        return 'x/shader';
    }

    getResourceType() {
        return 'shader';
    }

    clear() {
        var keys = this.keys();
        for (var i = 0, l = keys.length; i < l; i++) {
            var shader = this.__cache[keys[i]];
            Graphics.deleteShader(shader);
        }
        this.__cache = Object.create(null);
    }

    onAssetDownloaded(shaderSource, asset) {
        if (this.__cache[asset.shaderId]) return;
        var shader = Graphics.createShader(shaderSource, asset.vertex);
        this.set(asset.shaderId, shader);
    }

}

module.exports = ShaderResource;