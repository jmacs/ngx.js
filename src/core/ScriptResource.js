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
                throw new Error('Unidentifiable script module. Script function must have a name \n' + JSON.stringify(module));
            }
            this.set(module.name, module);
        }
    }

    foreachFunction(scriptName, iterator) {
        var script = this.__cache[scriptName];
        if (!script) {
            console.warn('Unregistered script "%s"', scriptName);
            return;
        }
        var keys = Object.keys(script);
        for (var i = 0, l = keys.length; i < l; i++) {
            var event = keys[i];
            var callback = script[keys[i]];
            if (callback instanceof Function) {
                iterator(event, callback);
            }
        }
    }
}

module.exports = ScriptResource;