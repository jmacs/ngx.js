const ControllerManager = require('./ControllerManager');

module.exports = function InputSystem(runtime) {
    var _controller0;

    runtime.onSceneInitialize(function () {
        _controller0 = ControllerManager.getController(0);
    });

    runtime.onBeginFrame(function () {
        _controller0.clear();
        _controller0.sync();
        console.log(_controller0.state);
    });

    runtime.on('GamepadConnected', function (index) {
        console.log('GamepadConnected ' + index);
    });

    runtime.on('GamepadDisconnected', function (index) {
        console.log('GamepadDisconnected ' + index);
    });
};
