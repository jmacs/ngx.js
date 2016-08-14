var InputManager = require('../../input/InputManager');
var EntityManager = require('../../core/EntityManager');

const FILTER = 'world.input';
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const ZERO = 0.0;

var keyboard;
var mouse;

function onSceneLoad() {
    keyboard = InputManager.getDevice('keyboard');
    mouse = InputManager.getDevice('mouse');
    EntityManager.addFilter(FILTER, filterEntity);
}

function onSceneUnload() {
    keyboard = null;
    mouse = null;
    EntityManager.removeFilter(FILTER);
}

function filterEntity(entity) {
    return entity.input && entity.input.human;
}

function onSceneProcessInput(delta) {
    var entities = EntityManager.getCache(FILTER);

    for (var i = 0, l = entities.length; i < l; i++) {
        var entity = entities[i];
        tick(delta, entity.input);
    }

}

function tick(delta, component) {
    var state = keyboard.getState();

    if (state.keys[KEY_UP]) {
        component.up += delta;
    } else {
        component.up = ZERO;
    }

    if (state.keys[KEY_DOWN]) {
        component.down += delta;
    } else {
        component.down = ZERO;
    }

    if (state.keys[KEY_RIGHT]) {
        component.right += delta;
    } else {
        component.right = ZERO;
    }

    if (state.keys[KEY_LEFT]) {
        component.left += delta;
    } else {
        component.left = ZERO;
    }
}

module.exports = {
    name: 'Inputs',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    SceneProcessInput: onSceneProcessInput
};
