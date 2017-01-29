const Controller = require('../Enums').Controller;
const Mathlib = require('../../Mathlib');

const AXIS_DEAD_ZONE = 0.25;
const SQUARE = 0;
const CROSS = 1;
const CIRCLE = 2;
const TRIANGLE = 3;
const L1 = 4;
const R1 = 5;
const SHARE = 8;
const OPTIONS = 9;
const L3 = 10;
const R3 = 11;
const HOME = 12;
const TOUCH_PAD = 13;
const LEFT_AXIS_X = 0;
const LEFT_AXIS_Y = 1;
const RIGHT_AXIS_X = 2;
const RIGHT_AXIS_Y = 5;
const L2 = 3;
const R2 = 4;
const DIRECTION = 9;

module.exports = function(gamepad, controller) {
    var axes = gamepad.axes;
    var buttons = gamepad.buttons;
    var value,x,y;

    // Face Buttons

    controller.send(Controller.A, buttons[CROSS].value);
    controller.send(Controller.B, buttons[CIRCLE].value);
    controller.send(Controller.X, buttons[SQUARE].value);
    controller.send(Controller.Y, buttons[TRIANGLE].value);

    // shoulders

    controller.send(Controller.L, buttons[L1].value);
    controller.send(Controller.R, buttons[R1].value);

    // sticks

    controller.send(Controller.LEFT_STICK, buttons[L3].value);
    controller.send(Controller.RIGHT_STICK, buttons[R3].value);

    // front

    controller.send(Controller.HOME, buttons[HOME].value);
    controller.send(Controller.START, buttons[TOUCH_PAD].value);
    controller.send(Controller.SELECT, buttons[OPTIONS].value);

    // Direction Pad

    value = Math.abs(axes[DIRECTION]);
    if (value <= 1 && value !== 0) {
        if (value === 1) {
            // up
        } else if (value > 0.5) {
            // left
        } else if (value > 0.2) {
            // right
        } else {
            // down
        }
    }

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

    value = (axes[R2] - -1) * 0.5;
    controller.send(Controller.RIGHT_TRIGGER, value);

    value = (axes[L2] - -1) * 0.5;
    controller.send(Controller.LEFT_TRIGGER, value);

};