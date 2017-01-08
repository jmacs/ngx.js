var SceneManager = require('.././SceneManager');
var ResourceManager = require('../../src/resources/ResourceManager');
var SpriteBuffer = require('../../src/graphics/TileBuffer');
var Viewport = require('../../src/graphics/Viewport');
var Color = require('../../src/graphics/Color');
var EntityFactory = require('./../../src/world/maps/EntityFactory');

const CELL_SIZE = 16;

var _color = new Color();
var _map = null;
var _spriteBuffer = null;
var _cameraMin = [0,0];
var _cameraMax = [1000, 1000];

function onSceneLoad(scene) {
    scene.getCompositor().addLayer(0, drawWorldMapLayer);
    _spriteBuffer = SpriteBuffer.createBuffer(0);
}

function onSceneUnload() {
    _map = null;
    _spriteBuffer = null;
}

function drawWorldMapLayer() {
    if (!_map) return;

    _spriteBuffer.enable(
        Viewport.getModelViewMatrix(),
        Viewport.getProjectionMatrix()
    );

    _map.selectCells(_cameraMin, _cameraMax, drawCell);

    _spriteBuffer.flush();
}

function drawCell(cell) {
    _spriteBuffer.draw(
        cell.position,
        CELL_SIZE,
        CELL_SIZE,
        cell.tile0,
        _color
    );
}

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
    _map = map;
    attachScripts();
    EntityFactory.createEntities(map.entities);
    SceneManager.triggerEvent('MapLoaded', map);
}

function attachScripts() {
    if (!_map.scripts) return;
    for (var i = 0, l = _map.scripts.length; i < l; i++) {
        SceneManager.attachScript(_map.scripts[i])
    }
}

module.exports = {
    name: 'Maps',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    LoadMap: onLoadMap
};
