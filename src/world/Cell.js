
class Cell {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.void = true;
        this.layers = [];
        this.material = 0;
        this.position = [0,0];
    }

    empty() {
        this.void = true;
        this.layers.length = 0;
        this.material = 0;
    }
}

export default Cell;