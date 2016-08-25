var DEFAULT_FPS = 60;
var DEFAULT_SKIP_MS = 166;

var STATE_NEW = 0;
var STATE_RUN = 1;
var STATE_STOP = 2;

var _listeners = Object.create(null);
var _noop = function(){};
var _doUpdate = _noop;
var _doDraw = _noop;
var _actualFps = 0;
var _targetFps = 0;
var _skip = 0;
var _then = 0;
var _interval = 0.0;
var _delta = 0.0;
var _elapsed = 0;
var _state = STATE_NEW;
var _now = 0;
var _frameCounter = 0;
var _frameTimer = 1000;

function start() {
    if (_state === STATE_STOP) {

        triggerEvent('GameClockRestarted');

        _state = STATE_RUN;

        tick(0);

    } else if (_state === STATE_NEW) {

        _targetFps = DEFAULT_FPS;
        _skip = DEFAULT_SKIP_MS;
        _interval = 1000 / _targetFps;
        _state = STATE_RUN;

        console.info('GameClockLoaded');
        triggerEvent('GameClockLoaded');

        tick(0);

        console.info('GameClockStarted');
        triggerEvent('GameClockStarted');

    }
}

function tick(now) {
    if (_state === STATE_RUN) {
        requestAnimationFrame(tick);
    }

    _now = now;
    _delta = now - _then;

    if (_delta < _interval) return;

    _frameCounter++;
    _frameTimer -= _delta;
    if (_frameTimer <= 0) {
        _actualFps = _frameCounter;
        _frameTimer = 1000;
        _frameCounter = 0;
    }

    if (_delta > _skip) {
        _delta = _skip;
    }

    _then = now;
    _elapsed += _delta * 0.001;

    _doUpdate(_delta);
    _doDraw(_delta);
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

function stop() {
    _state = STATE_STOP;
}

function delta() {
    return _delta;
}

function now() {
    return _now;
}

function fps() {
    return _actualFps;
}

function elapsed() {
    return _elapsed;
}

function onUpdate(callback) {
    _doUpdate = callback || _noop;
}

function onDraw(callback) {
    _doDraw = callback || _noop;
}

module.exports = {
    start: start,
    stop: stop,
    delta: delta,
    now: now,
    fps: fps,
    elapsed: elapsed,
    onUpdate: onUpdate,
    onDraw: onDraw,
    triggerEvent: triggerEvent,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
};