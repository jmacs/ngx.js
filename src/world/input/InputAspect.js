import InputManager from './InputManager';
import Aspect from '../../core/Aspect';

var aspect = Aspect.create('world.input');

var keys = InputManager.keys;
var player1 = null;
var player2 = null;

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const ZERO = 0.0;


aspect.onUpdate = function(delta) {
    if (!player1) return;

    if (keys[KEY_UP]) {
        player1.up += delta;
    } else {
        player1.up = ZERO;
    }

    if (keys[KEY_DOWN]) {
        player1.down += delta;
    } else {
        player1.down = ZERO;
    }

    if (keys[KEY_RIGHT]) {
        player1.right += delta;
    } else {
        player1.right = ZERO;
    }

    if (keys[KEY_LEFT]) {
        player1.left += delta;
    } else {
        player1.left = ZERO;
    }

};

aspect.onStageExit = function() {
    player1 = null;
    player2 = null;
};

aspect.onEntityEnter = function(entity) {
    if (entity.input && entity.input.human) {
        switch (entity.input.index) {
            case 0:
                player1 = entity.input;
                break;
            case 1:
                player2 = entity.input;
                break;
        }
    }
};
