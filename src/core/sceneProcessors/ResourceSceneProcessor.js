const ResourceManager = require('../ResourceManager');
const Deferred = require('../Deferred');

module.exports = function ResourceSceneProcessor(runtime, scene) {
    var dfd = Deferred.create();

    if (!scene.assets) {
        console.warn('No assets defined in scene');
        dfd.resolve();
        return dfd.promise;
    }

    console.debug('Downloading scene assets');

    ResourceManager.download(scene.assets).then(function () {
        console.debug('Scene assets loaded');
        dfd.resolve();
    });

    return dfd.promise;
};
