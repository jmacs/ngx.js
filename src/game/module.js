var GameClock = require('../core/GameClock');
var ResourceManager = require('../core/ResourceManager');
var SceneManager = require('../core/SceneManager');
var MapManager = require('../world/maps/MapManager');
var InputManager = require('../input/InputManager');

var bootstrap = Object.create(null);

bootstrap.globals = function() {
    window.clock = GameClock;
    window.resources = ResourceManager;
    window.map = MapManager;
    window.input = InputManager;
};

bootstrap.input = function() {
    InputManager.enableDevice('keyboard');
};

bootstrap.components = function() {
    var req = require.context('./components', true, /^(.*\.(js$))[^.]*$/igm);
    var modules = [];
    req.keys().forEach(function(key){
        modules.push(req(key));
    });
    ResourceManager.getResource('component').register(modules);
};

bootstrap.colliders = function() {
    var req = require.context('./colliders', true, /^(.*\.(js$))[^.]*$/igm);
    req.keys().forEach(function(key){
        req(key);
    });
};

bootstrap.coroutines = function() {
    var req = require.context('./coroutines/', true, /^(.*\.(js$))[^.]*$/igm);
    req.keys().forEach(function(key){
        req(key);
    });
};

bootstrap.agents = function() {
    var req = require.context('./agents/', true, /^(.*\.(js$))[^.]*$/igm);
    req.keys().forEach(function(key){
        req(key);
    });
};

bootstrap.scene = function() {
    var scripts = ResourceManager.getResource('script');
    var req = require.context('./scripts/', true, /^(.*\.(js$))[^.]*$/igm);
    req.keys().forEach(function(key){
        scripts.set(key, req(key));
    });
};


GameClock.addEventListener('GameClockLoaded', function() {
    Object.keys(bootstrap).forEach(function(key) {
        bootstrap[key]();
    });
});
