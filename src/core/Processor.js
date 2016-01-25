import System from './System.js';
import Time from './Time.js';

const STATE_NEW = 0;
const STATE_RUNNING = 1;
const STATE_EXITING = 2;
const STATE_STOPPED = 3;
const STATE_DONE = 4;

var updating = false;
var suspended = false;
var processTasks = {};
var processStack1 = [];
var processStack2 = [];
var processStack = [];
var id = 0;

function nextId() {
    return ++id;
}

function define(name, factory) {
    var tasks = Object.create(null);
    factory(tasks);
    tasks.name = name;
    if(tasks.initialize) {
        processTasks[name] = tasks;
    } else {
        console.error('process must define an "initialize" task');
    }
}

function start(name, args) {
    var tasks = processTasks[name];
    if(tasks) {
        var process = new Process(tasks, args);
        processStack[processStack.length] = process;
        return process.id;
    } else {
        console.error('unknown process name "%s"', name);
        return 0;
    }
}

function update() {
    if(suspended || updating) return;
    updating = true;

    var temp = null;
    if(processStack === processStack1) {
        temp = processStack1;
        processStack = processStack2;
    } else {
        temp = processStack2;
        processStack = processStack1;
    }

    var len = temp.length;
    for(var i = 0; i < len; i++) {
        var process = temp[i];
        switch (process.state) {
            case STATE_NEW:
                process.initialize();
                break;
            case STATE_RUNNING:
                process.update();
                break;
            case STATE_EXITING:
                process.destroy();
                break;
        }
        if(process.state !== STATE_DONE) {
            processStack[processStack.length] = process;
        }
    }
    temp.length = 0;
    updating = false;
}

function suspend(flag) {
    suspended = flag ? true : false;
}

function find(id) {
    for (var i = 0, len = processStack.length; i < len; i++) {
        var process = processStack[i];
        if(process.id === id) return process;
    }
    return null;
}

function kill(id) {
    var process = find(id);
    if(process) {
        return process.kill();
    } else {
        console.warn('kill: unknown process "%s"', id);
    }
    return false;
}

function killAll(context) {
    for (var i = 0, len = processStack.length; i < len; i++) {
        var process = processStack[i];
        if(process.context === context) {
            processStack[i].kill();
        }
    }
}

function halt(id) {
    var process = find(id);
    if(process) {
        return process.halt();
    } else {
        console.warn('cancel: unknown process "%s"', id);
    }
    return false;
}

function resume(id) {
    var process = find(id);
    if(process) {
        return process.resume();
    } else {
        console.warn('cancel: unknown process "%s"', id);
    }
    return false;
}

class Process {

    constructor(tasks, args) {
        this._id = nextId();
        this._context = System.getContext();
        this._args = args;
        this._scope = Object.create(null);
        this._state = STATE_NEW;
        this._tasks = tasks;
        this._next = 0;
        this._delay = 0.0;
        this._elapsed = 0.0;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._tasks.name;
    }

    get context() {
        return this._context;
    }

    get elapsed() {
        return this._elapsed;
    }

    get state() {
        return this._state;
    }

    get args() {
        return this._args;
    }

    initialize() {
        this._next = 0;
        this._state = STATE_EXITING;
        var next = this._tasks.initialize(this._scope, this);
        if(next) {
            this._next = next;
            this._state = STATE_RUNNING;
        }
    }

    update() {
        var delta = Time.delta;
        this._elapsed += delta;
        if(this._delay > 0) {
            this._delay -= delta;
        } else {
            this._state = STATE_EXITING;
            var task = this._tasks[this._next];
            if(task) {
                var next = task(this._scope, this);
                if(next) {
                    this._next = next;
                    this._state = STATE_RUNNING;
                }
            }
        }
    }

    sleep(delayMs) {
        this._delay = delayMs;
    }

    resume() {
        if(this._state === STATE_RUNNING) {
            this._state = STATE_STOPPED;
            return true;
        }
        return false;
    }

    halt() {
        if(this._state === STATE_RUNNING) {
            this._state = STATE_STOPPED;
            return true;
        }
        return false;
    }

    kill() {
        if(this._state != STATE_DONE) {
            this._state = STATE_EXITING;
            return true;
        }
        return false;
    }

    destroy() {
        if(this._state === STATE_EXITING) {
            this._state = STATE_DONE;
            var destroyTask = this._tasks.destroy;
            if(destroyTask) {
                destroyTask(this, this._scope);
            }
            this._tasks = null;
            this._scope = null;
            this._args = null;
        }
    }
}

export default {
    define: define,
    update: update,
    start: start,
    kill: kill,
    halt: halt,
    resume: resume,
    killAll: killAll,
    suspend: suspend
}