var ResourceManager = require('./ResourceManager');

class Scene {

    constructor(options) {
        this.name = options.name;
        this.aspects = [];
        this.assets = options.assets || {};
        this.scripts = options.scripts || [];
    }

}

function create(sceneData) {
    var aspects = ResourceManager.getResource('aspect');
    var scene = new Scene(sceneData);

    for (var i = 0, l = sceneData.aspects.length; i < l; i++) {

        var aspectId = sceneData.aspects[i];
        var aspect = aspects.get(aspectId);

        if (!aspect) {
            console.error('unknown aspect "%s" in scene "%s"', aspectId, scene.name);
            continue;
        }

        if (sceneData.scripts) {
            scene.scripts = sceneData.scripts;
        }

        scene.aspects.push(aspect);
    }

    return scene;
}

module.exports = {
    create: create
};
