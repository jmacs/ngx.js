import EntityStore from '../core/EntityStore';
import Aspect from '../core/Aspect';

const ASPECT_ID = 'graphics.animation';

function filterEntity(entity) {
    return entity.sprite && entity.animation;
}

function onStart() {
    EntityStore.addFilter(ASPECT_ID, filterEntity);
}

function onStop() {
    EntityStore.removeFilter(ASPECT_ID);
}

function onDraw(delta) {
    var entities = EntityStore.getCache(ASPECT_ID);
    for (var i = 0, len = entities.length; i < len; i++) {
        var entity = entities[i];
        var sprite = entity.sprite;
        var state = entity.animation;
        tick(state, sprite, delta);
    }
}

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

export default Aspect.create({
    id: ASPECT_ID,
    onStart: onStart,
    onStop: onStop,
    onDraw: onDraw
});
