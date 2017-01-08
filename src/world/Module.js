const GameClock = require('./GameClock');
const Runtime = require('./Runtime');
const InputManager = require('../input/InputManager');
const ResourceManager = require('../core/ResourceManager');

// resources
var MapResource = require('././WorldMapResource');

Runtime.addEventListener('RuntimeReady', function () {

    InputManager.enableDevice('keyboard');

    ResourceManager.registerResources([
        new MapResource()
    ]);

    Object.keys(bootstrap).forEach(function(key) {
        bootstrap[key]();
    });

    // globals
    window.clock = GameClock;
    window.resource = ResourceManager;

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

var bootstrap = Object.create(null);

function requireModules(context) {
    var modules = [];
    context.keys().forEach(function(key){
        var module = context(key);
        if (module) modules.push(module);
    });
    return modules;
}

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
