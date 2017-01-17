const InputManager = require('./InputManager');

module.exports = function InputSystem(runtime) {

    runtime.onSceneInitialize(function () {

    });

    runtime.onBeginFrame(function () {

    });

    runtime.on('GamepadConnected', function (index) {
        console.log('GamepadConnected ' + index);
    });

    runtime.on('GamepadDisconnected', function (index) {
        console.log('GamepadDisconnected ' + index);
    });
};
