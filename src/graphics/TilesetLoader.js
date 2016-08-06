import Request from '../core/Request';
import Tileset from './Tileset.js';

function TilesetLoader(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Tileset.add(data);
    });
}

export default {
    id: 'tileset',
    load: TilesetLoader
}
