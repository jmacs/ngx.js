var Map = require('./Map');
var Resource = require('../../core/Resource');

class MapResource extends Resource {

    getMediaType() {
        return 'application/json';
    }

    getResourceType() {
        return 'map';
    }

    onAssetDownloaded(payload, asset) {
        var map = new Map(payload);
        this.set(map.id, map);
    }

}

module.exports = MapResource;