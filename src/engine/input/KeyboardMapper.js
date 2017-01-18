const Controls = require('./Controls');
const Keyboard = require('./Keyboard');
const Gamepad = require('./Gamepad');

// Xbox One Wired Controller

const BUTTON_A = 0;
const BUTTON_B = 1;
const BUTTON_X = 2;
const BUTTON_Y = 3;
const BUTTON_L = 4;
const BUTTON_R = 5;
const LEFT_STICK = 6;
const RIGHT_STICK = 7;
const START = 8;
const OPTIONS = 9;
const HOME = 10;
const DIR_UP = 11;
const DIR_DOWN = 12;
const DIR_LEFT = 14;
const DIR_RIGHT = 13;
const AXIS_DEAD_ZONE = 0.25;
const LEFT_AXIS_X = 0;
const LEFT_AXIS_Y = 1;
const RIGHT_AXIS_X = 3;
const RIGHT_AXIS_Y = 4;
const LEFT_TRIGGER = 2;
const RIGHT_TRIGGER = 5;

module.exports = function DefaultInputMapper(controller) {
    var keyboard = Keyboard.getState();
    var gamepad = Gamepad.getGamepad(controller.index);
    var config = controller.config;
    var state = controller.state;

    controller.clear();

    // Gamepad

    if (config.ENABLE_GAMEPAD && gamepad) {

        var axes = gamepad.axes;
        var buttons = gamepad.buttons;

        // Face Buttons

        if (buttons[config.GP_BUTTON_A].pressed) {
            state[Controls.BUTTON_A] = 1.0;
        }

        if (buttons[config.GP_BUTTON_B].pressed) {
            state[Controls.BUTTON_B] = 1.0;
        }

        if (buttons[config.GP_BUTTON_X].pressed) {
            state[Controls.BUTTON_X] = 1.0;
        }

        if (buttons[config.GP_BUTTON_Y].pressed) {
            state[Controls.BUTTON_Y] = 1.0;
        }

        // Shoulder Buttons

        if (buttons[config.GP_BUTTON_L].pressed) {
            state[Controls.BUTTON_L] = 1.0;
        }

        if (buttons[config.GP_BUTTON_R].pressed) {
            state[Controls.BUTTON_R] = 1.0;
        }

        // Menu buttons

        if (buttons[config.GP_START].pressed) {
            state[Controls.START] = 1.0;
        }

        if (buttons[config.GP_OPTIONS].pressed) {
            state[Controls.OPTIONS] = 1.0;
        }

        if (buttons[config.GP_HOME].pressed) {
            state[Controls.HOME] = 1.0;
        }

        // Stick Buttons

        if (buttons[config.GP_LEFT_STICK].pressed) {
            state[Controls.LEFT_STICK] = 1.0;
        }

        if (buttons[config.GP_RIGHT_STICK].pressed) {
            state[Controls.RIGHT_STICK] = 1.0;
        }

        // Direction Pad

        if (buttons[config.GP_DIR_DOWN].pressed) {
            state[Controls.DIR_DOWN] = 1.0;
        } else if (buttons[config.GP_DIR_UP].pressed) {
            state[Controls.DIR_UP] = 1.0;
        }

        if (buttons[config.GP_DIR_RIGHT].pressed) {
            state[Controls.DIR_RIGHT] = 1.0;
        } else if (buttons[config.GP_DIR_LEFT].pressed) {
            state[Controls.DIR_LEFT] = 1.0;
        }

        // Left Axis

        var value = clipDeadzone(
            config.GP_AXIS_DEAD_ZONE,
            axes[config.GP_LEFT_AXIS_X],
            axes[config.GP_LEFT_AXIS_Y]
        );

        if (value !== 0) {
            state[Controls.LEFT_AXIS_X] = axes[config.GP_LEFT_AXIS_X];
            state[Controls.LEFT_AXIS_Y] = axes[config.GP_LEFT_AXIS_Y];
        }

        // Right Axis

        value = clipDeadzone(
            config.GP_AXIS_DEAD_ZONE,
            axes[config.GP_RIGHT_AXIS_X],
            axes[config.GP_RIGHT_AXIS_Y]
        );

        if (value !== 0) {
            state[Controls.RIGHT_AXIS_X] = axes[config.GP_RIGHT_AXIS_X];
            state[Controls.RIGHT_AXIS_Y] = axes[config.GP_RIGHT_AXIS_Y];
        }

        // Triggers

        if (axes[config.GP_RIGHT_TRIGGER] !== -1) {
            state[Controls.RIGHT_TRIGGER] = axes[config.GP_RIGHT_TRIGGER];
        }

        if (axes[config.GP_LEFT_TRIGGER] !== -1) {
            state[Controls.LEFT_TRIGGER] = axes[config.GP_LEFT_TRIGGER];
        }

    }

    // End Gamepad


    // Keyboard

    if (config.ENABLE_KEYBOARD) {

        // Left Analog Y
        if (keyboard[config.KB_LEFT_AXIS_Y_POS]) {
            state[Controls.LEFT_AXIS_Y] = 1.0;
        } else if (keyboard[config.KB_LEFT_AXIS_Y_NEG]) {
            state[Controls.LEFT_AXIS_Y] = -1.0;
        }

        // Left Analog X
        if (keyboard[config.KB_LEFT_AXIS_X_POS]) {
            state[Controls.LEFT_AXIS_X] = 1.0;
        } else if (keyboard[config.KB_LEFT_AXIS_X_NEG]) {
            state[Controls.LEFT_AXIS_X] = -1.0;
        }

        // Right Analog Y
        if (keyboard[config.KB_RIGHT_AXIS_Y_POS]) {
            state[Controls.RIGHT_AXIS_Y] = 1.0;
        } else if (keyboard[config.KB_RIGHT_AXIS_Y_NEG]) {
            state[Controls.RIGHT_AXIS_Y] = -1.0;
        }

        // Right Analog X
        if (keyboard[config.KB_RIGHT_AXIS_X_POS]) {
            state[Controls.RIGHT_AXIS_X] = 1.0;
        } else if (keyboard[config.KB_RIGHT_AXIS_X_NEG]) {
            state[Controls.RIGHT_AXIS_X] = 1.0;
        }

        // Directional Pad

        if (keyboard[config.KB_DIR_RIGHT_POS]) {
            state[Controls.DIR_RIGHT] = 1.0;
        } else if (keyboard[config.KB_DIR_LEFT]) {
            state[Controls.DIR_LEFT] = 1.0;
        }

        if (keyboard[config.KB_DIR_UP]) {
            state[Controls.DIR_UP] = 1.0;
        } else if (keyboard[config.KB_DIR_DOWN]) {
            state[Controls.DIR_DOWN] = 1.0;
        }

        // Face Buttons

        if (keyboard[config.KB_BUTTON_A]) {
            state[Controls.BUTTON_A] = 1.0;
        }

        if (keyboard[config.KB_BUTTON_X]) {
            state[Controls.BUTTON_X] = 1.0;
        }

        if (keyboard[config.KB_BUTTON_B]) {
            state[Controls.BUTTON_B] = 1.0;
        }

        if (keyboard[config.KB_BUTTON_Y]) {
            state[Controls.BUTTON_Y] = 1.0;
        }

        // Menu Buttons

        if (keyboard[config.KB_START]) {
            state[Controls.START] = 1.0;
        }

        if (keyboard[config.KB_OPTIONS]) {
            state[Controls.OPTIONS] = 1.0;
        }

        if (keyboard[config.KB_HOME]) {
            state[Controls.HOME] = 1.0;
        }

        // Shoulder Buttons

        if (keyboard[config.KB_BUTTON_R]) {
            state[Controls.BUTTON_R] = 1.0;
        }

        if (keyboard[config.KB_BUTTON_L]) {
            state[Controls.BUTTON_L] = 1.0;
        }

        // Stick Buttons

        if (keyboard[config.KB_RIGHT_STICK]) {
            state[Controls.RIGHT_STICK] = 1.0;
        }

        if (keyboard[config.KB_LEFT_STICK]) {
            state[Controls.LEFT_STICK] = 1.0;
        }

        // Triggers

        if (keyboard[config.KB_LEFT_TRIGGER]) {
            state[Controls.LEFT_TRIGGER] = 1.0;
        }

        if (keyboard[config.KB_RIGHT_TRIGGER]) {
            state[Controls.RIGHT_TRIGGER] = 1.0;
        }

    }

    // End Keyboard

};

function clipDeadzone(threshold, x, y) {
    var dist = Math.sqrt(x * x + y * y);
    if (dist < threshold) return 0.0;
}
