import Request from '../core/Request';
import Walls from './Walls.js';

function WallLoader(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Walls.add(data);
    });
}

export default {
    id: 'walls',
    load: WallLoader
}
