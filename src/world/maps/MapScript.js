var SceneManager = require('../../core/SceneManager');
var ResourceManager = require('../../core/ResourceManager');
var SpriteBuffer = require('../../graphics/SpriteBuffer');
var Viewport = require('../../graphics/Viewport');
var Color = require('../../graphics/Color');
var EntityFactory = require('./EntityFactory');

const CELL_SIZE = 16;

var _color = new Color();
var _map = null;
var _spriteBuffer = null;
var _cameraMin = [0,0];
var _cameraMax = [1000, 1000];

function onSceneLoad() {
    _spriteBuffer = SpriteBuffer.createBuffer(0);
}

function onSceneUnload() {
    _map = null;
    _spriteBuffer = null;
}

function onSceneDraw() {
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
    downloadMap(e.map, function(map) {
        _map = map;
        EntityFactory.createEntities(map.entities);
        SceneManager.triggerEvent('MapLoaded', map);
    });
}

function downloadMap(mapUrl, callback) {
    var map = ResourceManager.get('map', mapUrl);
    if (map) return callback(map);
    ResourceManager.download({
        map: [mapUrl]
    }).then(function() {
        callback(ResourceManager.get('map', mapUrl));
    });
}

module.exports = function Maps(scene) {
    scene.addEventListener('SceneLoad', onSceneLoad);
    scene.addEventListener('SceneStop', onSceneUnload);
    scene.addEventListener('SceneDraw', onSceneDraw);
    scene.addEventListener('LoadMap', onLoadMap);
};
