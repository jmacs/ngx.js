const ActionPool = require('./ActionPool');
const Player = require('./Player');

var _players = [];

var player = new Player(0);
player.name = 'system';
player.controllerMap = -1;
_players.push(player);

function get(id) {
    return _players[id];
}

function initialize(players) {
    players.forEach(function (playerOptions) {
        var player = new Player(_players.length);
        player.name = playerOptions.name || player.name;
        player.controllerMap = playerOptions.controllerMap;
        player.actions = ActionPool.createActionStateArray();
        _players.push(player);
    });
}

function getPlayers() {
    return _players;
}

module.exports = {
    initialize: initialize,
    getPlayers: getPlayers,
    get: get
};