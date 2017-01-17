const InputSystem = require('./InputSystem');
const ControllerManager = require('./ControllerManager');
const Keyboard = require('./Keyboard');
const Gamepad = require('./Gamepad');

module.exports = function InputModule(runtime) {
    Keyboard.enable(true);
    Gamepad.enable(true);

    var controller = ControllerManager.createController(0);
    controller.config.ENABLE_KEYBOARD = true;
    controller.config.ENABLE_GAMEPAD = true;

    runtime.onSceneLoad(bindInputSystem);
};

function bindInputSystem(runtime, scene) {
    if (!scene.input) return;
    InputSystem(runtime, scene.input);
}
