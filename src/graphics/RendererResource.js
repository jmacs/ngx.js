var Resource = require('../core/Resource');
var Renderer = require('./Renderer');

class RendererResource extends Resource {

    getResourceType() {
        return 'renderer';
    }

    register(modules) {
        for (var i = 0, l = modules.length; i < l; i++) {
            var module = modules[i];
            if (isRendererValid(module)) {
                this.set(module.name, module);
            }

        }
    }
}

function isRendererValid(module) {
    if (!(module.prototype instanceof Renderer)) {
        console.warn('Renderer class must extend "Renderer" %o', module);
        return false;
    }
    return true;
}

module.exports = RendererResource;