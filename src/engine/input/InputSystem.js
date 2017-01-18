const ControllerManager = require('./ControllerManager');

module.exports = function InputSystem(runtime) {
    var _controllers = [];

    runtime.onSceneInitialize(function () {
        _controllers = ControllerManager.getControllers();
    });

    runtime.onBeginFrame(function () {
        for (var i = 0; i < 4; i++) {
            var controller = _controllers[i];
            if (controller) {
                controller.update();
                logController(_controllers[i]);
            }
        }
    });

    runtime.on('GamepadConnected', function (e) {
        ControllerManager.assignGamepadInputMapper(e.index, e.id);
    });

    runtime.on('GamepadDisconnected', function (e) {
        ControllerManager.unassignGamepadMapper(e.index);
    });

};

const Controls = require('./Controls');
var keys = Object.keys(Controls);
function logController(controller) {

    for (var i = 0, l = keys.length; i < l; i++) {
        var button = Controls[keys[i]];
        if (controller.state[button]) {
            console.log('[%s] %s %s', controller.index, keys[i], controller.state[button]);
        }
    }
}
