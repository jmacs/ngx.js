
class Animation {

    constructor(id, frames) {
        this.id = id;
        this.frames = frames || [];
        this.length = this.frames.length;
    }

}

module.exports = Animation;
