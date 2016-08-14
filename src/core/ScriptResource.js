var Resource = require('./Resource');
var Scene = require('./Scene');

class ScriptResource extends Resource {

    getMediaType() {
        return 'text/plain';
    }

    getResourceType() {
        return 'script';
    }

    onAssetDownloaded(payload, asset) {
        var scriptFunction = new Function('scene', 'options', payload);
        this.set(asset.url, scriptFunction);
    }

    register(modules) {
        for (var i = 0, l = modules.length; i < l; i++) {
            var module = modules[i];
            if (!module.name || !module.name.length) {
                throw new Error('Unidentifiable script module! Script function must have a name \n' + module.toString());
            }
            this.set(module.name, module);
        }
    }
}

module.exports = ScriptResource;