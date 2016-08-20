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
    return entity.components.input;
}

// todo: implement realish physics
function onSceneUpdate(delta) {
    EntityManager.forEach(FILTER, updatePhysics, delta);
}

function updatePhysics(entity, delta) {
    var input = entity.components.input;
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

module.exports = {
    name: 'Physics',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    SceneUpdate: onSceneUpdate
};
