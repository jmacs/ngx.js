import Request from './Request';
import Entity from './Entity.js';

export default function(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        for (var i = 0, l = data.length; i < l; i++) {
            Entity.addPrefab(data[i]);
        }
    });
}