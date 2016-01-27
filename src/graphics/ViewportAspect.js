import Viewport from './Viewport.js';
import Graphics from './Graphics.js';
import Color from './Color.js';
import Aspect from '../core/Aspect';
import InputManager from '../world/input/InputManager.js';

var aspect = Aspect.create('ngx.viewport');

// todo: remove dep on input manager (with scripted camera man)

var keys = InputManager.keys;

const gl = Graphics.getContext();

var clearbit = 0;

aspect.onInitialize = function() {
    var color = Color.fromHex(0x75ffff);
    clearbit = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
    gl.enable(gl.BLEND);
    gl.clearColor(color.r, color.b, color.g, 1.0);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    Viewport.initialize({
        width: 960,
        height: 540
    });
    Viewport.zoomTo(256);
    Viewport.lookAt(150, 100);
};

aspect.onUpdate = function() {
    gl.clear(clearbit);

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
};