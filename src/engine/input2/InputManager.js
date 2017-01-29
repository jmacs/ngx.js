const Runtime = require('../Runtime');
const Enums = require('./Enums');
const ActionPool = require('./ActionPool');
const PlayerPool = require('./PlayerPool');
const Settings = require('./Settings');
const ControllerPool = require('./ControllerPool');


function initialize(options) {
    if (options.settings) {
        copyProperties(options.settings, Settings);
    }

    if (options.actions) {
        ActionPool.initialize(options.contexts, options.actions);
    }

    if (options.controllerMaps) {
        // pass controller connection behavior
        ControllerPool.initialize({
            onControllerConnected: onControllerConnected,
            onControllerDisconnected: onControllerDisconnected,
            controllerMaps: options.controllerMaps
        });
    }

    if (options.players) {
        PlayerPool.initialize(options.players);
    }
}

function onControllerConnected(controller) {
    Runtime.send('ControllerConnected', controller);

    if (Settings.autoAssignmentEnabled) {
        // Assign controller to next available player
        var players = PlayerPool.getPlayers();
        for (var i = 0, l = players.length; i < l; i++) {
            var player = players[i];
            if (player.controller === null && player.controllerMap > -1) {
                console.debug('Auto assigning controller %s to ', controller.index, player.name);
                return mapPlayerControls(player, controller);
            }
        }
    }
}

function mapPlayerControls(player, controller) {
    player.controller = controller;
    var actionStates = player.actions;
    var controllerMap = ControllerPool.getControllerMap(player.controllerMap);
    controllerMap.mappings.forEach(function (mapping) {
        var actionState = actionStates[mapping.action];
        if (!actionState) return;
        controller.assignAction(mapping.element, actionState);
    });
}

function onControllerDisconnected(controller) {
    Runtime.send('ControllerDisconnected', controller);

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

