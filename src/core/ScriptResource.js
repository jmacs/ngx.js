var Resource = require('./Resource');
var Scene = require('./Scene');

class ScriptResource extends Resource {

    getMediaType() {
        return 'text/plain';
    }

    getResourceType() {
        return 'script';
    }

    onAssetDownloaded(text, asset) {
        var scriptFunction = new Function('scene', 'options', text);
        this.set(asset.url, scriptFunction);
    }

    register(modules) {
        for (var i = 0, l = modules.length; i < l; i++) {
            var module = modules[i];
            this.set(module.id, module);
        }
    }
}

module.exports = ScriptResource;