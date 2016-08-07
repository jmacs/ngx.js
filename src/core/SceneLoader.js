var Request = require('./Request');
var Scene = require('./Scene');

function SceneLoader(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Scene.registerPrefabs([data]);
    });
}

module.exports = {
    id: 'scene',
    load: SceneLoader
};
