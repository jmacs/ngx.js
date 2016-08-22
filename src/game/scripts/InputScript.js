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
var filter;

function onSceneLoad() {
    keyboard = InputManager.getDevice('keyboard');
    mouse = InputManager.getDevice('mouse');
    filter = EntityManager.createFilter(FILTER, function(entity) {
        return entity.components.input &&
            entity.components.input.human;
    });
}

function onSceneUnload() {
    keyboard = null;
    mouse = null;
    filter = null;
}

function onSceneProcessInput(delta) {
    filter.each(updateInput, delta);
}

function updateInput(entity, delta) {
    var component = entity.components.input;
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
