import Request from '../core/Request';
import Animation from './Animation.js';

export default function(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Animation.add(data);
    });
}