const MyInputSettings = require('./MyInputSettings');
const InputManager = require('./InputManager');
const InputSystem = require('./InputSystem');

module.exports = function Input2Module(runtime) {
    InputManager.initialize(MyInputSettings);
    runtime.onSceneLoad(bindInputSystem);
};

function bindInputSystem(runtime, scene) {
    if (!scene.input) return;
    InputSystem(runtime, scene.input);
}
