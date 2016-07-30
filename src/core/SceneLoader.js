import Request from './Request';
import Scene from './Scene';

function SceneLoader(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Scene.registerPrefabs([data]);
    });
}

export default {
    id: 'scene',
    load: SceneLoader
};
