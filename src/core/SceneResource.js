var Resource = require('./Resource');
var Scene = require('./Scene');

class SceneResource extends Resource {

    getMediaType() {
        return 'application/json';
    }

    getResourceType() {
        return 'scene';
    }

    onAssetDownloaded(data) {
        var scene = Scene.create(data);
        this.set(scene.name, scene);
    }
}

module.exports = SceneResource;