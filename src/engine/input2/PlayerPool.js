const Player = require('./Player');

var _players = [];

var player = new Player(0);
player.name = 'system';
player.isPlayingOnStart = true;
player.assignMouseOnStart = true;
player.excludeAutoAssign = true;
player.controllerMap = null;
_players.push(player);

function add(player) {
    _players.push(player);
}

function get(id) {
    return _players[id];
}

function assignControllerMap(controllerMapId) {

}

module.exports = {
    add: add,
    get: get
};