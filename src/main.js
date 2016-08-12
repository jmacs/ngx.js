var ResourceManager = require('./core/ResourceManager');
var GameClock = require('./core/GameClock');
var Scene = require('./core/Scene');
var InputManager = require('./input/InputManager');
var SceneManager = require('./core/SceneManager');

require('./core/module');
require('./graphics/module');
require('./input/module');
require('./world/module');
require('./scripts/module');

document.addEventListener('DOMContentLoaded', function() {
    console.info('DOMContentLoaded');
    GameClock.start();
});

GameClock.addEventListener('GameClockStarted', function() {
    console.info('GameClockStarted');
    window.clock = GameClock;
    window.resources = ResourceManager;
    InputManager.enableDevice('keyboard');
    ResourceManager.loadManifest('assets/manifest.json').then(function() {
        return ResourceManager.downloadTypeOf(['shader', 'script', 'scene', 'config']);
    }).then(function() {
        SceneManager.activateScene('sandbox');
    });
});
