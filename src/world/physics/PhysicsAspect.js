var EntityManager = require('../../core/EntityManager');

const MOVEMENT_SPEED = 1.0;
const FILTER = 'world.physics';

function onSceneLoad() {
    EntityManager.addFilter(FILTER, filterEntity);
}

function onSceneUnload() {
    EntityManager.removeFilter(FILTER);
}

function filterEntity(entity) {
    return entity.input;
}

// todo: implement realish physics
function onSceneUpdate() {
    var entities = EntityManager.getCache(FILTER);
    for (var i = 0, len = entities.length; i < len; i++) {
        tick(entities[i]);
    }
}

function tick(entity) {
    var input = entity.input;
    var position = entity.position;

    if (input.up) {
        position[1] += MOVEMENT_SPEED;
    }

    if (input.down) {
        position[1] -= MOVEMENT_SPEED;
    }

    if (input.left) {
        position[0] -= MOVEMENT_SPEED;
    }

    if (input.right) {
        position[0] += MOVEMENT_SPEED;
    }
}

module.exports = function Physics(scene) {
    scene.addEventListener('SceneLoad', onSceneLoad);
    scene.addEventListener('SceneStop', onSceneUnload);
    scene.addEventListener('SceneUpdate', onSceneUpdate);
};
