require('./Arrays');
var ResourceManager = require('./ResourceManager');
var GameClock = require('./GameClock');
var PrefabResource = require('./PrefabResource');
var SceneResource = require('./SceneResource');

GameClock.addEventListener('GameClockLoaded', function() {

    ResourceManager.registerMediaLoaders([
        require('./TextLoader'),
        require('./JsonLoader'),
        require('./ImageLoader')
    ]);

    ResourceManager.registerResources([
        new PrefabResource(),
        new SceneResource()
    ]);

});
