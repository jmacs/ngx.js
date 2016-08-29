var GlyphMap = require('./GlyphMap');
var Resource = require('../core/Resource');

class GlyphResource extends Resource {

    getMediaType() {
        return 'application/json';
    }

    getResourceType() {
        return 'glyphmap';
    }

    onAssetDownloaded(payload, asset) {
        var map = new GlyphMap(payload);
        this.set(map.id, map);
    }

}

module.exports = GlyphResource;