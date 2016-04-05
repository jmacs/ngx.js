import Request from '../core/Request';
import Walls from './Walls.js';

export default function(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Walls.add(data);
    });
}
