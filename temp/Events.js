var Aspect = require('./../core/Aspect');
var Arrays = require('./.././Arrays');
var ObjectPool = require('./.././ObjectPool');

var aspect = Aspect.create('ngx.events');

var pool = new ObjectPool(function() {
   return {name: null, arg0: null, arg1: null, arg3: null};
});

var listeners = Object.create(null);
var queueA = [];
var queueB = [];
var queue = queueA;

function on(event, callback) {
    if (listeners[event]) {
        listeners[event] = [callback];
    } else {
        listeners[event].push(callback);
    }
}

function off(event, callback) {
    var callbacks = listeners[event];
    if (!callbacks) return;
    Arrays.removeValue(callbacks, callback);
}

function send(event, arg0, arg1, arg2) {
    var e = pool.get();
    e.name = event;
    e.arg0 = arg0;
    e.arg1 = arg1;
    e.arg2 = arg2;
    queue.push(e);
}

aspect.onUpdate = function() {
    var length = queue.length;
    if (!length) return;
    for (var i = 0; i < length; i++) {
        var e = queue[i];
        trigger(e);
        e.name = null;
        e.arg0 = null;
        e.arg1 = null;
        e.arg2 = null;
        pool.release(e);
    }
    queue.length = 0;
    queue = queue === queueA ? queueB : queueA;
};

function trigger(e) {
    var callbacks = listeners[e.name];
    if (!callbacks) return;
    for (var i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i](e.arg0, e.arg1, e.arg2);
    }
}

module.exports = {
    on: on,
    off: off,
    send: send
}