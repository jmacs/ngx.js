var DEFAULT_FPS = 60;
var DEFAULT_SKIP_MS = 166;

var STATE_NEW = 0;
var STATE_RUN = 1;
var STATE_STOP = 2;

var listeners = Object.create(null);

var _onTick = function(){};
var fps = 0;
var skip = 0;
var then = 0;
var interval = 0.0;
var dt = 0.0;
var elapsed = 0;
var state = STATE_NEW;
var frameId = 0;
var frameCounter = 0;
var frameTimer = 1000;
var actualFps = 0;

function start() {
    if (state === STATE_STOP) {

        console.info('game clock restarted');

        state = STATE_RUN;

        trigger('restart');
        tick(0);

    } else if (state === STATE_NEW) {

        trigger('bootstrap');
        trigger('initialize');

        fps = DEFAULT_FPS;
        skip = DEFAULT_SKIP_MS;
        interval = 1000 / fps;
        state = STATE_RUN;

        console.info('game clock started');

        trigger('start');
        tick(0);
    }
}

function tick(now) {
    if (state === STATE_RUN) {
        requestAnimationFrame(tick);
    }

    frameId = now;
    dt = now - then;

    frameCounter++;
    frameTimer -= dt;
    if (frameTimer <= 0) {
        actualFps = frameCounter;
        frameTimer = 1000;
        frameCounter = 0;
    }

    if (dt < interval) return;

    if (dt > skip) {
        dt = skip;
    }

    then = now;
    elapsed += dt;

    _onTick(dt);
}

function stop() {
    console.info('game clock stopped');
    state = STATE_STOP;
    trigger('stop');
}

function delta() {
    return dt;
}

function getFPS() {
    return actualFps;
}

function on(event, callback) {
    if (listeners[event]) {
        listeners[event].push(callback);
    } else {
        listeners[event] = [callback];
    }
}

function trigger(event) {
    if (listeners[event]) {
        var callbacks = listeners[event];
        for (var i = 0, l = callbacks.length; i < l; i++) {
            callbacks[i]();
        }
    }
}

function onTick(callback) {
    _onTick = callback;
}

export default {
    start: start,
    stop: stop,
    on: on,
    delta: delta,
    getFPS: getFPS,
    onTick: onTick
}