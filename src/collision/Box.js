
class Box {

    constructor(id, prop) {
        this.id = id;
        this.prop = prop;
        this.x = 0.0;
        this.y = 0.0;
        this.width = 0;
        this.height = 0;
        this.right = 0.0;
        this.top = 0.0;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.right = this.width + x;
        this.top = this.height + y;
    }

    setSize(w, h) {
        this.width = w;
        this.height = h;
        this.right = this.x + w;
        this.top = this.y + h;
    }

}

Box.intersect = function(a, b) {
    return !(b.x > a.right || b.right < a.x ||
        b.top > a.y || b.y < a.top);
};

export default Box;