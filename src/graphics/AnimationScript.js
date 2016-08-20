var EntityManager = require('../core/EntityManager');
var GameClock = require('../core/GameClock');

const FILTER = 'graphics.animation';

function filterEntity(entity) {
    return entity.components.sprite &&
        entity.components.animation;
}

function onSceneLoad() {
    EntityManager.addFilter(FILTER, filterEntity);
}

function onSceneUnload() {
    EntityManager.removeFilter(FILTER);
}

function onSceneBeforeDraw(delta) {
    EntityManager.forEach(FILTER, tickAnimation, delta);
}

function tickAnimation(entity, delta) {
    var sprite = entity.components.sprite;
    var state = entity.components.animation;

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

module.exports = {
    name: 'Animations',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    SceneBeforeDraw: onSceneBeforeDraw
};
