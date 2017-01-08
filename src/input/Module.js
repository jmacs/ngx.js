const InputManager = require('./InputManager');
const KeyboardDevice = require('./KeyboardDevice');
const MouseDevice = require('./MouseDevice');
const GamepadDevice = require('./GamepadDevice');

module.exports = function InputModule() {

    InputManager.registerDevice(KeyboardDevice);
    InputManager.registerDevice(MouseDevice);
    InputManager.registerDevice(GamepadDevice);

};
