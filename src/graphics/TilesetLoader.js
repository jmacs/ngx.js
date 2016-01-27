import Request from '../core/Request';
import Tileset from './Tileset.js';

export default function(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Tileset.add(data);
    });
}
