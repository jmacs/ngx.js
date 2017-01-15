
class CollisionInfo {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.xaxis = false;
        this.yaxis = false;
        this.top = false;
        this.bottom = false;
        this.right = false;
        this.left = false;
        this.overlap = false;
    }

    setDepth(x, y) {
        this.x = x;
        this.y = y;

        var yaxis = Math.abs(x) > Math.abs(y);
        var xaxis = Math.abs(x) < Math.abs(y);

        this.top = yaxis && y > 0;
        this.bottom = yaxis && y < 0;
        this.right = xaxis && x < 0;
        this.left = xaxis && x > 0;
        this.yaxis = yaxis;
        this.xaxis = xaxis;
        this.overlap = yaxis || xaxis;
    }
}

module.exports = CollisionInfo;