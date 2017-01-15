
class EventEmitter {

    constructor() {
        this.__listeners = Object.create(null);
    }

    send(event, args) {
        var callbacks = this.__listeners[event] || [];
        for (var i = 0, l = callbacks.length; i < l; i++) {
            callbacks[i](args);
        }
    }

    on(event, callback) {
        this.__listeners[event] = this.__listeners[event] || [];
        this.__listeners[event].push(callback);
    }

    off(event, callback) {
        var callbacks = this.__listeners[event];
        if (!callbacks) return;
        var n = callbacks.indexOf(callback);
        if (n === -1) return;
        callbacks.splice(n, 1);
    }

    clear() {
        this.__listeners = Object.create(null);
    }

}

module.exports = EventEmitter;
