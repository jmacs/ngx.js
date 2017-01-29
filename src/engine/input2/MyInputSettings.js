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
    players: [
        {
            name: 'Player1',
            controllerMap: 0
        },
        {
            name: 'Player2',
            controllerMap: 0
        }
    ],
    contexts: [
        'character',
        'menu'
    ],
    actions: [
        {
            index: 0,
            context: 0,
            name: 'moveHorizontal',
            description: 'Move Character Horizontally',
            type: Enums.ActionType.AXIS
        },
        {
            index: 1,
            context: 0,
            name: 'moveVertical',
            description: 'Move Character Vertically',
            type: Enums.ActionType.AXIS
        },
        {
            index: 2,
            context: 0,
            name: 'attack',
            description: 'Attack',
            type: Enums.ActionType.BUTTON
        },
        {
            index: 3,
            context: 0,
            name: 'run',
            description: 'Run or Activate',
            type: Enums.ActionType.BUTTON
        },
        {
            index: 4,
            context: 0,
            name: 'roll',
            description: 'Roll',
            type: Enums.ActionType.BUTTON
        },
        {
            index: 5,
            context: 1,
            name: 'menuHorizontal',
            description: 'Menu Select Horizontal',
            type: Enums.ActionType.BUTTON
        },
        {
            index: 6,
            context: 1,
            name: 'menuVertical',
            description: 'Menu Select Vertical',
            type: Enums.ActionType.BUTTON
        },
        {
            index: 7,
            context: 1,
            name: 'menuConfirm',
            description: 'Menu Confirm',
            type: Enums.ActionType.BUTTON
        },
        {
            index: 8,
            context: 1,
            name: 'menuCancel',
            type: Enums.ActionType.BUTTON
        }
    ],
    controllerMaps: [
        {
            name: 'DefaultControls',
            mappings: [
                {
                    action: 0, // moveHorizontal
                    element: Enums.Controller.LEFT_AXIS_X
                },
                {
                    action: 1, // moveVertical
                    element: Enums.Controller.LEFT_AXIS_Y
                },
                {
                    action: 2, // attack
                    element: Enums.Controller.X
                },
                {
                    action: 3, // run or activate
                    element: Enums.Controller.A
                },
                {
                    action: 4, // roll
                    element: Enums.Controller.R
                },
                {
                    action: 5, // menuHorizontal
                    element: Enums.Controller.LEFT_AXIS_X
                },
                {
                    action: 6, // menuVertical
                    element: Enums.Controller.LEFT_AXIS_Y
                },
                {
                    action: 7, // menuConfirm
                    element: Enums.Controller.A
                },
                {
                    action: 8, // menuCancel
                    element: Enums.Controller.B
                }
            ]
        }
    ]
};


