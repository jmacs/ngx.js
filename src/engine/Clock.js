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
    if (_state === STATE_RUN) return;

    _targetFps = DEFAULT_FPS;
    _skip = DEFAULT_SKIP_MS;
    _interval = 1000 / _targetFps;
    _state = STATE_RUN;

    tick(0);
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

    GameClock.elapsed = _elapsed;
    GameClock.delta = _delta;
    GameClock.now = ~~_now;
    GameClock.fps = _actualFps;

    _onTick(_delta);
}

function stop() {
    _state = STATE_STOP;
}

function onTick(callback) {
    _onTick = callback || NOOP;
}

const GameClock = {
    onTick: onTick,
    start: start,
    stop: stop,
    delta: 0.0,
    now: 0.0,
    fps: 0.0,
    elapsed: 0.0
};

module.exports = GameClock;