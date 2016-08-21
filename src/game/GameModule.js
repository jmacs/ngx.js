var GameClock = require('../core/GameClock');
var ResourceManager = require('../core/ResourceManager');
var EntityManager = require('../core/EntityManager');
var SceneManager = require('../core/SceneManager');
var InputManager = require('../input/InputManager');
var ProcessManager = require('../core/ProcessManager');
var GuiManager = require('../gui/GuiManager');

var GlobalAssets = {
    config: [
        'assets/config/settings.json',
        'assets/config/textures.json'
    ],
    scene: [
        'assets/scenes/world.json'
    ]
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

bootstrap.globals = function() {
    window.clock = GameClock;
    window.scene = SceneManager;
    window.resource = ResourceManager;
    window.input = InputManager;
    window.entity = EntityManager;
    window.process = ProcessManager;
    window.gui = GuiManager;
};

bootstrap.input = function() {
    InputManager.enableDevice('keyboard');
};

bootstrap.components = function() {
    var context = require.context('./components', true, /^(.*\.(js$))[^.]*$/igm);
    var modules = requireModules(context);
    ResourceManager.getResource('component').register(modules);
};

bootstrap.scripts = function() {
    var context = require.context('./scripts', true, /^(.*\.(js$))[^.]*$/igm);
    var modules = requireModules(context);
    ResourceManager.getResource('script').register(modules);
};

bootstrap.coroutines = function() {
    var context = require.context('./coroutines', true, /^(.*\.(js$))[^.]*$/igm);
    var modules = requireModules(context);
    ResourceManager.getResource('coroutine').register(modules);
};

bootstrap.controls = function() {
    var context = require.context('./controls', true, /^(.*\.(js$))[^.]*$/igm);
    var modules = requireModules(context);
    ResourceManager.getResource('control').register(modules);
};

GameClock.addEventListener('GameClockStarted', function() {
    ResourceManager.download(GlobalAssets).then(function() {
        return SceneManager.activateScene('world');
    }).then(function() {
        SceneManager.triggerEvent('LoadMap', {
            map: 'assets/maps/sandbox.json'
        });
    });
});

function initialize() {
    Object.keys(bootstrap).forEach(function(key) {
        bootstrap[key]();
    });
}

module.exports = {
    initialize: initialize
};
