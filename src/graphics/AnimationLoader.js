import Request from '../core/Request';
import Animation from './Animation.js';

function AnimationLoader(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Animation.add(data);
    });
}

export default {
    id: 'animation',
    load: AnimationLoader
}
