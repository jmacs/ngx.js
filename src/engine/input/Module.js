const InputSystem = require('./InputSystem');
const InputManager = require('./InputManager');
const KeyboardDevice = require('./KeyboardDevice');
const MouseDevice = require('./MouseDevice');
const GamepadDevice = require('./GamepadDevice');

module.exports = function InputModule(runtime) {

    InputManager.registerDevice(KeyboardDevice);
    InputManager.registerDevice(MouseDevice);
    InputManager.registerDevice(GamepadDevice);

    runtime.onSceneLoad(bindInputSystem);
};

function bindInputSystem(runtime, scene) {
    if (!scene.input) return;
    InputSystem(runtime, scene.input);
}
