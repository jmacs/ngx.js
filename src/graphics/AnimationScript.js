var EntityManager = require('../core/EntityManager');

const FILTER = 'graphics.animation';

function filterEntity(entity) {
    return entity.sprite && entity.animation;
}

function onSceneLoad() {
    EntityManager.addFilter(FILTER, filterEntity);
}

function onSceneUnload() {
    EntityManager.removeFilter(FILTER);
}

function onSceneBeforeDraw(delta) {
    var entities = EntityManager.getCache(FILTER);
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

module.exports = function Animations(scene) {
    scene.addEventListener('SceneLoad', onSceneLoad);
    scene.addEventListener('SceneLoad', onSceneLoad);
    scene.addEventListener('SceneStop', onSceneUnload);
    scene.addEventListener('SceneBeforeDraw', onSceneBeforeDraw);
};
