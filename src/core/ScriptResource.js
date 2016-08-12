var Resource = require('./Resource');
var Scene = require('./Scene');

class ScriptResource extends Resource {

    getMediaType() {
        return 'application/javascript';
    }

    getResourceType() {
        return 'script';
    }

    onAssetDownloaded(data) {
        console.warn('NOT IMPLEMENTED: ScriptResource.onAssetDownloaded()');
    }

    register(modules) {
        for (var i = 0, l = modules.length; i < l; i++) {
            var module = modules[i];
            this.set(module.id, module);
        }
    }
}

module.exports = ScriptResource;