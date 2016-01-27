var animations = Object.create(null);

class Animation {

    constructor(id, frames) {
        this.id = id;
        this.frames = frames || [];
        this.length = this.frames.length;
    }
}

function get(id) {
    return animations[id] || null;
}

function add(animationData) {
    for (var i = 0, il = animationData.length; i < il; i++) {
        var data = animationData[i];
        animations[data.id] = new Animation(data.id, data.frames);
    }
}

export default {
    get: get,
    add: add
}