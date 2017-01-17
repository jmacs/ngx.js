const Controls = require('./Controls');

function configureButtonMappings() {

}

function sync(vpad, gamepad) {
    var buttons = gamepad.buttons;

    // A
    if (buttons[0].pressed) {
        vpad[0] = 1.0;
    }

    // B
    if (buttons[1].pressed) {
        vpad[1] = 1.0;
    }

}

module.exports = {
    configureButtonMappings: configureButtonMappings,
    sync: sync
};
