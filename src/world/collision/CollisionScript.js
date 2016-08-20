var EntityManager = require('../../core/EntityManager');
var SpatialIndex = require('./SpatialIndex');

const FILTER = 'world.collision';

const GRID_SHIFT = 6;   // 64x64
const GRID_WIDTH = 8;   // 512
const GRID_HEIGHT = 8;  // 512

function onSceneLoad() {
    SpatialIndex.build(GRID_SHIFT, GRID_WIDTH, GRID_HEIGHT);
    EntityManager.addFilter(FILTER, filterEntity);
}

function onSceneUnload() {
    EntityManager.removeFilter(FILTER);
}

function filterEntity(entity) {
    return entity.components.box;
}

function onSceneUpdate() {
    SpatialIndex.clearObjects();
    EntityManager.forEach(FILTER, insertSpatialIndex);
    SpatialIndex.broadphase();
}

function insertSpatialIndex(entity) {
    var box = entity.components.box;
    SpatialIndex.insertObject(box.sync());
}

module.exports = {
    name: 'Collisions',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    SceneUpdate: onSceneUpdate
};
