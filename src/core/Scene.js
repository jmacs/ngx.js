var ResourceManager = require('./ResourceManager');

class Scene {

    constructor(name) {
        this.name = name;
        this.aspects = [];
        this.scripts = [];
    }

}

function create(sceneData) {
    var aspects = ResourceManager.getResource('aspect');
    var scene = new Scene(sceneData.name);

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
