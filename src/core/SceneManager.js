var GameClock = require('./GameClock');
var ResourceManager = require('./ResourceManager');
var EntityManager = require('./EntityManager');

const NOOP = function(){};

var i = 0;
var _scene = null;
var _clearScreen = NOOP;
var _listeners = null;
var _countSceneLoad = 0;
var _countSceneProcessInput = 0;
var _countSceneBeforeUpdate = 0;
var _countSceneUpdate = 0;
var _countSceneAfterUpdate = 0;
var _countSceneBeforeDraw = 0;
var _countSceneDraw = 0;
var _countSceneAfterDraw = 0;
var _countSceneUnload = 0;

//
// Initialization
//

function initializeScripts() {
    var scripts = ResourceManager.getResource('script');

    for (var i = 0, l = _scene.scripts.length; i < l; i++) {
        var scriptName = _scene.scripts[i];
        var scriptFunction = scripts.get(scriptName);

        if (!scriptFunction) {
            console.warn('Unknown script "%s" defined in scene "%s"', scriptName, _scene.name);
            continue;
        }

        if (!(scriptFunction instanceof Function)) {
            console.warn('Script is not a function "%s"', scriptName);
            continue;
        }

        scriptFunction(SceneManager);
    }

}

function initializeEventListeners() {
    _listeners = Object.create(null);

    // fixed functions
    _listeners.SceneLoad = [];
    _listeners.SceneProcessInput = [];
    _listeners.SceneBeforeUpdate = [];
    _listeners.SceneUpdate = [];
    _listeners.SceneAfterUpdate = [];
    _listeners.SceneBeforeDraw = [];
    _listeners.SceneDraw = [];
    _listeners.SceneAfterDraw = [];
    _listeners.SceneUnload = [];
}
initializeEventListeners();

function cacheFixedFunctionLength() {
    _countSceneLoad = _listeners.SceneLoad.length;
    _countSceneProcessInput = _listeners.SceneProcessInput.length;
    _countSceneBeforeUpdate = _listeners.SceneBeforeUpdate.length;
    _countSceneUpdate = _listeners.SceneUpdate.length;
    _countSceneAfterUpdate = _listeners.SceneAfterUpdate.length;
    _countSceneBeforeDraw = _listeners.SceneBeforeDraw.length;
    _countSceneDraw = _listeners.SceneDraw.length;
    _countSceneAfterDraw = _listeners.SceneAfterDraw.length;
    _countSceneUnload = _listeners.SceneUnload.length;
}

//
// Tick
//

function tick(delta) {

    for (i = 0; i < _countSceneProcessInput; i++) {
        _listeners.SceneProcessInput[i](delta);
    }

    for (i = 0; i < _countSceneBeforeUpdate; i++) {
        _listeners.SceneBeforeUpdate[i](delta);
    }

    for (i = 0; i < _countSceneUpdate; i++) {
        _listeners.SceneUpdate[i](delta);
    }

    for (i = 0; i < _countSceneAfterUpdate; i++) {
        _listeners.SceneAfterUpdate[i](delta);
    }

    for (i = 0; i < _countSceneBeforeDraw; i++) {
        _listeners.SceneBeforeDraw[i](delta);
    }

    _clearScreen();

    for (i = 0; i < _countSceneDraw; i++) {
        _listeners.SceneDraw[i](delta);
    }

    for (i = 0; i < _countSceneAfterDraw; i++) {
        _listeners.SceneAfterDraw[i](delta);
    }
}

//
// Public Functions
//

function log() {
    console.debug('scene: %o', _scene);
    console.debug('listeners: %o', _listeners);
}

function onClearScreen(callback) {
    _clearScreen = callback;
}

function activateScene(id) {
    var scene = ResourceManager.get('scene', id);

    if (!scene) {
        console.error('unknown scene: %s', id);
        return;
    }

    console.info('Loading scene "%s"', id);

    triggerEvent('SceneUnload');

    _scene = scene;

    initializeEventListeners();
    initializeScripts();

    return ResourceManager
        .download(scene.assets)
        .then(onSceneLoaded);
}

function onSceneLoaded() {
    triggerEvent('SceneLoad');
    GameClock.onTick(tick);
}

function addEventListener(event, callback) {
    _listeners[event] = _listeners[event] || [];
    _listeners[event].push(callback);
    cacheFixedFunctionLength();
}

function removeEventListener(event, callback) {
    _listeners = _listeners[event];
    if (!_listeners) return;
    _listeners.remove(callback);
    cacheFixedFunctionLength();
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
    onClearScreen: onClearScreen,
    activateScene: activateScene,
    triggerEvent: triggerEvent,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
};

module.exports = SceneManager;
