var flushing = false;
var eventQueue1 = [];
var eventQueue2 = [];
var eventQueue = eventQueue1;
var eventListeners = Object.create(null);

function send(event, args) {
    if(event && eventListeners[event]) {
        eventQueue[eventQueue.length] = {name: event, args: args};
    }
}

function on(event, callback) {
    if(!eventListeners[event]) {
        eventListeners[event] = [callback];
    } else {
        eventListeners[event].push(callback);
    }
}

function flush() {
    if(flushing) return;

    var temp = null;
    if(eventQueue === eventQueue1) {
        temp = eventQueue1;
        eventQueue = eventQueue2;
    } else {
        temp = eventQueue2;
        eventQueue = eventQueue1;
    }
    var len = temp.length;
    if(len === 0) return;

    flushing = true;

    for (var i = 0; i < len; i++) {
        var event = temp[i];
        var listeners = eventListeners[event.name];
        for (var j = 0, lj = listeners.length; j < lj; j++) {
            listeners[j](event.args);
        }
    }

    flushing = false;
    temp.length = 0;
}

export default {
    send: send,
    on: on,
    flush: flush
}