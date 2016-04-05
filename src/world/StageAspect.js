import Aspect from '../core/Aspect';
import Stage from './Stage';
import SpriteBuffer from '../graphics/SpriteBuffer';
import Viewport from '../graphics/Viewport';

const CELL_SHIFT = 4;   // 16x16
const GRID_WIDTH = 32;  // 512
const GRID_HEIGHT = 32; // 512

var aspect = Aspect.create('world.stage');

var _spriteBuffer = null;
var _stage = 0;
var _cameraMin = [0,0];
var _cameraMax = [1000, 1000];

aspect.onInitialize = function() {
    Stage.initialize(CELL_SHIFT, GRID_WIDTH, GRID_HEIGHT);
    _spriteBuffer = SpriteBuffer.createBuffer(0);
};

aspect.onStageEnter = function(stage) {
    _stage = stage;
};

aspect.onUpdate = function() {
    if (!_stage) return;

    _spriteBuffer.enable(
        Viewport.getModelViewMatrix(),
        Viewport.getProjectionMatrix()
    );

    Stage.selectCells(_cameraMin, _cameraMax, drawCell);

    _spriteBuffer.flush();
};

function drawCell(cell, cellSize, color) {
    _spriteBuffer.draw(
        cell.position,
        cellSize,
        cellSize,
        cell.layers[0],
        color
    );
}