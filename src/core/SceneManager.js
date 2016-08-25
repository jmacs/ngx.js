var GameClock = require('./GameClock');
var ResourceManager = require('./ResourceManager');
var ProcessManager = require('./ProcessManager');

var i = 0, l = 0;
var _scene = null;
var _listeners = Object.create(null);
var _lifecycle = {
    SceneLoad: [],
    SceneProcessInput: [],
    SceneBeforeUpdate: [],
    SceneUpdate: [],
    SceneAfterUpdate: [],
    SceneUnload: []
};

function initialize() {
    GameClock.onUpdate(onGameClockUpdate);
}

function resetScene() {
    _listeners = Object.create(null);
    _lifecycle.SceneLoad.length = 0;
    _lifecycle.SceneProcessInput.length = 0;
    _lifecycle.SceneBeforeUpdate.length = 0;
    _lifecycle.SceneUpdate.length = 0;
    _lifecycle.SceneAfterUpdate.length = 0;
    _lifecycle.SceneUnload.length = 0;
}

function loadScene() {
    GameClock.triggerEvent('SceneLoad', _scene);
    l = _lifecycle.SceneLoad.length;
    for (i = 0; i < l; i++) {
        _lifecycle.SceneLoad[i](SceneManager);
    }
}

function onGameClockUpdate(delta) {

    l = _lifecycle.SceneProcessInput.length;
    for (i = 0; i < l; i++) {
        _lifecycle.SceneProcessInput[i](delta);
    }

    l = _lifecycle.SceneBeforeUpdate.length;
    for (i = 0; i < l; i++) {
        _lifecycle.SceneBeforeUpdate[i](delta);
    }

    l = _lifecycle.SceneUpdate.length;
    for (i = 0; i < l; i++) {
        _lifecycle.SceneUpdate[i](delta);
    }

    l = _lifecycle.SceneAfterUpdate.length;
    for (i = 0; i < l; i++) {
        _lifecycle.SceneAfterUpdate[i](delta);
    }

    // execute coroutines
    ProcessManager.update(delta);
}


function unloadScene() {
    GameClock.triggerEvent('SceneUnload', _scene);
    l = _lifecycle.SceneLoad.length;
    for (i = 0; i < l; i++) {
        _lifecycle.SceneLoad[i](SceneManager);
    }
}

function onSceneAssetsDownloaded() {
    for (var i = 0, l = _scene.scripts.length; i < l; i++) {
        attachScript(_scene.scripts[i]);
    }
    loadScene();
}

//
// Public Functions
//

function activateScene(id) {
    var scene = ResourceManager.get('scene', id);

    if (!scene) {
        console.error('unknown scene: %s', id);
        return;
    }

    console.info('Loading scene "%s"', id);

    unloadScene();
    resetScene();

    _scene = scene;

    return ResourceManager
        .download(scene.assets)
        .then(onSceneAssetsDownloaded);
}

function attachScript(scriptName) {
    ResourceManager.getResource('script')
        .foreachFunction(scriptName, addEventListener);
}

function detachScript(scriptName) {
    ResourceManager.getResource('script')
        .foreachFunction(scriptName, removeEventListener);
}

function addEventListener(event, callback) {
    if (_lifecycle[event]) {
        _lifecycle[event].push(callback);
        return;
    }
    _listeners[event] = _listeners[event] || [];
    _listeners[event].push(callback);
}

function removeEventListener(event, callback) {
    if (_lifecycle[event]) {
        var n = _lifecycle[event].indexOf(callback);
        _lifecycle[event][n] = null;
        return;
    }
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

function log() {
    console.debug('scene: %o', _scene);
    console.debug('lifecycle: %o', _lifecycle);
    console.debug('listeners: %o', _listeners);
}

var SceneManager = {
    log: log,
    initialize: initialize,
    activateScene: activateScene,
    attachScript: attachScript,
    detachScript: detachScript,
    triggerEvent: triggerEvent,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
};

module.exports = SceneManager;
