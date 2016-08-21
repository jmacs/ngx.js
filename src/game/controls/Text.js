var Control = require('./../../gui/Control');
var Glyphic = require('./../../graphics/Glyphic');

class Text extends Control {

    constructor() {
        super();
        this.__glyphic = null;
        this.__glyphHeightPx = 16;
        this.__glyphWidthPx = 16;
    }

    readXml(node) {
        super.readXml(node);
        var glyphLength = node.getAttribute('glyphLength') || null;
        this.__glyphWidthPx = parseInt(node.getAttribute('glyphWidth')) || 16;
        this.__glyphHeightPx = parseInt(node.getAttribute('glyphHeight')) || 16;
        this.__glyphic = new Glyphic(glyphLength);
    }

    destroy() {
        this.__glyphic = null;
    }
}

module.exports = Text;
