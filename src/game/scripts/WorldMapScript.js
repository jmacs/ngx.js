var SceneManager = require('../../core/SceneManager');
var ResourceManager = require('../../core/ResourceManager');
var EntityFactory = require('./../../world/maps/EntityFactory');

var _map = null;

function onLoadMap(e) {
    console.info('Loading map "%s"', e.map);

    var map = ResourceManager.get('map', e.map);
    if (map) return populateScene(map);

    ResourceManager.download({
        map: [e.map]
    }).then(function() {
        populateScene(ResourceManager.get('map', e.map));
    });
}

function populateScene(map) {
    attachScripts(map);
    EntityFactory.createEntities(map.entities);
    SceneManager.triggerEvent('MapLoaded', map);
    ResourceManager.getResource('map').current = map;
}

function attachScripts(map) {
    if (!map.scripts) return;
    for (var i = 0, l = map.scripts.length; i < l; i++) {
        SceneManager.attachScript(map.scripts[i])
    }
}

module.exports = {
    name: 'WorldMap',
    LoadMap: onLoadMap
};