var Resource = require('./Resource');
var Scene = require('./Scene');

const FILE_NAME_REGEX = /[^\\/]+$/;

class ConfigResource extends Resource {

    getMediaType() {
        return 'application/json';
    }

    getResourceType() {
        return 'config';
    }

    onAssetDownloaded(data, asset) {
        var name = asset.match(FILE_NAME_REGEX)[0];
        this.set(name, data);
    }
}

module.exports = ConfigResource;