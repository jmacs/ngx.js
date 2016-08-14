var MapManager = require('../../world/maps/MapManager');

module.exports = function MapController(scene) {

    scene.addEventListener('SceneStart', function() {
        console.debug('MapController SceneStart');
    });

    scene.addEventListener('LoadMap', function(e) {
        console.info('Loading map "%s"', e.map);
        MapManager.loadMap(e.map);
    });

};
