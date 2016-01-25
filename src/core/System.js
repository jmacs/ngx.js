import Processor from './Processor.js';
import Arrays from './Arrays.js';
import Events from './Events.js';

var transitionListeners = {};
var initializeListeners = [];

var noop = function() { };
var render = noop;
var updateProcessor = Processor.update;
var flushEvents = Events.flush;

var functions = {};
var lifecycleStage = 0;
var activeFunctions = [];
var activeFunctionsLength = 0;
var currentContext = -1;
var nextContext = 0;

function onInitialize(callback) {
    initializeListeners.push(callback);
}

function initialize(options) {
    if(lifecycleStage > 1) return;
    var len = initializeListeners.length;
    for(var i = 0; i < len; i++) {
        initializeListeners[i](options);
    }
    initializeListeners = null;
    lifecycleStage = 2;
}

function transition(context) {
    nextContext = context;
}

function onTransition(cx, callback) {
    if(!transitionListeners[cx]) {
        transitionListeners[cx] = [callback];
    } else {
        transitionListeners[cx].push(callback);
    }
}

function triggerTransition() {
    console.info('transitioning to context %s', nextContext);
    currentContext = nextContext;
    var listeners = transitionListeners[currentContext];
    if(!listeners) return;
    for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i](currentContext);
    }
    activeFunctions.sort(sortByPriority);
}

function sortByPriority(a, b) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
}

function registerRenderer(id, callback, priority) {
    if(callback) render = callback;
}

function registerSystem(id, callBack, priority) {
    if(!functions[id]) {
        if(priority === undefined) {
            priority = 999999999;
        }
        callBack.priority = priority;
        functions[id] = callBack;
    } else {
        console.warn('registerFunction: "%s" is already registered', id);
    }
}

function activateSystem(id) {
    var func = functions[id];
    if(func) {
        var i = activeFunctions.indexOf(func);
        if(i !== -1) return;
        activeFunctions[activeFunctions.length] = func;
        activeFunctionsLength++;
    } else {
        console.error('activate: unknown system function "%s"', id);
    }
}

function deactivateSystem(id) {
    var func = functions[id];
    if(Arrays.removeValue(activeFunctions, func)) {
        activeFunctionsLength--;

    }
}

function update() {
    if(currentContext != nextContext) {
        triggerTransition();
    }

    for(var i = 0; i < activeFunctionsLength; i++) {
        activeFunctions[i]();
    }

    updateProcessor();
    flushEvents();
    render();
}

function getContext() {
    return currentContext;
}

export default {
    initialize: initialize,
    onInitialize: onInitialize,
    update: update,
    transition: transition,
    onTransition: onTransition,
    getContext: getContext,
    registerRenderer: registerRenderer,
    activateRenderer: noop,
    deactivateRenderer: noop,
    registerSystem: registerSystem,
    activateSystem: activateSystem,
    deactivateSystem: deactivateSystem
}