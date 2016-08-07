var GameClock = require('./GameClock');
var Assets = require('./Assets');
var PrefabLoader = require('./PrefabLoader');
var SceneLoader = require('./SceneLoader');
require('./Arrays');

GameClock.addEventListener('GameClockLoaded', function() {
    Assets.registerLoaders([
        PrefabLoader,
        SceneLoader
    ]);
});
