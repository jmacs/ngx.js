
class Cell {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.occupied = false;
        this.position = [0,0];
        this.tile0 = null;
        this.tile1 = null;
        this.material = 0;
    }

    empty() {
        this.nil = true;
        this.material = 0;
        this.tile0 = null;
        this.tile1 = null;
    }
}

module.exports = Cell;