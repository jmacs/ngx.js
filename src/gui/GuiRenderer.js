var MeshBuffer = require('../graphics/MeshBuffer');
var Renderer = require('../graphics/Renderer');
var GuiManager = require('./GuiManager');

class GuiRenderer extends Renderer {

    constructor(camera) {
        super();
        this.__camera = camera;
        this.__meshBuffer = MeshBuffer.createBuffer(0);
        // todo: don't hardcode gui here
        this.__screen = GuiManager.loadGui('assets/gui/sandbox_test_gui.xml');
    }

    draw() {
        var buffer = this.__meshBuffer;

        buffer.enable(
            this.__camera.worldMatrix,
            this.__camera.projectionMatrix
        );

        this.__drawOutline(this.__screen);

        buffer.flush();
    }

    __drawOutline(control) {
        var buffer = this.__meshBuffer;

        buffer.drawLine(
            control.left, control.top,
            control.right, control.top
        );

        buffer.drawLine(
            control.right, control.top,
            control.right, control.bottom
        );

        buffer.drawLine(
            control.right,control.bottom,
            control.left, control.bottom
        );

        buffer.drawLine(
            control.left, control.bottom,
            control.left, control.top
        );

        var children = control.children;
        for (var i = 0, l = children.length; i < l; i++) {
            var child = children[i];
            this.__drawOutline(child);
        }
    }

    dispose() {
        this.__meshBuffer = null;
        this.__camera = null;
    }

}

module.exports = GuiRenderer;
