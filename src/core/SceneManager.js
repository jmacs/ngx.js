var GameClock = require('./GameClock');
var ResourceManager = require('./ResourceManager');

const DEFAULT_VIEWPORT = {
    clear: function(){}
};

var i = 0;
var _scene = null;
var _aspects = [];
var _aspectsLength = 0;
var _viewport = DEFAULT_VIEWPORT;

function setViewport(viewport) {
    _viewport = viewport || DEFAULT_VIEWPORT;
}

function enterStage(stage) {
    for (i = 0; i < _aspectsLength; i++) {
        _aspects[i].onStageEnter(stage);
    }
}

function exitStage(stage) {
    for (i = 0; i < _aspectsLength; i++) {
        _aspects[i].onStageExit(stage);
    }
}

function start() {
    for (i = 0; i < _aspectsLength; i++) {
        _aspects[i].onStart();
    }
}

function update(delta) {

    for (i = 0; i < _aspectsLength; i++) {
        _aspects[i].onUpdate(delta);
    }

    for (i = 0; i < _aspectsLength; i++) {
        _aspects[i].onPostUpdate(delta);
    }

    _viewport.clear();

    for (i = 0; i < _aspectsLength; i++) {
        _aspects[i].onDraw(delta);
    }
}

function stop() {
    for (var i = 0; i < _aspectsLength; i++) {
        _aspects[i].onStop();
    }
}

function activateScene(id) {
    var scene = ResourceManager.getResource('scene', id);

    if (!scene) {
        console.error('unknown scene: %s', id);
        return;
    }

    stop();
    _scene = scene;
    _aspects = scene.aspects;
    _aspectsLength = _aspects.length;
    start();

    GameClock.onTick(update);
}

module.exports = {
    setViewport: setViewport,
    enterStage: enterStage,
    exitStage: exitStage,
    activateScene: activateScene
};
