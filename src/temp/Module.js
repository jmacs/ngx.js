const ResourceManager = require('../core/ResourceManager');
const InputManager = require('../input/InputManager');
const onRuntimeStart = require('./onRuntimeStart');

module.exports = function TempModule(runtime) {
    runtime.addEventListener('RuntimeStart', onRuntimeStart);

    InputManager.enableDevice('keyboard');

    Object.keys(bootstrap).forEach(function(key) {
        bootstrap[key](ResourceManager);
    });

    // globals
    window.runtime = runtime;
    window.resources = ResourceManager;

};

var bootstrap = Object.create(null);

function requireModules(context) {
    var modules = [];
    context.keys().forEach(function(key){
        var module = context(key);
        if (module) modules.push(module);
    });
    return modules;
}

bootstrap.controllers = function(resources) {
    var context = require.context('./controllers', true, /^(.*\.(js$))[^.]*$/igm);
    var modules = requireModules(context);
    resources.getResource('script').register(modules);
};

