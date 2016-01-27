import Aspect from '../../core/Aspect';
import SpatialIndex from './SpatialIndex';
import Arrays from '../../core/Arrays.js';
import Viewport from '../../graphics/Viewport.js';
import LineBuilder from '../../graphics/LineBuilder.js';
import LineBuffer from '../../graphics/LineBuffer.js';

const GRID_SHIFT = 6; // 64x64

var entities = [];
var lineBuffer;
var debugGrid;

var modelView = Viewport.getModelViewMatrix;
var projection = Viewport.getProjectionMatrix;

var aspect = Aspect.create('world.collision');

aspect.onUpdate = function() {
    SpatialIndex.clear();
    for (var i = 0, len = entities.length; i < len; i++) {
        var entity = entities[i];
        SpatialIndex.insert(entity.box.sync());
    }
    SpatialIndex.broadphase();
};

aspect.onStageEnter = function(stage) {
    entities.length = 0;
    var gridWidth = ~~(stage.pixelWidth / GRID_SHIFT) + 1;
    var gridHeight = ~~(stage.pixelHeight / GRID_SHIFT) + 1;
    SpatialIndex.build(GRID_SHIFT, gridWidth, gridHeight);
};

aspect.onStageExit = function() {
    entities.length = 0;
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

debug.onStageEnter = function(stage) {
    debugGrid = LineBuilder.buildGrid(0, 0,
        stage.pixelWidth >> GRID_SHIFT,
        stage.pixelHeight >> GRID_SHIFT,
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