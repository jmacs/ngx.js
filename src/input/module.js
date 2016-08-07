var GameClock = require('../core/GameClock');
var InputManager = require('./InputManager');
var KeyboardDevice = require('./KeyboardDevice');
var MouseDevice = require('./MouseDevice');
var GamepadDevice = require('./GamepadDevice');

GameClock.addEventListener('GameClockLoaded', function() {
    InputManager.registerDevice(KeyboardDevice);
    InputManager.registerDevice(MouseDevice);
    InputManager.registerDevice(GamepadDevice);
});