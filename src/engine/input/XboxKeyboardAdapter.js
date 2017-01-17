const Controls = require('./Controls');
const Keys = require('./Keys');

var BUTTON_A = Keys.B;
var BUTTON_B = Keys.H;
var BUTTON_X = Keys.G;
var BUTTON_Y = Keys.Y;
var BUTTON_L = Keys.T;
var BUTTON_R = Keys.U;
var BUTTON_OPTIONS = Keys.SHIFT;
var BUTTON_START = Keys.ENTER;
var LEFT_STICK = Keys.O;
var RIGHT_STICK = Keys.P;
var LEFT_AXIS_X_POS = Keys.D;
var LEFT_AXIS_X_NEG = Keys.A;
var LEFT_AXIS_Y_POS = Keys.W;
var LEFT_AXIS_Y_NEG = Keys.S;
var RIGHT_AXIS_X_POS = Keys.LEFT;
var RIGHT_AXIS_X_NEG = Keys.RIGHT;
var RIGHT_AXIS_Y_POS = Keys.UP;
var RIGHT_AXIS_Y_NEG = Keys.DOWN;
var DIRECTION_PAD_X_POS = Keys.L;
var DIRECTION_PAD_X_NEG = Keys.J;
var DIRECTION_PAD_Y_POS = Keys.I;
var DIRECTION_PAD_Y_NEG = Keys.K;
var LEFT_TRIGGER = null;
var RIGHT_TRIGGER = null;


function configureButtonMappings(map) {
    // set all vars
}

function sync(vpad, keyboard) {

    // Left Analog Y
    if (keyboard[LEFT_AXIS_Y_POS]) {
        vpad[Controls.LEFT_AXIS_Y] = 1.0;
    } else if (keyboard[LEFT_AXIS_Y_NEG]) {
        vpad[Controls.LEFT_AXIS_Y] = -1.0;
    }

    // Left Analog X
    if (keyboard[LEFT_AXIS_X_POS]) {
        vpad[Controls.LEFT_AXIS_X] = 1.0;
    } else if (keyboard[LEFT_AXIS_X_NEG]) {
        vpad[Controls.LEFT_AXIS_X] = -1.0;
    }

    // Right Analog Y
    if (keyboard[RIGHT_AXIS_Y_POS]) {
        vpad[Controls.RIGHT_AXIS_Y] = 1.0;
    } else if (keyboard[RIGHT_AXIS_Y_NEG]) {
        vpad[Controls.RIGHT_AXIS_Y] = -1.0;
    }

    // Right Analog X
    if (keyboard[RIGHT_AXIS_X_POS]) {
        vpad[Controls.RIGHT_AXIS_X] = 1.0;
    } else if (keyboard[RIGHT_AXIS_X_NEG]) {
        vpad[Controls.RIGHT_AXIS_X] = -1.0;
    }

    // Direction Pad X
    if (keyboard[DIRECTION_PAD_X_POS]) {
        vpad[Controls.DIRECTION_PAD_X] = 1.0;
    } else if (keyboard[DIRECTION_PAD_X_NEG]) {
        vpad[Controls.DIRECTION_PAD_X] = -1.0;
    }

    // Direction Pad Y
    if (keyboard[DIRECTION_PAD_Y_POS]) {
        vpad[Controls.DIRECTION_PAD_Y] = 1.0;
    } else if (keyboard[DIRECTION_PAD_Y_NEG]) {
        vpad[Controls.DIRECTION_PAD_Y] = -1.0;
    }

    // Face Buttons

    if (keyboard[BUTTON_A]) {
        vpad[Controls.BUTTON_A] = 1.0;
    }

    if (keyboard[BUTTON_X]) {
        vpad[Controls.BUTTON_X] = 1.0;
    }

    if (keyboard[BUTTON_B]) {
        vpad[Controls.BUTTON_B] = 1.0;
    }

    if (keyboard[BUTTON_Y]) {
        vpad[Controls.BUTTON_Y] = 1.0;
    }

    if (keyboard[BUTTON_START]) {
        vpad[Controls.BUTTON_START] = 1.0;
    }

    if (keyboard[BUTTON_OPTIONS]) {
        vpad[Controls.BUTTON_OPTIONS] = 1.0;
    }

    // Shoulder Buttons

    if (keyboard[BUTTON_R]) {
        vpad[Controls.R] = 1.0;
    }

    if (keyboard[BUTTON_L]) {
        vpad[Controls.L] = 1.0;
    }

    // Stick Buttons

    if (keyboard[RIGHT_STICK]) {
        vpad[Controls.RIGHT_STICK] = 1.0;
    }

    if (keyboard[LEFT_STICK]) {
        vpad[Controls.LEFT_STICK] = 1.0;
    }

    // Triggers

    if (keyboard[LEFT_TRIGGER]) {
        vpad[Controls.LEFT_TRIGGER] = 1.0;
    }

    if (keyboard[RIGHT_TRIGGER]) {
        vpad[Controls.RIGHT_TRIGGER] = 1.0;
    }
}

module.exports = {
    configureButtonMappings: configureButtonMappings,
    sync: sync
};
