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
    if (name === 'prefab') {
        console.error('reserved component name "prefab"');
        return false;
    }
    if (name === 'position') {
        console.error('reserved component name "position"');
        return false;
    }
    if (name === 'ref') {
        console.error('reserved component name "ref"');
        return false;
    }
    if (name === 'id') {
        console.error('reserved component name "id"');
        return false;
    }
    if (name.charAt(0) === '_') {
        console.error('component names cannot start with an underscore');
        return false;
    }
    return true;
}

module.exports = ComponentResource;