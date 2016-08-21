var Control = require('./../../gui/Control');

class Button extends Control {

    constructor() {
        super();
        this.__onClick = null;
    }

    readXml(node) {
        super.readXml(node);
        this.__onClick = node.getAttribute('onClick') || null;
    }

}

module.exports = Button;
