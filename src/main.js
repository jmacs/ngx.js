var GameClock = require('./core/GameClock');
var CoreModule = require('./core/CoreModule');
var GraphicsModule = require('./graphics/GraphicsModule');
var InputModule = require('./input/InputModule');
var WorldModule = require('./world/WorldModule');
var GameModule = require('./game/GameModule');

document.addEventListener('DOMContentLoaded', function() {
    console.info('DOMContentLoaded');
    GameClock.start();
});

GameClock.addEventListener('GameClockLoaded', function() {
    CoreModule.initialize();
    GraphicsModule.initialize();
    InputModule.initialize();
    WorldModule.initialize();
    GameModule.initialize();
});
