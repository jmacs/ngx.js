var _enabled = false;
var _keyboard = [];

function enable(shouldEnable) {
    if (!_enabled && shouldEnable) {
        _enabled = true;
        window.addEventListener('keydown', onKeyDown, false);
        window.addEventListener('keyup', onKeyUp, false);
    } else {
        _enabled = false;
        window.removeEventListener('keydown', onKeyDown, false);
        window.removeEventListener('keyup', onKeyUp, false);
    }
}

function onKeyDown(e) {
    _keyboard[e.keyCode] = true;
}

function onKeyUp(e) {
    _keyboard[e.keyCode] = false;
}

function getState() {
    return _keyboard;
}

module.exports = {
    getState: getState,
    enable: enable
};
