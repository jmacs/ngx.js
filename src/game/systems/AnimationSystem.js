import System from '../../core/System.js';
import Time from '../../core/Time.js';
import Arrays from '../../core/Arrays.js';
import Entity from '../../core/Entity.js';

const SYSTEM_ID = 'animation';

var context = 0;
var entities = [];

function update() {
    var delta = Time.delta;

    for (var i = 0, len = entities.length; i < len; i++) {
        var entity = entities[i];
        var sprite = entity.sprite;
        var state = entity.animation;
        tick(state, sprite, delta);
    }
}

function tick(state, sprite, delta) {
    if(state.length <= 1) return;

    var index = state.index;
    var time = state.time + delta;
    var frame = state.frames[index];

    if(time >= frame.time) {
        index++;
        if(index >= state.length) {
            index = 0;
        }
        time = 0.0;
        frame = state.frames[index];

        state.index = index;
        sprite.tileId = frame.tileId;
    }

    state.time = time;
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

function onComponentAttach(entity) {
    if(entity.context !== context) return;
    if(entity.animation && entity.sprite) {
        entities[entities.length] = entity;
    }
}

function onComponentDetach(entity) {
    Arrays.removeValue(entities, entity);
}

System.registerSystem(SYSTEM_ID, update, 10);

System.onTransition(NGX.CX_VOID, onVoidTransition);
System.onTransition(NGX.CX_WORLD, onWorldTransition);

Entity.linkEvents('sprite', onComponentAttach, onComponentDetach);
Entity.linkEvents('animation', onComponentAttach, onComponentDetach);