var Resource = require('./Resource');

const GLOBALS = {
    GameClock: require('./GameClock'),
    SceneManager: require('./SceneManager'),
    ResourceManager: require('./ResourceManager'),
    EntityManager: require('./EntityManager')
};

class ScriptResource extends Resource {

    getMediaType() {
        return 'text/plain';
    }

    getResourceType() {
        return 'script';
    }

    onAssetDownloaded(payload, asset) {
        var self = this;
        var scriptFunction = new Function('global', 'exports', payload);
        scriptFunction(GLOBALS, function(object) {
            self.set(asset, object);
        });
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

ScriptResource.applyInterface = function(object, functionNames, operation) {
    for (var i = 0, l = functionNames.length; i < l; i++) {
        var functionName = functionNames[i];
        if (!(object[functionName] instanceof Function)) {
            object[functionName] = operation;
        }
    }
};

module.exports = ScriptResource;