const ResourceManager = require('./ResourceManager');
const Deferred = require('../Deferred');

const ScriptResource = require('./ScriptResource');
const JsonResource = require('./JsonResource');

module.exports = function (runtime) {
    runtime.onSceneLoad(loadResources);

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

};

function loadResources(runtime, scene) {

    if (!scene.assets) {
        console.warn('No assets defined in scene');
        return null;
    }

    console.debug('Downloading scene assets');
    var dfd = new Deferred();

    ResourceManager.download(scene.assets).then(function () {
        console.debug('Scene assets loaded');
        dfd.resolve();
    });

    return dfd.promise;
}
