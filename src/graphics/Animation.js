var animations = Object.create(null);

function get(id) {
    return animations[id] || null;
}

function load(options) {
    for(var i = 0, il = options.length; i < il; i++) {
        var data = options[i];
        animations[data.id] = new Animation(data.id, data.frames);
    }
}

class Animation {

    constructor(id, frames) {
        this.id = id;
        this.frames = frames || [];
        this.length = this.frames.length;
    }
}

export default {
    get: get,
    load: load
}