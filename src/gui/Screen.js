var Control = require('./Control');

class Screen extends Control {

    setViewportSize(width, height) {
        this.__aspectWidth = 1;
        this.__aspectHeight = 1;
        this.__width = width;
        this.__height = height;
        this.__dirty = true;
    }

    update() {
        if (this.__dirty) {
            for (var i = 0, l = this.__children.length; i < l; i++) {
                this.__children[i].update();
            }
            this.__dirty = false;
        }
    }

}

module.exports = Screen;
