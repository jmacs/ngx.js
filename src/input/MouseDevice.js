var GameClock = require('../core/GameClock');
var MouseState = require('./MouseState');

var _mouse;

function enable() {
    _mouse = new MouseState();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousewheel', onMouseWheel);
}

function disable() {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mousewheel', onMouseWheel);
    _mouse = null;
}


function onMouseMove(e) {
    _mouse.x = e.screenX;
    _mouse.y = e.screenY;
}

function onMouseDown(e) {
    _mouse.buttons[e.button] = true;
}

function onMouseUp(e) {
    _mouse.buttons[e.button] = false;
}

function onMouseWheel(e) {
    _mouse.wheelY = e.deltaY;
    _mouse.wheelX = e.deltaX;
}

function getState() {
    return _mouse;
}

module.exports = {
    type: 'mouse',
    enable: enable,
    disable: disable,
    getState: getState
};