var noop = function(){};

var template = {
    id: '<undefined>',
    onInitialize: noop,
    onStart: noop,
    onStageEnter: noop,
    onStageExit: noop,
    onUpdate: noop,
    onPostUpdate: noop,
    onDraw: noop,
    onPause: noop,
    onResume: noop,
    onEnable: noop,
    onDisable: noop,
    onStop: noop,
    onDestroy: noop
};

function mixin(a, b) {
    for (var prop in b) {
        if (!a.hasOwnProperty(prop)) {
            a[prop] = b[prop];
        }
    }
    return a;
}

function create(obj) {
    return mixin(obj, template);
}

module.exports = {
    create: create
};
