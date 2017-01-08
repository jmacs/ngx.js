var ResourceManager = require('../core/ResourceManager');
var ObjectPool = require('../core/ObjectPool');
var Process = require('./Process');

var _initialized = false;
var _identity = 0;
var _coroutines;
var _processPool;
var _stackA = [];
var _stackB = [];
var _stack = _stackA;

function initialize() {
    if (_initialized) return;
    _initialized = true;
    _coroutines = ResourceManager.getResource('coroutine');
    _processPool = new ObjectPool({
        create: function() {
            return new Process();
        },
        release: function(process) {
            process.__id = 0;
            process.__name = null;
            process.__state = null;
            process.__time = 0;
            process.__timeout = 0;
            process.__status = -1;
        }
    });
    //GameClock.onTick(onGameClockTick);
}

function startProcess(coroutineId, initialState) {
    var coroutine = _coroutines.get(coroutineId);
    if (!coroutine) {
        console.warn('Coroutine not found "%s"', coroutineId);
        return;
    }
    var process = _processPool.create();
    process.initialize(
        ++_identity,
        coroutineId,
        coroutine.main,
        initialState
    );
    _stack.push(process);
    return process.id;
}

function endProcess(pid) {
    for (var i = 0, l = _stack.length; i < l; i++) {
        if (_stack[i].id === pid) {
            _stack[i].exit();
            return;
        }
    }
}

function update(delta) {
    var thisStack = _stack === _stackA ? _stackA : _stackB;
    var nextStack = thisStack === _stackA ? _stackB : _stackA;
    _stack = nextStack;

    for (var i = 0, l = thisStack.length; i < l; i++) {
        var process = thisStack[i];
        if (process.update(delta)) {
            // continue in next frame
            nextStack.push(process);
        } else {
            if (process.status === 4) {
                console.warn('process timed out "%s#%s"', process.name, process.id);
            } else if (process.status === 5) {
                console.warn('unhandled exception in process "%s#%s"', process.name, process.id);
            }
            _processPool.release(process);
        }
    }

    thisStack.length = 0;
}

function log() {
    console.debug('pool: %o', _processPool);
    console.debug('stack A: %o', _stackA);
    console.debug('stack B: %o', _stackB);
}

module.exports = {
    initialize: initialize,
    startProcess: startProcess,
    endProcess: endProcess,
    update: update,
    log: log
};
