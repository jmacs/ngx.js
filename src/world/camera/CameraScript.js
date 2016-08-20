var Viewport = require('../../graphics/Viewport2D.js');
var InputManager = require('../../input/InputManager.js');

// todo: remove dep on input manager (with scripted camera man)

var keyboard = null;

function onSceneLoad() {
    keyboard = InputManager.getDevice('keyboard');
}

function onSceneUnload() {
    keyboard = null;
}

function onSceneUpdate() {
    var state = keyboard.getState();

    if (state.keys[87]) { // w
        Viewport.pan(0, 1);
    }

    if (state.keys[83]) { // s
        Viewport.pan(0, -1);
    }

    if (state.keys[65]) { // a
        Viewport.pan(-1, 0);
    }

    if (state.keys[68]) { // d
        Viewport.pan(1, 0);
    }

    if (state.keys[90]) { // z
        Viewport.zoom(1);
    }

    if (state.keys[88]) { // x
        Viewport.zoom(-1);
    }

    if (state.keys[81]) { // q
        Viewport.rotate(-0.01);
    }

    if (state.keys[69]) { // e
        Viewport.rotate(0.01);
    }

    Viewport.transform();
}

module.exports = {
    name: 'Cameras',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    SceneUpdate: onSceneUpdate
};
