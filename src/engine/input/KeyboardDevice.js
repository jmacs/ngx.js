var KeyboardState = require('./KeyboardState');

var _keyboard;

function enable() {
    _keyboard = new KeyboardState();
    window.addEventListener('keydown', onKeyDown, false);
    window.addEventListener('keyup', onKeyUp, false);
}

function disable() {
    _keyboard = null;
    window.removeEventListener('keydown', onKeyDown, false);
    window.removeEventListener('keyup', onKeyUp, false);
}

function onKeyDown(event) {
    _keyboard.keys[event.keyCode] = true;
}

function onKeyUp(event) {
    _keyboard.keys[event.keyCode] = false;
}

function getState() {
    return _keyboard;
}

module.exports = {
    type: 'keyboard',
    enable: enable,
    disable: disable,
    getState: getState
};