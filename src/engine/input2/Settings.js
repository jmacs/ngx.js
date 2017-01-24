const Enums = require('./Enums');

module.exports = {
    gamepadAxisSensitivity: 1,
    gamepadAxisDeadzone: 0.25,
    digitalAxisSimulation: true,
    mouseAxisMode: Enums.MouseAxisMode.MOUSE_AXIS,
    buttonDoublePressTime: 30,
    buttonShortPressTime: 25,
    buttonShortPressExpiresTime: 0,
    buttonLongPressTime: 1000,
    buttonLongPressExpiresTime: 0,
    buttonDownBuffer: 0,
    maxGamepads: 2,
    gamepadScanEnabled: true,
    gamepadScanInterval: 1000,
    autoAssignmentEnabled: true
};