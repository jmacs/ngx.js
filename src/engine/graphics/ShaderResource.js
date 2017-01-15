var Graphics = require('./Graphics');
var Shader = require('./Shader');
var Resource = require('../resources/Resource');

class ShaderResource extends Resource {

    getMediaType() {
        return 'x-ngx/shader';
    }

    getResourceType() {
        return 'shader';
    }

    get(id) {
        return this.__cache[id].program;
    }

    clear() {
        var keys = this.keys();
        for (var i = 0, l = keys.length; i < l; i++) {
            Shader.delete(this.__cache[keys[i]]);
        }
        this.__cache = Object.create(null);
    }

    onAssetDownloaded(shaderData, asset) {
        var shader = Shader.create(shaderData);
        this.set(shader.name, shader);
    }

}

module.exports = ShaderResource;
