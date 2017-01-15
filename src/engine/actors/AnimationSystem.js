const EntityManager = require('../composition/EntityManager');

module.exports = function AnimationSystem(runtime) {
    var _filter;

    runtime.onSceneInitialize(function () {
        _filter = EntityManager.createFilter('animation', function(entity) {
            return entity.components.sprite &&
                entity.components.animation;
        });
    });

    runtime.onPostUpdate(function (delta) {
        _filter.each(tickAnimation, delta);
    });

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
