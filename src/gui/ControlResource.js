var Resource = require('../core/Resource');
var Control = require('./Control');

class ControlResource extends Resource {

    getResourceType() {
        return 'control';
    }

    register(modules) {
        for (var i = 0, l = modules.length; i < l; i++) {
            var module = modules[i];
            if (isControlValid(module)) {
                this.set(module.name.toUpperCase(), module);
            }

        }
    }
}

function isControlValid(module) {
    if (!module.name || module.name.length === 0) {
        console.warn('Control module must have a name');
        return false;
    }
    return true;
}

module.exports = ControlResource;