var Prefab = require('./Prefab');
var Resource = require('./Resource');

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
            var prefab = new Prefab(data);
            this.set(prefab.id, prefab);
        }
    }

    getPrefabType(prefabId) {
        var prefab = this.__cache[prefabId];
        return prefab ? prefab.type : 0;
    }
}

module.exports = PrefabResource;