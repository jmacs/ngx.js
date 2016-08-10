var GameClock = require('./GameClock');

const noop = function(){};
const DEFAULT_VIEWPORT = {
    clear: noop
};

var i = 0;
var l = 0;
var _prefabs = Object.create(null);
var _sceneCache = Object.create(null);
var _aspectCache = Object.create(null);
var _activeSceneId = null;
var _aspects = [];
var _aspectsLength = 0;
var _viewport = DEFAULT_VIEWPORT;

class Scene {
    constructor(id, options) {
        this.id = id;
        this.options = options;
        this.aspects = [];
    }
}

function setViewport(viewport) {
    _viewport = viewport || DEFAULT_VIEWPORT;
}

function registerPrefabs(modules) {
    for (i = 0, l = modules.length; i < l; i++) {
        var module = modules[i];
        _prefabs[module.name] = module;
    }
}

function registerAspects(modules) {
    for (i = 0, l = modules.length; i < l; i++) {
        var module = modules[i];
        _aspectCache[module.id] = module;
    }
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

function create(id, prefabName, options) {
    var prefab = _prefabs[prefabName];

    if (!prefab) {
        console.error('unknown scene prefab "%s"', id);
        return;
    }

    var scene = new Scene(id, options);

    for (var i = 0, l = prefab.aspects.length; i < l; i++) {

        var aspectId = prefab.aspects[i];
        var aspect = _aspectCache[aspectId];

        if (!aspect) {
            console.error('unknown aspect "%s" in scene prefab "%s"', aspectId, prefabName);
            continue;
        }

        scene.aspects.push(aspect);
    }

    _sceneCache[id] = scene;
}

function activate(id) {
    var scene = _sceneCache[id];

    if (!scene) {
        console.error('unknown scene: %s', id);
        return;
    }

    stop();
    _activeSceneId = id;
    _aspects = scene.aspects;
    _aspectsLength = _aspects.length;
    start();

    GameClock.onTick(update);
}

function destroy(id) {
    delete _sceneCache[id];
    if (id === _activeSceneId) {
        stop();
        _activeSceneId = null;
        _aspects = [];
        _aspectsLength = 0;
        GameClock.unbind();
    }
}

module.exports = {
    setViewport: setViewport,
    registerPrefabs: registerPrefabs,
    registerAspects: registerAspects,
    enterStage: enterStage,
    exitStage: exitStage,
    create: create,
    activate: activate,
    destroy: destroy
};
