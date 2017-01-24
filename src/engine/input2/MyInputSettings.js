const Enums = require('./Enums');

module.exports = {
    settings: {
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
    },
    groups: {
        player: 0,
        menu: 1,
    },
    actions: [
        {
            moveHorizontal: Enums.ActionType.AXIS,
            moveVertical: Enums.ActionType.AXIS,
            fire: Enums.ActionType.BUTTON,
            jump: Enums.ActionType.BUTTON,
        },
        {
            menuHorizontal: Enums.ActionType.BUTTON,
            menuVertical: Enums.ActionType.BUTTON,
            confirm: Enums.ActionType.BUTTON,
            cancel: Enums.ActionType.BUTTON
        }
    ],
    players: [
        {
            name: 'player1',
            controllerMap: [
                {
                    moveHorizontal: Enums.Controller.LEFT_AXIS_X,
                    moveVertical: Enums.Controller.LEFT_AXIS_Y,
                    fire: Enums.Controller.X,
                    jump: Enums.Controller.A
                },
                {
                    menuHorizontal: Enums.Controller.LEFT_AXIS_X,
                    menuVertical: Enums.Controller.LEFT_AXIS_Y,
                    confirm: Enums.Controller.A,
                    cancel: Enums.Controller.B
                }
            ]
        },
        {
            name: 'player2',
            controllerMap: [
                {
                    moveHorizontal: Enums.Controller.LEFT_AXIS_X,
                    moveVertical: Enums.Controller.LEFT_AXIS_Y,
                    fire: Enums.Controller.X,
                    jump: Enums.Controller.A
                },
                {
                    menuHorizontal: Enums.Controller.LEFT_AXIS_X,
                    menuVertical: Enums.Controller.LEFT_AXIS_Y,
                    confirm: Enums.Controller.A,
                    cancel: Enums.Controller.B
                }
            ]
        }
    ]
};


