var InputManager = require('./InputManager');
var KeyboardDevice = require('./KeyboardDevice');
var MouseDevice = require('./MouseDevice');
var GamepadDevice = require('./GamepadDevice');

function initialize() {
    InputManager.registerDevice(KeyboardDevice);
    InputManager.registerDevice(MouseDevice);
    InputManager.registerDevice(GamepadDevice);
}

module.exports = {
    initialize: initialize
};
