import InputManager from '../../input/InputManager.js';
import System from '../../core/System.js';
import Entity from '../../core/Entity.js';
import Time from '../../core/Time.js';

const SYSTEM_ID = 'input';

var keys = InputManager.keys;
var player1 = null;
var player2 = null;

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const ZERO = 0.0;

function update() {
    if(!player1) return;

    if(keys[KEY_UP]) {
        player1.up += Time.delta;
    } else {
        player1.up = ZERO;
    }

    if(keys[KEY_DOWN]) {
        player1.down += Time.delta;
    } else {
        player1.down = ZERO;
    }

    if(keys[KEY_RIGHT]) {
        player1.right += Time.delta;
    } else {
        player1.right = ZERO;
    }

    if(keys[KEY_LEFT]) {
        player1.left += Time.delta;
    } else {
        player1.left = ZERO;
    }

}

function onVoidTransition() {
    System.activateSystem(SYSTEM_ID);
}

function onComponentAttach(entity, component) {
    if(!component.human) return;
    switch (component.index) {
        case 0:
            player1 = component;
            break;
        case 1:
            player2 = component;
            break;
    }
}

function onComponentDetach(entity, component) {
    if(!component.human) return;
    switch (component.index) {
        case 0:
            player1 = null;
            break;
        case 1:
            player2 = null;
            break;
    }
}

System.registerSystem(SYSTEM_ID, update, 0);

System.onTransition(NGX.CX_VOID, onVoidTransition);

Entity.linkEvents('input', onComponentAttach, onComponentDetach);
