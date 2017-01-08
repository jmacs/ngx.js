const GameClock = require('./GameClock');
const Bootstrap = require('./Bootstrap');

var _isInitialized = false;
var _modules = [];
var _listeners = Object.create(null);
var _hooksModified = false;
var _hooksAddQueue = [];
var _hooksRemoveQueue = [];
var _hooks = [];
var _hooksLength = 0;
var i = 0;

const LIFECYCLE = {
    BeginFrame: 0,
    PreInput: 1,
    Input: 2,
    PostInput: 3,
    PrePhysics: 4,
    Physics: 5,
    PostPhysics: 6,
    PreUpdate: 7,
    Update: 8,
    PostUpdate: 9,
    PreMultitask: 10,
    Multitask: 11,
    PostMultitask: 12,
    PreCamera: 13,
    Camera: 14,
    PostCamera: 15,
    PreDraw: 16,
    Draw: 17,
    PostDraw: 18,
    EndFrame: 19
};

function start() {

    if (_isInitialized) {
        console.info('Runtime restarted');
        return GameClock.start();
    }

    console.info('Runtime initializing');

    // bootstrap core resources
    Bootstrap(Runtime);

    // initialize modules
    for (var i = 0, l = _modules.length; i < l; i++) {
        console.debug('Initializing %s', _modules[i].name);
        _modules[i](Runtime);
    }

    _isInitialized = true;
    GameClock.onTick(onGameClockTick);
    GameClock.start();

    console.info('Runtime started');
    triggerEvent('RuntimeStart');
}

function stop() {
    console.info('Runtime stopped');
    GameClock.stop();
}

function reset() {
    _listeners = Object.create(null);
    _hooksRemoveQueue.length = 0;
    _hooksAddQueue.length = 0;
    _hooksLength = 0;
    _hooks.length = 0;
}

function onGameClockTick(delta) {
    for (i = 0; i < _hooksLength; i++) {
        _hooks[i].invoke(delta);
    }
    if (_hooksModified) {
        commitHooks();
    }
}

function addLifecycleHook(name, func, optId) {
    var index = LIFECYCLE[name];
    if (!index) return;

    _hooksAddQueue.push({
        id: optId,
        index: index,
        invoke: func
    });
    _hooksModified = true;
}

function removeLifecycleHook(func) {
    _hooksRemoveQueue.push(func);
    _hooksModified = true;
}

function commitHooks() {
    // temp will be the new array to hold all hooks
    var temp = _hooksAddQueue;

    // copy existing hooks into new array ignoring removed
    for (i = 0; i < _hooksLength; i++) {
        var hook = _hooks[i];
        if (_hooksRemoveQueue.indexOf(hook.invoke) !== -1) {
            temp.push(hook);
        }
    }

    _hooks = temp;
    _hooksAddQueue = [];
    _hooksRemoveQueue.length = 0;
    _hooksLength = _hooks.length;
    _hooks.sort(sortHooksByIndex);
    _hooksModified = false;
}

function sortHooksByIndex(a, b) {
    if (a.index < b.index) return -1;
    if (a.index > b.index) return 1;
    return 0;
}

function triggerEvent(event, args) {
    var callbacks = _listeners[event] || [];
    for (var i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i](args);
    }
}

function addEventListener(event, callback) {
    _listeners[event] = _listeners[event] || [];
    _listeners[event].push(callback);
}

function removeEventListener(event, callback) {
    var callbacks = _listeners[event];
    if (!callbacks) return;
    var n = callbacks.indexOf(callback);
    if (n === -1) return;
    callbacks.splice(n, 1);
}

function include(modules) {
    modules.forEach(function (module) {
        _modules.push(module);
    });
}

var Runtime = {
    start: start,
    stop: stop,
    reset: reset,
    include: include,
    triggerEvent: triggerEvent,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener,
    addLifecycleHook: addLifecycleHook,
    removeLifecycleHook: removeLifecycleHook
};

module.exports = Runtime;