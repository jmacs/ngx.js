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

    if (gamepad) {

        var axes = gamepad.axes;
        var buttons = gamepad.buttons;

        // Face Buttons

        state[Controls.BUTTON_A] = buttons[BUTTON_A].value;
        state[Controls.BUTTON_B] = buttons[BUTTON_B].value;
        state[Controls.BUTTON_X] = buttons[BUTTON_X].value;
        state[Controls.BUTTON_Y] = buttons[BUTTON_Y].value;

        // Shoulder Buttons

        state[Controls.BUTTON_L] = buttons[BUTTON_L].value;
        state[Controls.BUTTON_R] = buttons[BUTTON_R].value;

        // Menu buttons

        state[Controls.START] = buttons[START].value;
        state[Controls.OPTIONS] = buttons[BACK].value;
        state[Controls.HOME] = buttons[HOME].value;

        // Stick Buttons

        state[Controls.LEFT_STICK] = buttons[LEFT_STICK].value;
        state[Controls.RIGHT_STICK] = buttons[RIGHT_STICK].value;

        // Direction Pad

        state[Controls.DIR_DOWN] = buttons[DIR_DOWN].value;
        state[Controls.DIR_UP] = buttons[DIR_UP].value;
        state[Controls.DIR_RIGHT] = buttons[DIR_RIGHT].value;
        state[Controls.DIR_LEFT] = buttons[DIR_LEFT].value;

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
            state[Controls.RIGHT_TRIGGER] = normalizeTrigger(axes[RIGHT_TRIGGER]);
        }

        if (axes[LEFT_TRIGGER] !== -1) {
            state[Controls.LEFT_TRIGGER] = normalizeTrigger(axes[LEFT_TRIGGER]);
        }

    }

}

function normalizeTrigger(num) {
    // normalizes (-1,1) to (0,1)
    return (num - -1) * 0.5;
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
