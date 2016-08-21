var GuiManager = require('../../gui/GuiManager');

function onSceneLoad() {
    console.debug('Creating Sandbox GUI');
    GuiManager.loadGui('assets/gui/sandbox_test_gui.xml');
}

function onOkButtonClicked() {
    console.debug('Ok button was clicked!');
}

function onSceneUnload() {
    console.debug('Creating Sandbox GUI');
}

module.exports = {
    name: 'SandboxGui',
    SceneLoad: onSceneLoad,
    onSceneUnload: onSceneUnload,
    onOkButtonClicked: onOkButtonClicked
};
