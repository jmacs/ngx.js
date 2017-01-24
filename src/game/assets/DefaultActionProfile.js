const Keys = require('../../engine/input/Keys');
const keyboard = Keys.keyboard;
const gamepad = Keys.gamepad;

module.exports = [
    {
        name: 'Player',
        actions: [
            {
                action: 'Jump',
                keyboard: keyboard.SPACE,
                gamepad: gamepad.A,
                mouse: null,
                onPress: true
            },
            {
                action: 'Fire',
                keyboard: keyboard.CTRL,
                gamepad: gamepad.X,
                mouse: null,
                onPress: true
            },
            {
                action: 'MoveHorizontal',
                keyboard: keyboard.RIGHT,
                gamepad: gamepad.AXIS_LEFT_X,
                onPress: true
            },
            {
                action: 'MoveHorizontal',
                keyboard: keyboard.LEFT,
                gamepad: gamepad.AXIS_LEFT_Y,
                onPress: true
            }
        ]
    }
];
