require('./Arrays');
var ResourceManager = require('./ResourceManager');
var GameClock = require('./GameClock');

// resources
var PrefabResource = require('./PrefabResource');
var SceneResource = require('./SceneResource');
var ComponentResource = require('./ComponentResource');
var ScriptResource = require('./ScriptResource');
var ConfigResource = require('./ConfigResource');
var BehaviorResource = require('./BehaviorResource');

GameClock.addEventListener('GameClockLoaded', function() {

    ResourceManager.registerMediaLoaders([
        require('./TextLoader'),
        require('./JsonLoader'),
        require('./ImageLoader'),
        require('./XmlLoader')
    ]);

    ResourceManager.registerResources([
        new PrefabResource(),
        new SceneResource(),
        new ComponentResource(),
        new ScriptResource(),
        new ConfigResource(),
        new BehaviorResource()
    ]);

});
