
class Scene {

    constructor(options) {
        this.name = options.name;
        this.assets = options.assets || {};
        this.scripts = options.scripts || [];
    }

}

module.exports = Scene;
