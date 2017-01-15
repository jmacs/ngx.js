var Resource = require('./../resources/Resource');

class CoroutineResource extends Resource {

    getResourceType() {
        return 'coroutine';
    }

    register(modules) {
        for (var i = 0, l = modules.length; i < l; i++) {
            var module = modules[i];
            if (isCoroutineValid(module)) {
                this.set(module.name, module);
            }

        }
    }
}

function isCoroutineValid(module) {
    if (!module.name || module.name.length === 0) {
        console.warn('Coroutine does not define a name');
        return false;
    }
    if (!(module.main instanceof Function)) {
        console.warn('Coroutine "%s" must define a main() function', module.name);
        return false;
    }
    return true;
}

module.exports = CoroutineResource;