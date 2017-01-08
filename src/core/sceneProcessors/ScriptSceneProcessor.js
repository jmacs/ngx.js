const ResourceManager = require('../ResourceManager');

module.exports = function ScriptSceneProcessor(runtime, scene) {

    if (!scene.scripts) {
        console.warn('No scripts defined in scene');
        return;
    }

    console.debug('Applying scene scripts');
    var scripts = scene.scripts;
    for (var i = 0, l = scripts.length; i < l; i++) {
        var name = scripts[i];
        var script = ResourceManager.get('script', name);
        if (!script) {
            console.warn('Unknown script: %s');
            continue;
        }
        script(runtime);
    }

};
