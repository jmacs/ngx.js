var Viewport = require('../graphics/Viewport.js');
var Aspect = require('../core/Aspect');
var InputManager = require('../input/InputManager.js');

// todo: remove dep on input manager (with scripted camera man)
const ASPECT_ID = 'world.camera';

var keyboard = null;

function onStart() {
    keyboard = InputManager.getDevice('keyboard');
}

function onUpdate() {


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

module.exports = Aspect.create({
    id: ASPECT_ID,
    onUpdate: onUpdate,
    onStart: onStart
});

