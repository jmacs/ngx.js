require('./Arrays');
var ResourceManager = require('./ResourceManager');
var ProcessManager = require('./ProcessManager');
var SceneManager = require('./SceneManager');

// resources
var PrefabResource = require('./PrefabResource');
var SceneResource = require('./SceneResource');
var ComponentResource = require('./ComponentResource');
var ScriptResource = require('./ScriptResource');
var ConfigResource = require('./ConfigResource');
var CoroutineResource = require('./CoroutineResource');

function initialize() {

    SceneManager.initialize();

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
        new CoroutineResource()
    ]);

    ProcessManager.initialize(
        ResourceManager.getResource('coroutine')
    );
}

module.exports = {
    initialize: initialize
};
