var Resource = require('./Resource');

class AspectResource extends Resource {

    getResourceType() {
        return 'aspect';
    }

    register(modules) {
        for (var i = 0, l = modules.length; i < l; i++) {
            var module = modules[i];
            this.set(module.id, module);
        }
    }
}

module.exports = AspectResource;