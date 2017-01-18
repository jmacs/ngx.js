const InputSystem = require('./InputSystem');
const ControllerManager = require('./ControllerManager');
const Keyboard = require('./Keyboard');
const Gamepad = require('./Gamepad');

module.exports = function InputModule(runtime) {
    Keyboard.enable(true);
    Gamepad.enable(true);

    ControllerManager.registerInputMappers([
        require('./XInputMapper'),
        require('./DInputMapper'),
    ]);

    var controller = ControllerManager.createController(0);
    controller.keepAlive = true;
    //controller.auxiliaryMapper = ControllerManager.getInputMapper('KeyboardMapper');

    runtime.onSceneLoad(bindInputSystem);
};

function bindInputSystem(runtime, scene) {
    if (!scene.input) return;
    InputSystem(runtime, scene.input);
}
