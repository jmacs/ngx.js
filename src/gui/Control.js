var _identity = 0;

class Control {

    constructor() {
        this.__id = ++_identity;
        this.__parent = null;
        this.__origin = 0;
        this.__offsetX = 0;
        this.__offsetY = 0;
        this.__x = 0;
        this.__y = 0;
        this.__z = 0;
        this.__aspectWidth = 0.0;
        this.__aspectHeight = 0.0;
        this.__width = 0;
        this.__height = 0;
        this.__children = [];
        this.__dirty = true;
    }

    get id() {
        return this.__id;
    }

    get children() {
        return this.__children;
    }

    get x() {
        return this.__x;
    }

    get y() {
        return this.__y;
    }

    get z() {
        return this.__z;
    }

    get width() {
        return this.__width;
    }

    get height() {
        return this.__height;
    }

    get center() {
        return this.__width * 0.5;
    }

    get top() {
        return this.__y;
    }

    get bottom() {
        return this.__y + this.__height;
    }

    get left() {
        return this.__x;
    }

    get right() {
        return this.__x + this.__width;
    }

    get middle() {
        return this.__height * 0.5;
    }

    get parent() {
        return this.__parent;
    }

    setParent(value) {
        if (value instanceof Control) {
            this.__parent = value;
            this.invalidate();
            return;
        }
        throw new Error('Parent must be an instance of Control');
    }

    setOrigin(value) {
        this.__origin = value || 0;
        this.invalidate();
    }

    setAspect(width, height) {
        this.__aspectWidth = width;
        this.__aspectHeight = height;
        this.invalidate();
    }

    setOffset(x, y) {
        this.__offsetX = ~~x;
        this.__offsetY = ~~y;
        this.invalidate();
    }

    invalidate() {
        this.__dirty = true;
        if (this.parent) {
            this.parent.invalidate();
        }
    }

    addControl(control) {
        if (!(control instanceof Control)) {
            throw new Error('Child control must be an instance of Control');
        }
        control.setParent(this);
        this.__children.push(control);
        this.invalidate();
    }

    clear() {
        for (var i = 0, l = this.__children.length; i < l; i++) {
            var child = this.__children[i];
            child.destroy();
        }
        this.__children.length = 0;
        this.__dirty = true;
    }

    remove() {
        if (!this.__parent) return;
        var index = this.__parent.__children.indexOf(this);
        if (index === -1) return;
        this.destroy();
        this.__parent.__children.removeAt(index);
        this.invalidate();
    }

    update() {
        var parent = this.__parent;
        if (!parent || !this.__dirty) return;

        // get the dimensions using the aspect relative to the parent
        var width = this.__aspectWidth * parent.width;
        var height = this.__aspectHeight * parent.height;

        // set the x,y position based on the origin
        switch (this.__origin) {

            // TopCenter
            case 1:
                this.__x = parent.center - (width * 0.5);
                this.__y = parent.top;
                break;

            // TopRight
            case 2:
                this.__x = parent.right - width;
                this.__y = parent.top;
                break;

            // MiddleLeft
            case 3:
                this.__x = parent.left;
                this.__y = parent.middle - height * 0.5;
                break;

            // MiddleCenter
            case 4:
                this.__x = parent.center - width * 0.5;
                this.__y = parent.middle - height * 0.5;
                break;

            // MiddleRight
            case 5:
                this.__x = parent.right - width;
                this.__y = parent.middle - height * 0.5;
                break;

            // BottomLeft
            case 6:
                this.__x = parent.left;
                this.__y = parent.bottom - height;
                break;

            // BottomCenter
            case 7:
                this.__x = parent.center - width * 0.5;
                this.__y = parent.bottom - height;
                break;

            // BottomRight
            case 8:
                this.__x = parent.right - width;
                this.__y = parent.bottom - height;
                break;

            // TopLeft
            default:
                this.__x = parent.left;
                this.__y = parent.top;
                break;
        }

        this.__width = ~~width;
        this.__height = ~~height;
        this.__x = ~~(this.__x + this.__offsetX);
        this.__y = ~~(this.__y + this.__offsetY);

        for (var i = 0, l = this.__children.length; i < l; i++) {
            this.__children[i].update();
        }

        this.__dirty = false;
    }

    readXml(node) {
        this.__aspectWidth = parseFloat(node.getAttribute('width')) || 0;
        this.__aspectHeight = parseFloat(node.getAttribute('height')) || 0;
        this.__offsetX = parseFloat(node.getAttribute('x')) || 0;
        this.__offsetY = parseFloat(node.getAttribute('y')) || 0;
        this.__origin = Control.stringToOrigin(node.getAttribute('origin'));
        this.invalidate();
    }

    destroy() {
        // template function
    }
}

Control.stringToOrigin = function(value) {
    switch (value) {
        case 'TopCenter':
            return 1;
        case 'TopRight':
            return 2;
        case 'MiddleLeft':
            return 3;
        case 'MiddleCenter':
            return 4;
        case 'MiddleRight':
            return 5;
        case 'BottomLeft':
            return 6;
        case 'BottomCenter':
            return 7;
        case 'BottomRight':
            return 8;
        default: // TopLeft
            return 0;
    }
};

module.exports = Control;