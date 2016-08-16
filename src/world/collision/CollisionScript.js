var EntityManager = require('../../core/EntityManager');
var SpatialIndex = require('./SpatialIndex');
var Viewport = require('../../graphics/Viewport.js');
var LineBuilder = require('../../graphics/LineBuilder.js');
var LineBuffer = require('../../graphics/LineBuffer.js');

const FILTER = 'world.collision';

const GRID_SHIFT = 6;   // 64x64
const GRID_WIDTH = 8;   // 512
const GRID_HEIGHT = 8;  // 512

var lineBuffer;
var debugGrid;

function onSceneLoad() {
    SpatialIndex.build(GRID_SHIFT, GRID_WIDTH, GRID_HEIGHT);
    lineBuffer = LineBuffer.createBuffer(0);
    EntityManager.addFilter(FILTER, filterEntity);
}

function onSceneUnload() {
    lineBuffer = null;
    debugGrid = null;
    EntityManager.removeFilter(FILTER);
}

function filterEntity(entity) {
    return entity.components.box;
}

function onSceneUpdate() {
    SpatialIndex.clearObjects();
    var entities = EntityManager.getCache(FILTER);
    for (var i = 0, len = entities.length; i < len; i++) {
        var box = entities[i].components.box;
        SpatialIndex.insertObject(box.sync());
    }
    SpatialIndex.broadphase();
}

function onStageEnter() {
    debugGrid = LineBuilder.buildGrid(0, 0,
        Stage.pixelWidth() >> GRID_SHIFT,
        Stage.pixelHeight() >> GRID_SHIFT,
        Math.pow(2, GRID_SHIFT)
    );
}

function onSceneDraw() {
    if (debugGrid) {

        lineBuffer.enable(
            Viewport.getModelViewMatrix(),
            Viewport.getProjectionMatrix()
        );

        lineBuffer.drawLines(debugGrid);

        lineBuffer.flush();
    }
}

module.exports = {
    name: 'Collisions',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    SceneDraw: onSceneDraw,
    SceneUpdate: onSceneUpdate
};
