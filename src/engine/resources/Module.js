const ResourceManager = require('./ResourceManager');

const ScriptResource = require('./ScriptResource');
const JsonResource = require('./JsonResource');

module.exports = function (runtime) {

    ResourceManager.registerMediaLoaders([
        require('./TextLoader'),
        require('./JsonLoader'),
        require('./ImageLoader'),
        require('./XmlLoader')
    ]);

    ResourceManager.registerResources([
        new ScriptResource(),
        new JsonResource()
    ]);

    runtime.registerSceneLoaders([
        require('./ResourceSceneLoader')
    ]);

};