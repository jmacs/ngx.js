const ResourceManager = require('../ResourceManager');
const Resource = require('../Resource');

class ControllerResource extends Resource {

    getMediaType() {
        return 'text/plain';
    }

    getResourceType() {
        return 'script';
    }

    onAssetDownloaded(payload, asset) {
        this.__cache[asset.url] = new Function('runtime', 'resources', payload);
    }

    register(modules) {
        for (var i = 0, l = modules.length; i < l; i++) {
            var module = modules[i];
            if (!module.name || !module.name.length) {
                console.error('Unidentifiable script module. Module must have a "name" property');
                return;
            }
            this.set(module.name, module);
        }
    }

}

module.exports = ControllerResource;