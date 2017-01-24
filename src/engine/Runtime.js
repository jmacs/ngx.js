const GameClock = require('./Clock');
const EventEmitter = require('./EventEmitter');

var _properties = null;
var _scene = null;
var _events = new EventEmitter();
var _callbacks = Object.create(null);
var _onSceneLoad = [];
var _lifecycleHooks = [];
var _lifecycleLength = 0;
var _lifecycleIndex = {
    BeginFrame: 0,
    BeginUpdate: 1,
    PreUpdate: 2,
    Update: 3,
    PostUpdate: 4,
    EndUpdate: 5,
    BeginDraw: 6,
    PreDraw: 7,
    Draw: 8,
    PostDraw: 9,
    EndDraw: 10,
    EndFrame: 11
};

function bootstrap(properties) {
    _properties = properties;
    var modules = properties.modules;
    var promises = [];
    for (var i = 0, l = modules.length; i < l; i++) {
        promises.push(modules[i](Runtime));
    }
    Promise.all(promises).then(function () {
        triggerCallback('ModulesLoaded');
    });
}

function properties() {
    return _properties;
}

function start() {
    GameClock.onTick(onGameClockTick);
    GameClock.start();
}

function stop() {
    GameClock.stop();
    GameClock.onTick(null);
}

function pause() {
    triggerCallback('Pause');
}

function resume() {
    triggerCallback('Resume');
}

function onGameClockTick(delta) {
    for (var i = 0; i < _lifecycleLength; i++) {
        _lifecycleHooks[i].invoke(delta);
    }
}

function addLifecycleHook(index, callback) {
    _lifecycleHooks.push({index: index, invoke: callback});
    _lifecycleLength = _lifecycleHooks.length;
    _lifecycleHooks.sort(sortByIndex);
}

function sortByIndex(a, b) {
    if (a.index < b.index) return -1;
    if (a.index > b.index) return 1;
    return 0;
}

function addCallback(name, callback) {
    _callbacks[name] = _callbacks[name] || [];
    _callbacks[name].push(callback);
}

function triggerCallback(name, args) {
    var callbacks = _callbacks[name];
    if (!callbacks) return;
    for (var i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i](Runtime, args);
    }
}

function on(event, callback) {
    _events.on(event, callback)
}

function off(event, callback) {
    _events.off(event, callback)
}

function send(event, args) {
    _events.send(event, args)
}

function onModulesLoaded(callback) {
    addCallback('ModulesLoaded', callback);
}

function onSceneInitialize(callback) {
    addCallback('SceneInitialize', callback);
}

function onBeginFrame(callback) {
    addLifecycleHook(_lifecycleIndex.BeginFrame, callback);
}

function onBeginUpdate(callback) {
    addLifecycleHook(_lifecycleIndex.BeginUpdate, callback);
}

function onPreUpdate(callback) {
    addLifecycleHook(_lifecycleIndex.PreUpdate, callback);
}

function onUpdate(callback) {
    addLifecycleHook(_lifecycleIndex.Update, callback);
}

function onPostUpdate(callback) {
    addLifecycleHook(_lifecycleIndex.PostUpdate, callback);
}

function onEndUpdate(callback) {
    addLifecycleHook(_lifecycleIndex.EndUpdate, callback);
}

function onBeginDraw(callback) {
    addLifecycleHook(_lifecycleIndex.BeginDraw, callback);
}

function onPreDraw(callback) {
    addLifecycleHook(_lifecycleIndex.PreDraw, callback);
}

function onDraw(callback) {
    addLifecycleHook(_lifecycleIndex.Draw, callback);
}

function onPostDraw(callback) {
    addLifecycleHook(_lifecycleIndex.PostDraw, callback);
}

function onEndDraw(callback) {
    addLifecycleHook(_lifecycleIndex.EndDraw, callback);
}

function onEndFrame(callback) {
    addLifecycleHook(_lifecycleIndex.EndFrame, callback);
}

function onSceneFinalize(callback) {
    addCallback('SceneFinalize', callback);
}

function onPause(callback) {
    addCallback('Pause', callback);
}

function onResume(callback) {
    addCallback('Resume', callback);
}

function onSceneLoad(callback) {
    _onSceneLoad.push(callback);
}

function triggerSceneLoad(scene) {
    var promises = [];
    for (var i = 0, l = _onSceneLoad.length; i < l; i++) {
        var promise = _onSceneLoad[i](Runtime, scene);
        if (!promise) continue;
        promises.push(promise);
    }
    return promises;
}

function downloadScene(url) {
    console.info('Downloading scene "%s"', url);
    return fetch(url).then(function (response) {
        return response.json();
    }).then(loadScene);
}

function loadScene(scene) {
    stop();

    if (_scene) {
        console.info('Unloading current scene');
        triggerCallback('SceneFinalize');
    }

    unloadLifecycleAndEvents();
    console.log('Loading scene "%s"', scene.name);
    _scene = scene;

    var promises = triggerSceneLoad(scene);

    Promise.all(promises).then(function () {
        console.info('Initializing scene');
        triggerCallback('SceneInitialize');
        start();
    });
}

function unloadLifecycleAndEvents() {
    _lifecycleHooks.length = 0;
    _lifecycleLength = 0;
    _events.clear();
    _callbacks = Object.create(null);
    _scene = null;
}

var Runtime = {
    bootstrap: bootstrap,
    properties: properties,
    start: start,
    stop: stop,
    pause: pause,
    resume: resume,
    on: on,
    off: off,
    send: send,
    downloadScene: downloadScene,
    loadScene: loadScene,
    onModulesLoaded: onModulesLoaded,
    onSceneLoad: onSceneLoad,
    onSceneInitialize: onSceneInitialize,
    onBeginFrame: onBeginFrame,
    onBeginUpdate: onBeginUpdate,
    onPreUpdate: onPreUpdate,
    onUpdate: onUpdate,
    onPostUpdate: onPostUpdate,
    onEndUpdate: onEndUpdate,
    onBeginDraw: onBeginDraw,
    onPreDraw: onPreDraw,
    onDraw: onDraw,
    onPostDraw: onPostDraw,
    onEndDraw: onEndDraw,
    onEndFrame: onEndFrame,
    onSceneFinalize: onSceneFinalize,
    onPause: onPause,
    onResume: onResume
};

module.exports = Runtime;