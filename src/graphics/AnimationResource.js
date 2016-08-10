var Animation = require('./Animation');
var Resource = require('../core/Resource');

class AnimationResource extends Resource {

    getMediaType() {
        return 'application/json';
    }

    getResourceType() {
        return 'animation';
    }

    onAssetDownloaded(payload, asset) {
        for (var i = 0, l = payload.length; i < l; i++) {
            var data = payload[i];
            this.set(data.id, new Animation(data.id, data.frames));
        }
    }

}

module.exports = AnimationResource;