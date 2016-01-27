import Aspect from '../../core/Aspect.js';
import Arrays from '../../core/Arrays.js';

const MOVEMENT_SPEED = 1.0;

var aspect = Aspect.create('world.physics');
var entities = [];

// todo: implement realish physics
aspect.onUpdate = function() {
    for (var i = 0, len = entities.length; i < len; i++) {
        tick(entities[i]);
    }
};

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

aspect.onStageExit = function() {
    entities.length = 0;
};

aspect.onEntityEnter = function(entity) {
    if (entity.input) {
        entities[entities.length] = entity;
    }
};

aspect.onEntityExit = function(entity) {
    Arrays.removeValue(entities, entity);
};