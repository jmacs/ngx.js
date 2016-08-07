var Aspect = require('../core/Aspect');
var Stage = require('./Stage');
var SpriteBuffer = require('../graphics/SpriteBuffer');
var Viewport = require('../graphics/Viewport');

const ASPECT_ID = 'world.stage';
const CELL_SHIFT = 4;   // 16x16
const GRID_WIDTH = 32;  // 512
const GRID_HEIGHT = 32; // 512

var _spriteBuffer = null;
var _stage = 0;
var _cameraMin = [0,0];
var _cameraMax = [1000, 1000];

function onStart() {
    Stage.initialize(CELL_SHIFT, GRID_WIDTH, GRID_HEIGHT);
    _spriteBuffer = SpriteBuffer.createBuffer(0);
}

function onStageEnter(stage) {
    _stage = stage;
}

function onUpdate() {
    if (!_stage) return;

    _spriteBuffer.enable(
        Viewport.getModelViewMatrix(),
        Viewport.getProjectionMatrix()
    );

    Stage.selectCells(_cameraMin, _cameraMax, drawCell);

    _spriteBuffer.flush();
}

function drawCell(cell, cellSize, color) {
    _spriteBuffer.draw(
        cell.position,
        cellSize,
        cellSize,
        cell.layers[0],
        color
    );
}

module.exports = Aspect.create({
    id: ASPECT_ID,
    onStart: onStart,
    onStageEnter: onStageEnter,
    onUpdate: onUpdate
});
