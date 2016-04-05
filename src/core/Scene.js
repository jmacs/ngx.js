import GameClock from './GameClock';
import Arrays from './Arrays';
import Aspect from './Aspect';

var _config = Object.create(null);
var _name = null;
var _type = 0;
var _aspects = [];
var _aspectsLength = 0;
var _running = false;
var _paused = false;

function reset() {
    _aspects.length = 0;
    _running = false;
    _paused = false;
}

function name() {
    return _name;
}

function type() {
    return _type;
}

function running() {
    return _running;
}

function paused() {
    return _paused;
}

function enterStage(stage) {
    for (var i = 0; i < _aspectsLength; i++) {
        _aspects[i].onStageEnter(stage);
    }
}

function exitStage(stage) {
    for (var i = 0; i < _aspectsLength; i++) {
        _aspects[i].onStageExit(stage);
    }
}

function enterEntity(entity) {
    for (var i = 0; i < _aspectsLength; i++) {
        _aspects[i].onEntityEnter(entity);
    }
}

function exitEntity(entity) {
    for (var i = 0; i < _aspectsLength; i++) {
        _aspects[i].onEntityExit(entity);
    }
}

function pause() {
    if (_paused) return;
    _paused = true;
    for (var i = 0; i < _aspectsLength; i++) {
        _aspects[i].onPause();
    }
}

function resume() {
    if (!_paused) return;
    _paused = false;
    for (var i = 0; i < _aspectsLength; i++) {
        _aspects[i].onResume();
    }
}

function update(delta) {
    for (var i = 0; i < _aspectsLength; i++) {
        _aspects[i].onUpdate(delta);
    }
}

function request(url, startWhenDone) {
    return fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        return buildSceneConfiguration(data, startWhenDone);
    });
}

function start(name) {
    var config = _config[name];

    if (!config) {
        console.error('unknown scene "%s"', name);
        return;
    }

    if (_running) {
        for (i = 0; i < _aspectsLength; i++) {
            _aspects[i].onStop();
        }
        reset();
    }

    _aspects.length = 0;

    var aspects = config.aspects;
    for (var i = 0, l = aspects.length; i < l; i++) {
        var aspect = aspects[i];
        _aspects.push(aspect);
        aspect.onStart();
    }

    _aspectsLength = _aspects.length;
    _name = config.name;
    _type = config.type;
    _paused = false;
    _running = true;
}

function bindGameClock() {
    GameClock.bind(update);
}

function buildSceneConfiguration(data, startWhenDone) {
    if (!data.name) {
        console.error('scene must have a name: %s', url);
        return null;
    }

    var config = {
        name: data.name,
        type: data.type || 0,
        aspects: []
    };

    for(var i = 0, l = data.aspects.length; i < l; i++) {
        var aspect = Aspect.get(data.aspects[i]);
        if (!aspect) {
            console.error('undefined aspect "%s" in scene "%s"', data.aspects[i], url);
        } else {
            config.aspects.push(aspect);
        }
    }

    _config[config.name] = config;

    if (startWhenDone) {
        start(config.name);
    }

    return config;
}

export default {
    bindGameClock: bindGameClock,
    name: name,
    type: type,
    running: running,
    paused: paused,
    start: start,
    pause: pause,
    resume: resume,
    request: request,
    enterStage: enterStage,
    exitStage: exitStage,
    enterEntity: enterEntity,
    exitEntity: exitEntity
};