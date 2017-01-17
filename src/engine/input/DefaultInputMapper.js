const Controls = require('./Controls');
const Keyboard = require('./Keyboard');
const Gamepad = require('./Gamepad');

module.exports = function DefaultInputMapper(controller) {
    var keyboard = Keyboard.getState();
    var gamepad = Gamepad.getGamepad(controller.index);
    var config = controller.config;
    var state = controller.state;

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

        if (buttons[config.GP_BUTTON_START].pressed) {
            state[Controls.BUTTON_START] = 1.0;
        }

        if (buttons[config.GP_BUTTON_OPTIONS].pressed) {
            state[Controls.BUTTON_OPTIONS] = 1.0;
        }

        // Stick Buttons

        if (buttons[config.GP_LEFT_STICK].pressed) {
            state[Controls.LEFT_STICK] = 1.0;
        }

        if (buttons[config.GP_RIGHT_STICK].pressed) {
            state[Controls.RIGHT_STICK] = 1.0;
        }

        // Left Axis

        if (axes[config.GP_LEFT_AXIS_X] !== 0) {
            state[Controls.LEFT_AXIS_X] = axes[config.GP_LEFT_AXIS_X];
        }

        if (axes[config.GP_LEFT_AXIS_Y] !== 0) {
            state[Controls.LEFT_AXIS_Y] = axes[config.GP_LEFT_AXIS_Y];
        }

        // Right Axis

        if (axes[config.GP_RIGHT_AXIS_X] !== 0) {
            state[Controls.RIGHT_AXIS_X] = axes[config.GP_RIGHT_AXIS_X];
        }

        if (axes[config.GP_RIGHT_AXIS_Y] !== 0) {
            state[Controls.RIGHT_AXIS_Y] = axes[config.GP_RIGHT_AXIS_Y];
        }

        // Direction Pad

        if (axes[config.GP_DIRECTION_PAD_X] !== 0) {
            state[Controls.DIRECTION_PAD_X] = axes[config.GP_DIRECTION_PAD_X];
        }

        if (axes[config.GP_DIRECTION_PAD_Y] !== 0) {
            state[Controls.DIRECTION_PAD_Y] = axes[config.GP_DIRECTION_PAD_Y];
        }

        // Triggers

        if (axes[config.GP_RIGHT_TRIGGER] !== 0) {
            state[Controls.RIGHT_TRIGGER] = axes[config.GP_RIGHT_TRIGGER];
        }

        if (axes[config.GP_LEFT_TRIGGER] !== 0) {
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
            state[Controls.RIGHT_AXIS_X] = -1.0;
        }

        // Direction Pad X
        if (keyboard[config.KB_DIRECTION_PAD_X_POS]) {
            state[Controls.DIRECTION_PAD_X] = 1.0;
        } else if (keyboard[config.KB_DIRECTION_PAD_X_NEG]) {
            state[Controls.DIRECTION_PAD_X] = -1.0;
        }

        // Direction Pad Y
        if (keyboard[config.KB_DIRECTION_PAD_Y_POS]) {
            state[Controls.DIRECTION_PAD_Y] = 1.0;
        } else if (keyboard[config.KB_DIRECTION_PAD_Y_NEG]) {
            state[Controls.DIRECTION_PAD_Y] = -1.0;
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

        if (keyboard[config.KB_BUTTON_START]) {
            state[Controls.BUTTON_START] = 1.0;
        }

        if (keyboard[config.KB_BUTTON_OPTIONS]) {
            state[Controls.BUTTON_OPTIONS] = 1.0;
        }

        // Shoulder Buttons

        if (keyboard[config.KB_BUTTON_R]) {
            state[Controls.R] = 1.0;
        }

        if (keyboard[config.KB_BUTTON_L]) {
            state[Controls.L] = 1.0;
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
