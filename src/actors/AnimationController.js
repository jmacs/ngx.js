var EntityManager = require('../composition/EntityManager');

module.exports = function (runtime) {
    runtime.addEventListener('SceneLoad', onSceneLoad);
    runtime.addEventListener('SceneUnload', onSceneUnload);
    runtime.addLifecycleHook('PostUpdate', onPostUpdate);

    var filter = null;

    function onSceneLoad() {
        filter = EntityManager.createFilter('graphics.animation', function(entity) {
            return entity.components.sprite &&
                entity.components.animation;
        });
    }

    function onSceneUnload() {
        filter = null;
    }

    function onPostUpdate(delta) {
        filter.each(tickAnimation, delta);
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
};
