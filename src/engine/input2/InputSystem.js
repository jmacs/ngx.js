const ControllerPool = require('./ControllerPool');
const PlayerPool = require('./PlayerPool');

module.exports = function InputSystem(runtime) {


    runtime.onBeginFrame(function () {
        ControllerPool.updateControllerState();
        logControllers();
    });

};

function logControllers() {
    var player = PlayerPool.get(1);

    for (var i = 0, l = player.actions.length; i < l; i++) {
        var state = player.actions[i];
        if (state.pressed) {
            console.log('%s = %s', state.action.name, state.value);
        }
    }

}
