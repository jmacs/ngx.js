

module.exports = function () {

    const ResourceManager = require('./ResourceManager');
    const SceneManager = require('./SceneManager');

    const FunctionResource = require('./resources/ScriptResource');
    const JsonResource = require('./resources/JsonResource');

    ResourceManager.registerMediaLoaders([
        require('./loaders/TextLoader'),
        require('./loaders/JsonLoader'),
        require('./loaders/ImageLoader'),
        require('./loaders/XmlLoader')
    ]);

    ResourceManager.registerResources([
        new FunctionResource(),
        new JsonResource()
    ]);

    SceneManager.registerProcessors([
        require('./sceneProcessors/ResourceSceneProcessor'),
        require('./sceneProcessors/ScriptSceneProcessor')
    ]);

};