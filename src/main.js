var ResourceManager = require('./core/ResourceManager');
var Graphics = require('./graphics/Graphics');
var GameClock = require('./core/GameClock');
var Scene = require('./core/Scene');
//var Stage = require('./world/Stage');
var InputManager = require('./input/InputManager');

require('./core/module');
require('./graphics/module');
require('./input/module');
//require('./world/module');
//require('./game/module');

document.addEventListener('DOMContentLoaded', function() {
    console.info('DOMContentLoaded');
    GameClock.start();
});

Graphics.addEventListener('ContextCreated', function() {
    console.info('ContextCreated');
});

Graphics.addEventListener('GraphicsError', function(e) {
    console.error(e.message);
});

GameClock.addEventListener('GameClockStarted', function() {
    console.info('GameClockStarted');
    window.clock = GameClock;
    window.resources = ResourceManager;
    InputManager.enableDevice('keyboard');
    ResourceManager.loadManifest('assets/manifest.json').then(function() {
        ResourceManager.downloadAll();
    });
    /*.then(function() {
        return Assets.downloadAll();
    }).then(function() {
        Scene.create('main', 'sandbox');
        Scene.activate('main');
    }).then(function() {
        return Stage.request('assets/maps/test.json');
    }).then(function() {
        Stage.start(1234);
    });*/
});
