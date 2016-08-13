var ResourceManager = require('../../core/ResourceManager');
var SceneManager = require('../../core/SceneManager');
var EntityFactory = require('./EntityFactory');

function getMap(mapUrl, callback) {
    var map = ResourceManager.get('map', mapUrl);
    if (map) return callback(map);
    ResourceManager.download({
        map: [mapUrl]
    }).then(function() {
        callback(ResourceManager.get('map', mapUrl));
    });
}

function loadMap(mapUrl) {
    getMap(mapUrl, startStage);
}

function startStage(map) {
    EntityFactory.createEntities(map.entities);
    SceneManager.triggerEvent('MapLoaded', map);
}

module.exports = {
    loadMap: loadMap
};
