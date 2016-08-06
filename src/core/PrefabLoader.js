import Request from './Request';
import Entity from './Entity.js';

function PrefabLoader(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Entity.registerPrefabs(data);
    });
}

export default {
    id: 'prefab',
    load: PrefabLoader
};
