var GamepadState = require('./GamepadState');

var _gamepads;

function enable() {
    _gamepads = [];
    window.addEventListener('gamepadconnected', onGamepadConnected);
    window.addEventListener('gamepaddisconnected', onGamepadDisconnected);
}

function disable() {
    _gamepads = null;
    window.removeEventListener('gamepadconnected', onGamepadConnected);
    window.removeEventListener('gamepaddisconnected', onGamepadDisconnected);
}

function onGamepadConnected(e) {
    var gamepad = e.gamepad;
    _gamepads[gamepad.index] = new GamepadState(gamepad);
}

function onGamepadDisconnected(e) {
    var gamepad = e.gamepad;
    _gamepads[gamepad.index] = null;
}

function getState(index) {
    return _gamepads[index];
}

module.exports = {
    type: 'gamepad',
    enable: enable,
    disable: disable,
    getState: getState
};