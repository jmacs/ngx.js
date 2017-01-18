const Mathlib = require('../Mathlib');
const Controls = require('./Controls');
const Gamepad = require('./Gamepad');

const ID_REGEX = [
    new RegExp('Xbox')
];

const AXIS_DEAD_ZONE = 0.25;
const BUTTON_A = 0;
const BUTTON_B = 1;
const BUTTON_X = 2;
const BUTTON_Y = 3;
const BUTTON_L = 4;
const BUTTON_R = 5;
const LEFT_STICK = 6;
const RIGHT_STICK = 7;
const START = 8;
const BACK = 9;
const HOME = 10;
const DIR_UP = 11;
const DIR_DOWN = 12;
const DIR_LEFT = 14;
const DIR_RIGHT = 13;
const LEFT_AXIS_X = 0;
const LEFT_AXIS_Y = 1;
const RIGHT_AXIS_X = 3;
const RIGHT_AXIS_Y = 4;
const LEFT_TRIGGER = 2;
const RIGHT_TRIGGER = 5;

function map(controller) {
    var gamepad = Gamepad.getGamepad(controller.index);
    var state = controller.state;

    controller.clear();

    // Gamepad

    if (gamepad) {

        var axes = gamepad.axes;
        var buttons = gamepad.buttons;

        // Face Buttons

        if (buttons[BUTTON_A].pressed) {
            state[Controls.BUTTON_A] = 1.0;
        }

        if (buttons[BUTTON_B].pressed) {
            state[Controls.BUTTON_B] = 1.0;
        }

        if (buttons[BUTTON_X].pressed) {
            state[Controls.BUTTON_X] = 1.0;
        }

        if (buttons[BUTTON_Y].pressed) {
            state[Controls.BUTTON_Y] = 1.0;
        }

        // Shoulder Buttons

        if (buttons[BUTTON_L].pressed) {
            state[Controls.BUTTON_L] = 1.0;
        }

        if (buttons[BUTTON_R].pressed) {
            state[Controls.BUTTON_R] = 1.0;
        }

        // Menu buttons

        if (buttons[START].pressed) {
            state[Controls.START] = 1.0;
        }

        if (buttons[BACK].pressed) {
            state[Controls.OPTIONS] = 1.0;
        }

        if (buttons[HOME].pressed) {
            state[Controls.HOME] = 1.0;
        }

        // Stick Buttons

        if (buttons[LEFT_STICK].pressed) {
            state[Controls.LEFT_STICK] = 1.0;
        }

        if (buttons[RIGHT_STICK].pressed) {
            state[Controls.RIGHT_STICK] = 1.0;
        }

        // Direction Pad

        if (buttons[DIR_DOWN].pressed) {
            state[Controls.DIR_DOWN] = 1.0;
        } else if (buttons[DIR_UP].pressed) {
            state[Controls.DIR_UP] = 1.0;
        }

        if (buttons[DIR_RIGHT].pressed) {
            state[Controls.DIR_RIGHT] = 1.0;
        } else if (buttons[DIR_LEFT].pressed) {
            state[Controls.DIR_LEFT] = 1.0;
        }

        // Left Axis

        var value = Mathlib.deadzone(
            AXIS_DEAD_ZONE,
            axes[LEFT_AXIS_X],
            axes[LEFT_AXIS_Y]
        );

        if (value !== 0) {
            state[Controls.LEFT_AXIS_X] = axes[LEFT_AXIS_X];
            state[Controls.LEFT_AXIS_Y] = axes[LEFT_AXIS_Y];
        }

        // Right Axis

        value = Mathlib.deadzone(
            AXIS_DEAD_ZONE,
            axes[RIGHT_AXIS_X],
            axes[RIGHT_AXIS_Y]
        );

        if (value !== 0) {
            state[Controls.RIGHT_AXIS_X] = axes[RIGHT_AXIS_X];
            state[Controls.RIGHT_AXIS_Y] = axes[RIGHT_AXIS_Y];
        }

        // Triggers

        if (axes[RIGHT_TRIGGER] !== -1) {
            state[Controls.RIGHT_TRIGGER] = axes[RIGHT_TRIGGER];
        }

        if (axes[LEFT_TRIGGER] !== -1) {
            state[Controls.LEFT_TRIGGER] = axes[LEFT_TRIGGER];
        }

    }

}

function match(id) {
    for(var i = 0, l = ID_REGEX.length; i < l; i++) {
        if (ID_REGEX[i].test(id)) {
            return true;
        }
    }
    return false;
}

module.exports = {
    name: 'xinput',
    map: map,
    match: match
};
