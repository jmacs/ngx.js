var Resource = require('./Resource');

class SceneResource extends Resource {

    getMediaType() {
        return 'json';
    }

    getResourceType() {
        return 'scene';
    }

    onAssetDownloaded(data) {
        this.set(data.id, data);
    }
}

module.exports = SceneResource;