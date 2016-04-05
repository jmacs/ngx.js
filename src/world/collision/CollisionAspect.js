import Aspect from '../../core/Aspect';
import Stage from '../Stage';
import SpatialIndex from './SpatialIndex';
import Arrays from '../../core/Arrays.js';
import Viewport from '../../graphics/Viewport.js';
import LineBuilder from '../../graphics/LineBuilder.js';
import LineBuffer from '../../graphics/LineBuffer.js';

const WALL_SHIFT = 4;   // 16x16
const GRID_SHIFT = 6;   // 64x64
const GRID_WIDTH = 8;   // 512
const GRID_HEIGHT = 8;  // 512

var entities = [];
var lineBuffer;
var debugGrid;

var modelView = Viewport.getModelViewMatrix;
var projection = Viewport.getProjectionMatrix;

var aspect = Aspect.create('world.collision');

aspect.onInitialize = function() {
    SpatialIndex.build(GRID_SHIFT, GRID_WIDTH, GRID_HEIGHT, WALL_SHIFT);
};

aspect.onUpdate = function() {
    SpatialIndex.clearObjects();
    for (var i = 0, len = entities.length; i < len; i++) {
        var entity = entities[i];
        SpatialIndex.insertObject(entity.box.sync());
    }
    SpatialIndex.broadphase();
};

aspect.onStageEnter = function() {
    entities.length = 0;
    Stage.selectSolidCells(function(cell) {
        SpatialIndex.insertWall(cell.x, cell.y);
    });
};

aspect.onStageExit = function() {
    entities.length = 0;
    SpatialIndex.clearWalls();
};

aspect.onEntityEnter = function(entity) {
    if (entity.box) {
        entities[entities.length] = entity;
    }
};

aspect.onEntityExit = function(entity) {
    if (entity.box) {
        Arrays.removeValue(entities, entity);
    }
};

var debug = Aspect.create('world.collision.debug');

debug.onInitialize = function() {
    lineBuffer = LineBuffer.createBuffer(0);
};

debug.onStageEnter = function() {
    debugGrid = LineBuilder.buildGrid(0, 0,
        Stage.pixelWidth() >> GRID_SHIFT,
        Stage.pixelHeight() >> GRID_SHIFT,
        Math.pow(2, GRID_SHIFT)
    );
};

debug.onUpdate = function() {
    if (debugGrid) {
        lineBuffer.enable(
            modelView(),
            projection()
        );

        lineBuffer.drawLines(debugGrid);

        lineBuffer.flush();
    }
};