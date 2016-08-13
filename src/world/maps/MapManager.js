var ResourceManager = require('../../core/ResourceManager');
var SceneManager = require('../../core/SceneManager');
var EntityFactory = require('./EntityFactory');

function getStage(mapUrl, callback) {
    var map = ResourceManager.get('map', mapUrl);
    if (map) return callback(map);
    ResourceManager.download({
        map: [mapUrl]
    }).then(function() {
        callback(ResourceManager.get('map', mapUrl));
    });
}

function loadStage(mapUrl) {
    getStage(mapUrl, startStage);
}

function startStage(map) {
    EntityFactory.createEntities(map.entities);
    SceneManager.triggerEvent('StageLoad', {foo: 123});
}

module.exports = {
    loadStage: loadStage
};
