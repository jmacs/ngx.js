var {mat4} = require('gl-matrix');

class SceneGraph {

    constructor(root) {
        this.__root = root;
        this.__state = {
            screenWidth: 1280,
            screenHeight: 720,
            projection: mat4.create(),
            model: mat4.create(),
            delta: 0.0
        };
    }

    get root() {
        return this.__root;
    }

    setScreenSize(width, height) {
        this.__state.screenWidth = width;
        this.__state.screenHeight = height;
    }

    initialize() {
        this.__root.initialize(this.__state);
    }

    update(delta) {
        this.__state.delta = delta;
        this.__root.update(this.__state);
    }

    findNode(id) {
        return this.__root.findNode(id);
    }
}

module.exports = SceneGraph;