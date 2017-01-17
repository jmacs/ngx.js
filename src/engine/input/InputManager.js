const Runtime = require('../Runtime');
const MouseState = require('./MouseState');

const GAMEPAD_SCAN_INTRVL_MS = 2000;

var _enableKeyboard = false;
var _enableGamepad = false;
var _enableMouse = false;
var _mouse = new MouseState();
var _keyboard = [];
var _gamepads = [null,null,null,null];
var _gamepadConnections = [false,false,false,false];
var _gamepadScanIntervalId = 0;

function enableKeyboard(enabled) {
    if (!_enableKeyboard && enabled) {
        _enableKeyboard = true;
        window.addEventListener('keydown', onKeyDown, false);
        window.addEventListener('keyup', onKeyUp, false);
    } else {
        _enableKeyboard = false;
        window.removeEventListener('keydown', onKeyDown, false);
        window.removeEventListener('keyup', onKeyUp, false);
    }
}

function enableGamepad(enabled) {
    if (!_enableGamepad && enabled) {
        _enableGamepad = true;
        _gamepadScanIntervalId = window.setInterval(
            scanGamepads,
            GAMEPAD_SCAN_INTRVL_MS
        );
    } else {
        _enableGamepad = false;
        window.clearInterval(_gamepadScanIntervalId);
    }
}

function scanGamepads() {
    _gamepads = navigator.getGamepads();

    for (var i = 0; i < 4; i++) {
        if (_gamepads[i] && !_gamepadConnections[i]) {
            _gamepadConnections[i] = true;
            triggerGamepadConnectedEvent(i);
        } else if (!_gamepads[i] && _gamepadConnections[i]) {
            _gamepadConnections[i] = false;
            triggerGamepadDisconnectedEvent(i);
        }
    }

}

function triggerGamepadConnectedEvent(index) {
    setTimeout(function () {
        Runtime.send('GamepadConnected', index);
    });
}

function triggerGamepadDisconnectedEvent(index) {
    setTimeout(function () {
        Runtime.send('GamepadDisconnected', index);
    });
}

function onKeyDown(e) {
    _keyboard[e.keyCode] = true;
}

function onKeyUp(e) {
    _keyboard[e.keyCode] = false;
}

function getKeyboard() {
    return _keyboard;
}

function getMouse() {
    return _mouse;
}

function getGamepad(index) {
    return _gamepads[index];
}


module.exports = {
    enableGamepad: enableGamepad,
    enableKeyboard: enableKeyboard,
    getKeyboard: getKeyboard,
    getMouse: getMouse,
    getGamepad: getGamepad
};
