var Prefab = require('./Prefab');

function addResource(payload, cache) {
    for (var i = 0, l = payload.length; i < l; i++) {
        var data = payload[i];
        var prefab = new Prefab(data);
        if (!cache[prefab.id]) {
            cache[prefab.id] = prefab;
        } else {
            console.warn('prefab "%s:%s" is already defined', prefab.id, prefab.name);
        }
    }
}

module.exports = {
    name: 'prefabs',
    fileType: 'prefab',
    addResource: addResource
}