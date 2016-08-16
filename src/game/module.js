var GameClock = require('../core/GameClock');
var ResourceManager = require('../core/ResourceManager');
var EntityManager = require('../core/EntityManager');
var SceneManager = require('../core/SceneManager');
var InputManager = require('../input/InputManager');

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
        modules.push(context(key));
    });
    return modules;
}

bootstrap.globals = function() {
    window.clock = GameClock;
    window.scene = SceneManager;
    window.resources = ResourceManager;
    window.input = InputManager;
    window.entity = EntityManager;
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
    var req = require.context('./coroutines/', true, /^(.*\.(js$))[^.]*$/igm);
    req.keys().forEach(function(key){
        req(key);
    });
};

GameClock.addEventListener('GameClockLoaded', function() {
    Object.keys(bootstrap).forEach(function(key) {
        bootstrap[key]();
    });
});

GameClock.addEventListener('GameClockStarted', function() {
    ResourceManager.download(GlobalAssets).then(function() {
        return SceneManager.activateScene('world');
    }).then(function() {
        SceneManager.triggerEvent('LoadMap', {
            map: 'assets/maps/sandbox.json'
        });
    });
});
