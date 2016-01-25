import Events from '../../core/Events.js';
import System from '../../core/System.js';
import Entity from '../../core/Entity.js';
import Arrays from '../../core/Arrays.js';

const SYSTEM_ID = 'movement';
const MOVEMENT_SPEED = 5.0;

var context = 0;
var entities = [];

function update() {
    for (var i = 0, len = entities.length; i < len; i++) {
        process(entities[i]);
    }
}

function process(entity) {
    var input = entity.input;
    var position = entity.position;

    if(input.up) {
        position.xy[1] += MOVEMENT_SPEED;
    }

    if(input.down) {
        position.xy[1] -= MOVEMENT_SPEED;
    }

    if(input.left) {
        position.xy[0] -= MOVEMENT_SPEED;
    }

    if(input.right) {
        position.xy[0] += MOVEMENT_SPEED;
    }
}

function onComponentAttach(entity) {
    if(entity.context !== context) return;
    if(entity.position && entity.input) {
        entities[entities.length] = entity;
    }
}

function onComponentDetach(entity) {
    Arrays.removeValue(entities, entity);
}

function onVoidTransition(cx) {
    System.activateSystem(SYSTEM_ID);
    entities.length = 0;
    context = cx;
}

function onWorldTransition(cx) {
    entities.length = 0;
    context = cx;
    Entity.forEach(onComponentAttach);
}

System.registerSystem(SYSTEM_ID, update, 1);

System.onTransition(NGX.CX_VOID, onVoidTransition);
System.onTransition(NGX.CX_WORLD, onWorldTransition);

Entity.linkEvents('input', onComponentAttach, onComponentDetach);
Entity.linkEvents('position', onComponentAttach, onComponentDetach);