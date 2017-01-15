const ResourceManager = require('./ResourceManager');
const SceneManager = require('./SceneManager');
const InputManager = require('./InputManager');

const START_SCENE = '/assets/scenes/world.json';

var bootstrap = Object.create(null);

module.exports = function TempModule(runtime) {
    runtime.addEventListener('RuntimeStart', onRuntimeStart);

    InputManager.enableDevice('keyboard');

    // globals
    window.runtime = runtime;
    window.resources = ResourceManager;
    window.scene = SceneManager;

    // dynamically load all resources
    Object.keys(bootstrap).forEach(function(key) {
        bootstrap[key](ResourceManager);
    });
};

function onRuntimeStart() {
    SceneManager.download(START_SCENE).then(function (scene) {
        SceneManager.load(scene);
    });
}

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
