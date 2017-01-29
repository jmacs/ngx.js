const Controller = require('../Enums').Controller;
const Mathlib = require('../../Mathlib');

const AXIS_DEAD_ZONE = 0.25;
const BUTTON_A = 0;
const BUTTON_B = 1;
const BUTTON_X = 2;
const BUTTON_Y = 3;
const LEFT_BUMPER = 4;
const RIGHT_BUMPER = 5;
const LEFT_STICK = 6;
const RIGHT_STICK = 7;
const MENU = 8;
const VIEW = 9;
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

module.exports = function(gamepad, controller) {
    var axes = gamepad.axes;
    var buttons = gamepad.buttons;
    var value,x,y;

    // Face Buttons

    controller.send(Controller.A, buttons[BUTTON_A].value);
    controller.send(Controller.B, buttons[BUTTON_B].value);
    controller.send(Controller.X, buttons[BUTTON_X].value);
    controller.send(Controller.Y, buttons[BUTTON_Y].value);

    // shoulders

    controller.send(Controller.L, buttons[LEFT_BUMPER].value);
    controller.send(Controller.R, buttons[RIGHT_BUMPER].value);

    // sticks

    controller.send(Controller.LEFT_STICK, buttons[LEFT_STICK].value);
    controller.send(Controller.RIGHT_STICK, buttons[RIGHT_STICK].value);

    // front

    controller.send(Controller.HOME, buttons[HOME].value);
    controller.send(Controller.START, buttons[MENU].value);
    controller.send(Controller.SELECT, buttons[VIEW].value);

    // Direction Pad

    controller.send(Controller.DIR_DOWN, buttons[DIR_DOWN].value);
    controller.send(Controller.DIR_UP, buttons[DIR_UP].value);
    controller.send(Controller.DIR_RIGHT, buttons[DIR_RIGHT].value);
    controller.send(Controller.DIR_LEFT, buttons[DIR_LEFT].value);

    // Left Axis

    x = axes[LEFT_AXIS_X];
    y = axes[LEFT_AXIS_Y];
    value = Mathlib.deadzone(AXIS_DEAD_ZONE, x, y);

    if (value) {
        controller.send(Controller.LEFT_AXIS_X, x);
        controller.send(Controller.LEFT_AXIS_Y, y);
    } else {
        controller.send(Controller.LEFT_AXIS_X, 0.0);
        controller.send(Controller.LEFT_AXIS_Y, 0.0);
    }

    // Right Axis

    x = axes[RIGHT_AXIS_X];
    y = axes[RIGHT_AXIS_Y];
    value = Mathlib.deadzone(AXIS_DEAD_ZONE, x, y);

    if (value) {
        controller.send(Controller.RIGHT_AXIS_X, x);
        controller.send(Controller.RIGHT_AXIS_Y, y);
    } else {
        controller.send(Controller.RIGHT_AXIS_X, 0.0);
        controller.send(Controller.RIGHT_AXIS_Y, 0.0);
    }

    // Triggers

    value = (axes[RIGHT_TRIGGER] - -1) * 0.5;
    controller.send(Controller.RIGHT_TRIGGER, value);

    value = (axes[LEFT_TRIGGER] - -1) * 0.5;
    controller.send(Controller.LEFT_TRIGGER, value);

};