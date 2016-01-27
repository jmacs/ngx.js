import Aspect from './Aspect';

const EXIT = 0;
const RUNNING = 1;
const PAUSED = 2;
const SLEEP = 3;
const ERROR = 4;
const AWAIT = 5;

var id = 0;
var stackA = [];
var stackB = [];
var stack = stackA;
var waiting = Object.create(null);

var aspect = Aspect.create('ngx.coroutines');

function start(coroutine) {
    coroutine.__id = ++id;
    coroutine.__state = RUNNING;
    stack.push(coroutine);
    return coroutine.__id;
}

function await(awaitProcessId, coroutine) {
    if (waiting[awaitProcessId]) {
        waiting[awaitProcessId].push(coroutine);
    } else {
        waiting[awaitProcessId] = [coroutine];
    }
    coroutine.__state = AWAIT;
}

function dequeueAwait(coroutine) {
    if (waiting[coroutine.__id]) {
        var array = waiting[coroutine.__id];
        for (var i = 0, l = array.length; i < l; i++) {
            if (coroutine.state === ERROR) {
                console.debug('exiting awaiting process because the parent process failed');
                array[i].__state = EXIT;
            } else {
                array[i].__state = RUNNING;
            }
        }
        delete waiting[coroutine.__id];
    }
}

function cancel(id) {
    setState(id, EXIT);
}

function pause(id) {
    setState(id, PAUSED);
}

function resume(id) {
    setState(id, RUNNING);
}

function setState(id, state) {
    var length = stack.length;
    for (var i = 0; i < length; i++) {
        if (stack[i].__id === id) {
            stack[i].__state = state;
            return;
        }
    }
}

aspect.onUpdate = function(delta) {
    var length = stack.length;
    if (!length) return;
    var temp = stack;
    stack = temp === stackA ? stackB : stackA;
    for (var i = 0; i < length; i++) {
        var coroutine = temp[i];
        switch (coroutine.__state) {
            case RUNNING:
                stack.push(coroutine);
                execute(coroutine, delta);
                break;
            case SLEEP:
                stack.push(coroutine);
                wait(coroutine, delta);
                break;
            case AWAIT:
            case PAUSED:
                stack.push(coroutine);
                break;
            case ERROR:
            case EXIT:
                dequeueAwait(coroutine);
                coroutine.destroy();
                break;
        }
    }
    temp.length = 0;
};

function execute(coroutine, delta) {
    var next = coroutine.__next;
    coroutine.__next = null;
    coroutine.__state = EXIT;

    try {
        next(coroutine);
    } catch(err) {
        console.error('unhandled error in process[%s] (%s)', coroutine.__id, coroutine.__name);
        console.error(err.stack);
        coroutine.__error = err;
        coroutine.__state = ERROR;
        return;
    }

    coroutine.__time += delta;
}

function wait(coroutine, delta) {
    coroutine.__delay -= delta;
    if (coroutine.__delay <= 0) {
        coroutine.__delay = 0;
        coroutine.__state = RUNNING;
    }
}

export default {
    start: start,
    await: await,
    cancel: cancel,
    resume: resume,
    pause: pause
}