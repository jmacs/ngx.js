var Resource = require('./Resource');

class BehaviorResource extends Resource {

    getResourceType() {
        return 'behavior';
    }

    register(modules) {
        for (var i = 0, l = modules.length; i < l; i++) {
            var module = modules[i];
            if (!module.name) {
                throw new Error('Behaviors must have a "name" property');
            }
            this.set(module.name, module);
        }
    }
}

module.exports = BehaviorResource;