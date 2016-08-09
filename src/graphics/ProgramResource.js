var Graphics = require('./Graphics');
var Resource = require('../core/Resource');

class ShaderResource extends Resource {

    getMediaType() {
        return 'json';
    }

    getResourceType() {
        return 'program';
    }

    clear() {
        var keys = this.keys();
        for (var i = 0, l = keys.length; i < l; i++) {
            var shader = this.__cache[keys[i]];
            Graphics.deleteProgram(shader);
        }
        this.__cache = Object.create(null);
    }

    createProgram(vertexShader, fragmentShader) {
        var program = Graphics.createProgram(vertexShader, fragmentShader);
        this.set(id, program);
    }

}

module.exports = ShaderResource;