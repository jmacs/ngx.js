var EntityManager = require('../../core/EntityManager');
var Aspect = require('../../core/Aspect');
var Arrays = require('../../core/Arrays');

const MOVEMENT_SPEED = 1.0;
const ASPECT_ID = 'world.physics';

function onStart() {
    EntityManager.addFilter(ASPECT_ID, filterEntity);
}

function onStop() {
    EntityManager.removeFilter(ASPECT_ID);
}

function filterEntity(entity) {
    return entity.input;
}

// todo: implement realish physics
function onUpdate() {
    var entities = EntityManager.getCache(ASPECT_ID);
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

module.exports =  Aspect.create({
    id: ASPECT_ID,
    onUpdate: onUpdate,
    onStart: onStart,
    onStop: onStop
});
