var Resource = require('./Resource');
var Scene = require('./Scene');

class ConfigResource extends Resource {

    getMediaType() {
        return 'application/json';
    }

    getResourceType() {
        return 'config';
    }

    onAssetDownloaded(data, asset) {
        this.set(asset.name, data);
    }
}

module.exports = ConfigResource;