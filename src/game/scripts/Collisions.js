var EntityManager = require('../../core/EntityManager');
var SpatialIndex = require('./../../world/collision/SpatialIndex');

const GRID_SHIFT = 6;   // 64x64
const GRID_WIDTH = 8;   // 512
const GRID_HEIGHT = 8;  // 512
var filter = null;

function onSceneLoad() {
    SpatialIndex.build(GRID_SHIFT, GRID_WIDTH, GRID_HEIGHT);
    filter = EntityManager.createFilter('world.collision', function(entity) {
        return entity.components.box;
    });
}

function onSceneUnload() {
    filter = null;
}

function onSceneUpdate() {
    SpatialIndex.clearObjects();
    filter.each(insertSpatialIndex);
    SpatialIndex.broadphase();
}

function insertSpatialIndex(entity) {
    var box = entity.components.box;
    SpatialIndex.insertObject(box.sync());
}

module.exports = {
    name: 'Collisions',
    SceneLoad: onSceneLoad,
    SceneUnload: onSceneUnload,
    SceneUpdate: onSceneUpdate
};
