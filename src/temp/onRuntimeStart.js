const SceneManager = require('../core/SceneManager');
const ResourceManager = require('../core/ResourceManager');

var GlobalAssets = {
    config: [
        'assets/config/settings.json',
        'assets/config/textures.json'
    ]
};

module.exports = function onRuntimeStart() {
    ResourceManager.download(GlobalAssets).then(function() {
        SceneManager.download('/assets/scenes/world.json').then(function (scene) {
            SceneManager.load(scene);
        });
    });
};