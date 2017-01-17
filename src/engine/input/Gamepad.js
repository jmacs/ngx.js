const Runtime = require('../Runtime');

const SCAN_INTERVAL_MS = 2000;

var _enabled = false;
var _gamepads = [null,null,null,null];
var _connections = [false,false,false,false];
var _scanIntervalHandle = 0;

function enable(shouldEnable) {
    if (!_enabled && shouldEnable) {
        _enabled = true;
        _scanIntervalHandle = window.setInterval(
            scanGamepads,
            SCAN_INTERVAL_MS
        );
    } else {
        _enabled = false;
        window.clearInterval(_scanIntervalHandle);
    }
}

function scanGamepads() {
    _gamepads = navigator.getGamepads();

    for (var i = 0; i < 4; i++) {
        if (_gamepads[i] && !_connections[i]) {
            _connections[i] = true;
            triggerGamepadConnectedEvent(i);
        } else if (!_gamepads[i] && _connections[i]) {
            _connections[i] = false;
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

function getGamepad(index) {
    return _gamepads[index];
}


module.exports = {
    enable: enable,
    getGamepad: getGamepad
};
