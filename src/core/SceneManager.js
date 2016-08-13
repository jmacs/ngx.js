var GameClock = require('./GameClock');
var ResourceManager = require('./ResourceManager');

const EMPTY = {};
const DEFAULT_VIEWPORT = {
    clear: function(){}
};

var i = 0;
var _scene = null;
var _aspects = [];
var _aspectHash = Object.create(null);
var _aspectsLength = 0;
var _viewport = DEFAULT_VIEWPORT;
var _listeners = Object.create(null);

function setViewport(viewport) {
    _viewport = viewport || DEFAULT_VIEWPORT;
}

function getViewport() {
    return _viewport;
}

function start() {
    for (i = 0; i < _aspectsLength; i++) {
        _aspects[i].onStart();
    }
    triggerEvent('SceneStart');
}

function update(delta) {

    for (i = 0; i < _aspectsLength; i++) {
        _aspects[i].onUpdate(delta);
    }

    for (i = 0; i < _aspectsLength; i++) {
        _aspects[i].onPostUpdate(delta);
    }

    triggerScriptUpdate();

    _viewport.clear();

    for (i = 0; i < _aspectsLength; i++) {
        _aspects[i].onDraw(delta);
    }
}

function stop() {
    for (var i = 0; i < _aspectsLength; i++) {
        _aspects[i].onStop();
    }
    triggerEvent('SceneStop');
}

function activateScene(id, options) {
    var scene = ResourceManager.get('scene', id);

    if (!scene) {
        console.error('unknown scene: %s', id);
        return;
    }

    stop();
    triggerEvent('SceneUnload');
    detachScripts();
    setScene(scene);
    attachScripts(options);

    return ResourceManager
        .download(scene.assets)
        .then(onSceneLoaded);
}

function onSceneLoaded() {
    triggerEvent('SceneLoad');
    start();
    GameClock.onTick(update);
}

function setScene(scene) {
    _scene = scene;
    _aspects = scene.aspects;
    _aspectsLength = _aspects.length;
    _aspectHash = Object.create(null);
    for (var i = 0, l = _aspectsLength; i < l; i++) {
        var aspect = _aspects[i];
        _aspectHash[aspect.id] = aspect;
    }
}

function attachScripts(options) {
    var scripts = ResourceManager.getResource('script');
    for (var i = 0, l = _scene.scripts.length; i < l; i++) {
        var scriptName = _scene.scripts[i];
        var script = scripts.get(scriptName);
        if (!script) {
            console.warn('Unknown script "%s" defined in scene "%s"', scriptName, _scene.name);
            continue;
        }
        if (!(script instanceof Function)) {
            console.warn('Script is not a function "%s"', scriptName);
            continue;
        }
        script(SceneManager, options || EMPTY);
    }
}

function detachScripts() {
    _listeners = Object.create(null);
}

function addEventListener(event, callback) {
    _listeners[event] = _listeners[event] || [];
    _listeners[event].push(callback);
}

function removeEventListener(event, callback) {
    _listeners = _listeners[event];
    if (!_listeners) return;
    _listeners.remove(callback);
}

function triggerEvent(event, arg1, arg2, arg3) {
    var callbacks = _listeners[event];
    if (!callbacks) return;
    for (var i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i](arg1, arg2, arg3);
    }
}

function triggerScriptUpdate() {
    var callbacks = _listeners.SceneUpdate;
    if (!callbacks) return;
    for (var i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i]();
    }
}

function getAspect(id) {
    return _aspectHash[id];
}

var SceneManager = {
    getViewport: getViewport,
    setViewport: setViewport,
    getAspect: getAspect,
    activateScene: activateScene,
    triggerEvent: triggerEvent,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
};

module.exports = SceneManager;
