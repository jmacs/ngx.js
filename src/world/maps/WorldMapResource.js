var Resource = require('../../core/Resource');
var Map = require('./WorldMap');

class WorldMapResource extends Resource {

    getMediaType() {
        return 'application/json';
    }

    getResourceType() {
        return 'map';
    }

    onAssetDownloaded(payload, asset) {
        var map = Map.create(asset, payload);
        this.set(map.id, map);
    }

}

module.exports = WorldMapResource;