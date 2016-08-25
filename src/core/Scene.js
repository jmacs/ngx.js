
class Scene {

    constructor(options) {
        this.name = options.name;
        this.assets = options.assets || {};
        this.scripts = options.scripts || [];
        this.cameras = options.cameras || [];
    }

}

module.exports = Scene;
