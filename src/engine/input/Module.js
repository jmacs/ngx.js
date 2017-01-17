const InputSystem = require('./InputSystem');
const InputManager = require('./InputManager');

module.exports = function InputModule(runtime) {
    InputManager.enableGamepad(true);

    runtime.onSceneLoad(bindInputSystem);
};

function bindInputSystem(runtime, scene) {
    if (!scene.input) return;
    InputSystem(runtime, scene.input);
}
