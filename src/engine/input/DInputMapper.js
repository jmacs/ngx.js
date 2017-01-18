const Mathlib = require('../Mathlib');
const Controls = require('./Controls');
const Gamepad = require('./Gamepad');

const ID_REGEX = [
    new RegExp('054c') // DualShock 4
];

const AXIS_DEAD_ZONE = 0.25;
const CROSS = 1;
const SQUARE = 0;
const CIRCLE = 2;
const TRIANGLE = 3;
const L1 = 4;
const R1 = 5;
const SHARE = 8;
const OPTIONS = 9;
const LEFT_STICK = 10;
const RIGHT_STICK = 11;
const HOME = 12;
const TOUCH_PAD = 13;
const LEFT_AXIS_X = 0;
const LEFT_AXIS_Y = 1;
const RIGHT_AXIS_X = 2;
const RIGHT_AXIS_Y = 5;
const L2 = 3;
const R2 = 4;
const DIRECTION = 9;

function map(controller) {
    var gamepad = Gamepad.getGamepad(controller.index);
    var state = controller.state;

    controller.clear();

    // Gamepad

    if (gamepad) {

        var axes = gamepad.axes;
        var buttons = gamepad.buttons;

        // Face Buttons

        if (buttons[CROSS].pressed) {
            state[Controls.BUTTON_A] = 1.0;
        }

        if (buttons[CIRCLE].pressed) {
            state[Controls.BUTTON_B] = 1.0;
        }

        if (buttons[SQUARE].pressed) {
            state[Controls.BUTTON_X] = 1.0;
        }

        if (buttons[TRIANGLE].pressed) {
            state[Controls.BUTTON_Y] = 1.0;
        }

        // Shoulder Buttons

        if (buttons[L1].pressed) {
            state[Controls.BUTTON_L] = 1.0;
        }

        if (buttons[R1].pressed) {
            state[Controls.BUTTON_R] = 1.0;
        }

        // Menu buttons

        if (buttons[OPTIONS].pressed) {
            state[Controls.START] = 1.0;
        }

        if (buttons[TOUCH_PAD].pressed) {
            state[Controls.OPTIONS] = 1.0;
        }

        if (buttons[HOME].pressed) {
            state[Controls.HOME] = 1.0;
        }

        if (buttons[SHARE].pressed) {
            state[Controls.MEDIA] = 1.0
        }

        // Stick Buttons

        if (buttons[LEFT_STICK].pressed) {
            state[Controls.LEFT_STICK] = 1.0;
        }

        if (buttons[RIGHT_STICK].pressed) {
            state[Controls.RIGHT_STICK] = 1.0;
        }

        // Direction Pad

        var value = Math.abs(axes[DIRECTION]);
        if (value <= 1 && value !== 0) {
            if (value === 1) {
                state[Controls.DIR_UP] = 1.0;
            } else if (value > 0.5) {
                state[Controls.DIR_LEFT] = 1.0;
            } else if (value > 0.2) {
                state[Controls.DIR_RIGHT] = 1.0;
            } else {
                state[Controls.DIR_DOWN] = 1.0;
            }
        }

        // Left Axis

        value = Mathlib.deadzone(
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

        if (axes[R2] !== -1) {
            state[Controls.RIGHT_TRIGGER] = axes[R2];
        }

        if (axes[L2] !== -1) {
            state[Controls.LEFT_TRIGGER] = axes[L2];
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
    name: 'dinput',
    map: map,
    match: match
};
