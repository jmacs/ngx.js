const Runtime = require('../Runtime');
const SCAN_INTERVAL_MS = 1000;

var _enabled = false;
var _pads = [false, false, false, false];
var _scanIntervalHandle = 0;

function initialize() {
    
}

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

function updateGamepadState() {
    var rawInput = navigator.getGamepads();

    for (var i = 0; i < 4; i++) {
        var item = rawInput[i];

    }
}

function clearGamepadState(state) {
    state[0] = 0.0;
    state[1] = 0.0;
    state[2] = 0.0;
    state[3] = 0.0;
    state[4] = 0.0;
    state[5] = 0.0;
    state[6] = 0.0;
    state[7] = 0.0;
    state[8] = 0.0;
    state[9] = 0.0;
    state[10] = 0.0;
    state[11] = 0.0;
    state[12] = 0.0;
    state[13] = 0.0;
    state[14] = 0.0;
    state[15] = 0.0;
    state[16] = 0.0;
    state[17] = 0.0;
    state[18] = 0.0;
    state[19] = 0.0;
    state[20] = 0.0;
    state[21] = 0.0;
}

module.exports = {
    enable: enable,
    getGamepad: getGamepad
};
