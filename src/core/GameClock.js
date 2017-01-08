const DEFAULT_FPS = 60;
const DEFAULT_SKIP_MS = 166;
const STATE_NEW = 0;
const STATE_RUN = 1;
const STATE_STOP = 2;
const NOOP = function(){};

var _onTick = NOOP;
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

        _state = STATE_RUN;
        tick(0);

    } else if (_state === STATE_NEW) {

        _targetFps = DEFAULT_FPS;
        _skip = DEFAULT_SKIP_MS;
        _interval = 1000 / _targetFps;
        _state = STATE_RUN;

        tick(0);
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

    _onTick(_delta);
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

function onTick(callback) {
    _onTick = callback || NOOP;
}

module.exports = {
    start: start,
    stop: stop,
    delta: delta,
    now: now,
    fps: fps,
    elapsed: elapsed,
    onTick: onTick
};