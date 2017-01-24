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

function map(controller) {
    var keyboard = Keyboard.getState();
    var config = controller.config;
    var state = controller.state;

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

