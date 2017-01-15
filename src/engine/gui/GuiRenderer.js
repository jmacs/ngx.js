var MeshBuffer = require('./MeshBuffer');
var SpriteBuffer = require('./SpriteBuffer');
var Renderer = require('./Renderer');
var GuiManager = require('./GuiManager');
var Glyphic = require('./Glyphic');

class GuiRenderer extends Renderer {

    constructor(camera) {
        super();
        this.__camera = camera;
        this.__spriteBuffer = SpriteBuffer.createBuffer(0);
        this.__meshBuffer = MeshBuffer.createBuffer(0);
        this.__temp = new Glyphic('bisasam', 9);
        this.__temp.setString('gui debug');
        this.__temp.setPosition(10, 400);
        this.__temp.setColor(1,1,1,0);
        // todo: don't hardcode gui here
        this.__screen = GuiManager.loadGui('assets/gui/sandbox_test_gui.xml');
    }

    draw() {
        var mbuffer = this.__meshBuffer;

        mbuffer.enable(
            this.__camera.worldMatrix,
            this.__camera.projectionMatrix
        );

        this.__drawOutline(this.__screen);

        mbuffer.flush();

        var sbuffer = this.__spriteBuffer;

        sbuffer.enable(
            this.__camera.worldMatrix,
            this.__camera.projectionMatrix
        );

        this.__temp.draw(sbuffer);

        sbuffer.flush();
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
