const ActionPool = require('./ActionPool');
const PlayerPool = require('./PlayerPool');
const Settings = require('./Settings');
const ControllerPool = require('./ControllerPool');

function initialize(options) {
    if (options.settings) {
        copyProperties(options.settings, Settings);
    }

    if (options.actions) {
        ActionPool.initialize(options.actions);
    }

    if (options.players) {
        PlayerPool.initialize(options.players);
    }
}

function copyProperties(copyFrom, copyTo) {
    var keys = Object.keys(copyFrom);
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        if (copyFrom.hasOwnProperty(key)) {
            copyTo[key] = copyFrom[key];
        }
    }
}

module.exports = {
    settings: Settings,
    players: PlayerPool,
    actions: ActionPool,
    controllers: ControllerPool,
    initialize: initialize
};

