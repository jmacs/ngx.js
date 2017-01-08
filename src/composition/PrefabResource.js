var Prefab = require('./Prefab');
var Resource = require('./../core/Resource');

class PrefabResource extends Resource {

    getMediaType() {
        return 'application/json';
    }

    getResourceType() {
        return 'prefab';
    }

    onAssetDownloaded(payload) {
        for (var i = 0, l = payload.length; i < l; i++) {
            var data = payload[i];
            if (!data.name) {
                console.warn('Prefab must have a name \n%s', JSON.stringify(data));
                continue;
            }
            var prefab = new Prefab(data);
            this.set(prefab.name, prefab);
        }
    }

}

module.exports = PrefabResource;