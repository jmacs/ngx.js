import Viewport from '../graphics/Viewport.js';
import Aspect from '../core/Aspect';
import InputManager from './input/InputManager.js';

// todo: remove dep on input manager (with scripted camera man)
const ASPECT_ID = 'world.camera';



function onUpdate() {


    var keys = InputManager.keys;

    if (keys[87]) { // w
        Viewport.pan(0, 1);
    }

    if (keys[83]) { // s
        Viewport.pan(0, -1);
    }

    if (keys[65]) { // a
        Viewport.pan(-1, 0);
    }

    if (keys[68]) { // d
        Viewport.pan(1, 0);
    }

    if (keys[90]) { // z
        Viewport.zoom(1);
    }

    if (keys[88]) { // x
        Viewport.zoom(-1);
    }

    if (keys[81]) { // q
        Viewport.rotate(-0.01);
    }

    if (keys[69]) { // e
        Viewport.rotate(0.01);
    }

    Viewport.transform();
}

export default Aspect.create({
    id: ASPECT_ID,
    onUpdate: onUpdate
});

