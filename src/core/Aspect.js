import GameClock from './GameClock';

var _aspects = Object.create(null);

class Aspect {

    constructor(name) {
        this.__name = name;
    }

    get name() {
        return this.__name;
    }

    onInitialize() {}
    onStart() {}
    onStageEnter(stage) {}
    onStageExit(stage) {}
    onUpdate(delta) {}
    onPostUpdate(delta) {}
    onEntityEnter(entity) {}
    onEntityExit(entity) {}
    onPause() {}
    onResume() {}
    onEnable() {}
    onDisable() {}
    onStop() {}
}

function create(name) {
    var aspect = new Aspect(name);
    _aspects[name] = aspect;
    return aspect;
}

function get(name) {
    return _aspects[name];
}

// todo: refactor this out
GameClock.on('initialize', function() {
    Object.keys(_aspects).forEach(function(key) {
        _aspects[key].onInitialize();
    });
});

export default {
    create: create,
    get: get
}