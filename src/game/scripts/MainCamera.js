var GraphicsManager = require('../../graphics/GraphicsManager');
var InputManager = require('../../input/InputManager');

var PAN_SPEED = 2;
var SCALE_SPEED = 0.01;
var ROTATE_SPEED = 0.01;
var keyboard = null;
var camera = null;

function onSceneLoad() {
    camera = GraphicsManager.getCamera('main');
    keyboard = InputManager.getDevice('keyboard');
    camera.setPosition(50, 80);
    camera.setScale(2.3, 2.3);
}

function onSceneUnload() {
    keyboard = null;
    camera = null;
}

function onSceneUpdate() {
    var state = keyboard.getState();

    if (state.keys[87]) { // w
        camera.pan(0, PAN_SPEED);
    }

    if (state.keys[83]) { // s
        camera.pan(0, -PAN_SPEED);
    }

    if (state.keys[65]) { // a
        camera.pan(-PAN_SPEED, 0);
    }

    if (state.keys[68]) { // d
        camera.pan(PAN_SPEED, 0);
    }

    if (state.keys[90]) { // z
        camera.scale(SCALE_SPEED, SCALE_SPEED);
    }

    if (state.keys[88]) { // x
        camera.scale(-SCALE_SPEED, -SCALE_SPEED);
    }

    if (state.keys[81]) { // q
        camera.rotate(-ROTATE_SPEED);
    }

    if (state.keys[69]) { // e
        camera.rotate(ROTATE_SPEED);
    }

    if (state.keys[82]) { // r
        camera.setRotation(0);
    }

}

module.exports = {
    name: 'MainCamera',
    SceneLoad: onSceneLoad,
    SceneUnload: onSceneUnload,
    SceneUpdate: onSceneUpdate
};
