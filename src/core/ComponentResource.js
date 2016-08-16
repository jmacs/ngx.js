var Resource = require('./Resource');

class ComponentResource extends Resource {

    getResourceType() {
        return 'component';
    }

    register(modules) {
        for (var i = 0, l = modules.length; i < l; i++) {
            var module = modules[i];
            if (isComponentValid(module)) {
                this.set(module.id, module);
            }

        }
    }
}

function isComponentValid(module) {
    var name = module.id || '';
    if (name.length === 0) {
        console.warn('Component "%s" does not define a static id', module.name);
        return false;
    }
    return true;
}

module.exports = ComponentResource;