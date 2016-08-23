var GuiManager = require('../../gui/GuiManager');
var MeshBuffer = require('../../graphics/MeshBuffer');
var Viewport = require('../../graphics/Viewport');

var _screen;
var _meshBuffer;

function onSceneLoad(scene) {
    scene.getCompositor().addLayer(300, drawSandboxGui);
    console.debug('Creating Sandbox GUI');
    _meshBuffer = MeshBuffer.createBuffer(0);
    _screen = GuiManager.loadGui('assets/gui/sandbox_test_gui.xml');
}

function onOkButtonClicked() {
    console.debug('Ok button was clicked!');
}

function onSceneUnload() {
    console.debug('Creating Sandbox GUI');
}

function drawSandboxGui() {
    _meshBuffer.enable(
        Viewport.getIdentityMatrix(),
        Viewport.getScreenMatrix()
    );

    drawOutline(_screen);

    _meshBuffer.flush();
}

function drawOutline(control) {

    _meshBuffer.drawLine(
        control.left, control.top,
        control.right, control.top
    );

    _meshBuffer.drawLine(
        control.right, control.top,
        control.right, control.bottom
    );

    _meshBuffer.drawLine(
        control.right,control.bottom,
        control.left, control.bottom
    );

    _meshBuffer.drawLine(
        control.left, control.bottom,
        control.left, control.top
    );

    var children = control.children;
    for (var i = 0, l = children.length; i < l; i++) {
        var child = children[i];
        drawOutline(child);
    }
}

module.exports = {
    name: 'SandboxGui',
    SceneLoad: onSceneLoad,
    onSceneUnload: onSceneUnload,
    onOkButtonClicked: onOkButtonClicked
};
