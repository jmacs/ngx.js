const Runtime = require('../Runtime');

const SCAN_INTERVAL_MS = 1000;

var _enabled = false;
var _pads = [false, false, false, false];
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
    var gamepads = navigator.getGamepads();

    for (var i = 0; i < 4; i++) {
        if (gamepads[i] && !_pads[i]) {
            _pads[i] = true;
            triggerGamepadConnectedEvent(i, gamepads[i].id);
        } else if (!gamepads[i] && _pads[i]) {
            _pads[i] = false;
            triggerGamepadDisconnectedEvent(i);
        }
    }

}

function triggerGamepadConnectedEvent(index, id) {
    setTimeout(function () {
        console.log('Gamepad %s connected "%s"', index, id);
        Runtime.send('GamepadConnected', {
            id: id,
            index: index
        });
    });
}

function triggerGamepadDisconnectedEvent(index) {
    setTimeout(function () {
        console.log('Gamepad %s disconnected', index);
        Runtime.send('GamepadDisconnected', {
            index: index
        });
    });
}

function getGamepad(index) {
    return navigator.getGamepads()[index];
}


module.exports = {
    enable: enable,
    getGamepad: getGamepad
};
