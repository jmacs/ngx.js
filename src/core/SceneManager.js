var GameClock = require('./GameClock');
var ResourceManager = require('./ResourceManager');
var EntityManager = require('./EntityManager');
var ProcessManager = require('./ProcessManager');

var i = 0, l = 0;
var _scene = null;
var _listeners = Object.create(null);
var _compositor = null;
var _lifecycle = {
    SceneLoad: [],
    SceneProcessInput: [],
    SceneBeforeUpdate: [],
    SceneUpdate: [],
    SceneAfterUpdate: [],
    SceneUnload: []
};


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
    l = _lifecycle.SceneLoad.length;
    for (i = 0; i < l; i++) {
        _lifecycle.SceneLoad[i](SceneManager);
    }
}

function onGameClockTick(delta) {

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

    // draw scene
    _compositor.draw(delta);
}


function unloadScene() {
    l = _lifecycle.SceneLoad.length;
    for (i = 0; i < l; i++) {
        _lifecycle.SceneLoad[i](SceneManager);
    }
}

//
// Public Functions
//

function log() {
    console.debug('scene: %o', _scene);
    console.debug('listeners: %o', _listeners);
}

function getCompositor() {
    return _compositor;
}

function setCompositor(value) {
    _compositor = value;
}

function activateScene(id) {
    var scene = ResourceManager.get('scene', id);

    if (!scene) {
        console.error('unknown scene: %s', id);
        return;
    }

    console.info('Loading scene "%s"', id);

    unloadScene();

    _scene = scene;

    return ResourceManager
        .download(scene.assets)
        .then(onSceneLoaded);
}

function onSceneLoaded() {
    resetScene();
    for (var i = 0, l = _scene.scripts.length; i < l; i++) {
        attachScript(_scene.scripts[i]);
    }
    loadScene();
    GameClock.onTick(onGameClockTick);
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
        _lifecycle[event].remove(callback);
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

var SceneManager = {
    log: log,
    getCompositor: getCompositor,
    setCompositor: setCompositor,
    activateScene: activateScene,
    attachScript: attachScript,
    detachScript: detachScript,
    triggerEvent: triggerEvent,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
};

module.exports = SceneManager;
