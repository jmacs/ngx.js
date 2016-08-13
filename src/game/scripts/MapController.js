var MapManager = require('../../world/maps/MapManager');

module.exports = function(scene) {

    scene.addEventListener('SceneStart', function() {
        console.log('MapController SceneStart');
    });

    scene.addEventListener('LoadMap', function(e) {
        MapManager.loadMap(e.map);
    });

};
