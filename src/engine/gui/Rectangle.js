
class Rectangle {

    constructor(width, height, x, y) {
        this.x = x || 0.0;
        this.y = y || 0.0;
        this.width = width;
        this.height = height;
    }

    get aspect() {
        return this.width / this.height;
    }
}

module.exports = Rectangle;