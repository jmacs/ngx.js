import ObjectPool from './ObjectPool';
import CoroutineSystem from './Coprocessor';

var noop = function() {};
var scripts = Object.create(null);
var pool = new ObjectPool(function() {
    return new Coroutine();
});

const EXIT = 0;
const RUNNING = 1;
const PAUSED = 2;
const SLEEP = 3;
const ERROR = 4;
const AWAIT = 5;

class Coroutine {

    constructor() {
        this.__state = 0;
        this.__delay = 0;
        this.__error = null;
        this.__next = null;
        this.__name = null;
        this.__time = 0;
        this.__id = 0;
    }

    get id() {
        return this.__id;
    }

    get state() {
        return this.__state;
    }

    get time() {
        return this.__time;
    }

    get error() {
        return this.__error;
    }

    exit() {
        this.__state = EXIT;
    }

    pause() {
        this.__state = PAUSED;
    }

    resume() {
        this.__state = RUNNING;
    }

    sleep(delay) {
        this.__delay = delay;
        this.__state = SLEEP;
    }

    next(callback) {
        this.__next = callback;
        this.__state = RUNNING;
    }

    await(processId, next) {
        this.__next = next;
        this.__state = AWAIT;
        CoroutineSystem.await(processId, this);
    }

    error(err) {
        console.error('error in process[%s] (%s)', this.__id, this.__name);
        console.error(err.stack);
        this.__error = err;
        this.__state = ERROR;
    }

    destroy() {
        this.__state = EXIT;
        this.__delay = 0;
        this.__error = null;
        this.__next = null;
        this.__name = null;
        this.__time = 0;
        pool.release(this);
    }

}

function create(name) {
    var script = Object.create(null);
    script.init = noop;
    scripts[name] = script;
    return script;
}

function start(name) {
    var script = scripts[name];
    if (!script) {
        console.error('undefined coroutine script %s', name);
        return;
    }
    var coroutine = pool.get();
    coroutine.__next = script.init;
    coroutine.__name = name;
    return CoroutineSystem.start(coroutine);
}

export default {
    start: start,
    create: create
};