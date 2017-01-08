var EntityManager = require('.././EntityManager');

// todo: fix, this isnt really physics related

const MOVEMENT_SPEED = 1.0;
var filter;

function onSceneLoad() {
    filter = EntityManager.createFilter('world.physics', function (entity) {
        return entity.components.input;
    });
}

function onSceneUnload() {
    filter = null;
}

// todo: implement realish physics
function onSceneUpdate(delta) {
    filter.each(updatePhysics, delta);
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
    SceneUnload: onSceneUnload,
    SceneUpdate: onSceneUpdate
};
