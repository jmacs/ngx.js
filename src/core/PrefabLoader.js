var Request = require('./Request');
var Entity = require('./Entity.js');

function PrefabLoader(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Entity.registerPrefabs(data);
    });
}

module.exports = {
    id: 'prefab',
    load: PrefabLoader
};
