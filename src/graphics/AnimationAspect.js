import Aspect from '../core/Aspect';
import Arrays from '../core/Arrays';

var aspect = Aspect.create('ngx.animation');

var entities = [];

aspect.onUpdate = function(delta) {
    for (var i = 0, len = entities.length; i < len; i++) {
        var entity = entities[i];
        var sprite = entity.sprite;
        var state = entity.animation;
        tick(state, sprite, delta);
    }
};

function tick(state, sprite, delta) {
    if (state.length <= 1) return;

    var index = state.index;
    var time = state.time + delta;
    var frame = state.frames[index];

    if (time >= frame.time) {
        index++;
        if (index >= state.length) {
            index = 0;
        }
        time = 0.0;
        frame = state.frames[index];

        state.index = index;
        sprite.tid = frame.tid;
    }

    state.time = time;
}

aspect.onStageExit = function() {
    entities.length = 0;
};

aspect.onEntityEnter = function(entity) {
    if (entity.animation && entity.sprite) {
        entities[entities.length] = entity;
    }
};

aspect.onEntityExit = function(entity) {
    Arrays.removeValue(entities, entity);
};
