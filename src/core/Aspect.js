var noop = function(){};

var template = {
    id: '<undefined>',
    onStart: noop,
    onStageStart: noop,
    onUpdate: noop,
    onPostUpdate: noop,
    onDraw: noop,
    onPause: noop,
    onResume: noop,
    onEnable: noop,
    onDisable: noop,
    onStop: noop
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
