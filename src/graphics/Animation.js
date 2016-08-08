var Assets = require('../core/Assets');

var _animations = Object.create(null);

class Animation {

    constructor(id, frames) {
        this.id = id;
        this.frames = frames || [];
        this.length = this.frames.length;
    }

}

function get(id) {
    return _animations[id] || null;
}

function add(animationData) {
    for (var i = 0, l = animationData.length; i < l; i++) {
        var data = animationData[i];
        _animations[data.id] = new Animation(data.id, data.frames);
    }
}

function load(asset) {
    return Assets.httpGetJSON(asset.url).then(add);
}

module.exports = {
    id: 'animation',
    load: load,
    get: get,
    add: add
};
