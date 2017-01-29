const Settings = require('./Settings');
const ControllerDevices = require('./ControllerDevices');
const Controller = require('./Controller');
const NOOP = function () {};

var _scanGamepadsHandle = 0;
var _maxControllers = 0;
var _controllerMaps = [];
var _connections = [];
var _controllers = [];
var _connectedControllers = 0;
var _onControllerDisconnected = NOOP;
var _onControllerConnected = NOOP;

function scanGamepads() {
    var gamepads = navigator.getGamepads();
    for (var index = 0; index < _maxControllers; index++) {
        if (gamepads[index] && !_connections[index]) {
            _connections[index] = true;
            handleGamepadConnect(index, gamepads[index]);
        } else if (!gamepads[index] && _connections[index]) {
            _connections[index] = false;
            handleGamepadDisconnect(index);
        }
    }
}

function handleGamepadConnect(index, gamepad) {
    console.debug('Gamepad %s connected: %s', index, gamepad.id);
    var controller = getNextAvailableController();
    if (!controller) return;

    var platform = window.navigator.platform;
    ControllerDevices.forEach(function (device) {
        if (device.platforms.indexOf(platform) >= 0) {
            if (device.test(gamepad.id)) {
                console.debug('Configuring controller: %s', device.name);
                controller.configure(index, device);
                _connectedControllers++;
                _onControllerConnected(controller);
            }
        }
    });
}

function handleGamepadDisconnect(index) {
    var controller = getControllerByGamepadIndex(index);
    if (!controller) return;
    _onControllerDisconnected(controller);
    controller.device = null;
    _connectedControllers--;
}

function getControllerByGamepadIndex(index) {
    for (var i = 0; i < _maxControllers; i++) {
        if (_controllers[i].gamepadIndex === index) {
            return _controllers[i];
        }
    }
    return null;
}

function getNextAvailableController() {
    for (var i = 0; i < _maxControllers; i++) {
        if (_controllers[i].device === null) {
            return _controllers[i];
        }
    }
    return null;
}

function updateControllerState() {
    var gamepads = navigator.getGamepads();
    for (var i = 0; i < _connectedControllers; i++) {
        var controller = _controllers[i];
        var gamepad = gamepads[controller.gamepadIndex];
        controller.mapper(gamepad, controller);
    }
}

function initialize(options) {
    _maxControllers = Settings.maxGamepads || 1;
    _controllerMaps = options.controllerMaps || [];

    // interval will scan for gamepad connects / disconnects
    // the html gamepad api is unreliable
    _scanGamepadsHandle = setInterval(
        scanGamepads, Settings.gamepadScanInterval
    );

    for (var i = 0; i < _maxControllers; i++) {
        var controller = new Controller(i);
        _controllers.push(controller);
    }

    if (options.onControllerConnected) {
        _onControllerConnected = options.onControllerConnected;
    }

    if (options.onControllerDisconnected) {
        _onControllerDisconnected = options.onControllerDisconnected;
    }
}

function getControllerMap(index) {
    return _controllerMaps[index];
}

module.exports = {
    initialize: initialize,
    getControllerMap: getControllerMap,
    updateControllerState: updateControllerState
};