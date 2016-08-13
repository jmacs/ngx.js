var Aspect = require('../../core/Aspect');
var SceneManager = require('../../core/SceneManager');
var SpriteBuffer = require('../../graphics/SpriteBuffer');
var Viewport = require('../../graphics/Viewport');
var Color = require('../../graphics/Color');

const ASPECT_ID = 'world.map';
const CELL_SIZE = 16;

var _color = new Color();
var _map = null;
var _spriteBuffer = null;
var _cameraMin = [0,0];
var _cameraMax = [1000, 1000];

function onStart() {
    _spriteBuffer = SpriteBuffer.createBuffer(0);
    SceneManager.addEventListener('MapLoaded', function(map) {
        _map = map;
    });
}

function onStop() {
    _map = null;
    _spriteBuffer = null;
}

function onDraw() {
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

module.exports = Aspect.create({
    id: ASPECT_ID,
    onStart: onStart,
    onStop: onStop,
    onDraw: onDraw
});
