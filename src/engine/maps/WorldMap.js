var ResourceManager = require('./ResourceManager');
var Cell = require('./Cell');

const CELL_SIZE = 16;
const CELL_SHIFT = 4; // Math.pow(2, 4)

class WorldMap {

    constructor(id, width, height) {
        this.entities = null;
        this.scripts = null;
        this.backgroundColor = 0x0;
        this.__id = id;
        this.__width = width;
        this.__height = height;
        var cells = [];

        for (var x = 0; x < width; x++) {
            var column = [];
            for (var y = 0; y < height; y++) {
                var cell = new Cell();
                cell.position[0] = x * CELL_SIZE;
                cell.position[1] = y * CELL_SIZE;
                cell.x = x;
                cell.y = y;
                column.push(cell);
            }
            cells[x] = column;
        }

        this.__cells = cells;
    }

    get id() {
        return this.__id;
    }

    get boundsX() {
        return this.__width * CELL_SIZE;
    }

    get boundsY() {
        return this.__height * CELL_SIZE;
    }

    getCell(x, y) {
        return this.__cells[x][y];
    }

    selectCells(min, max, callback, self) {
        var minX = min[0] >> CELL_SHIFT;
        var minY = min[1] >> CELL_SHIFT;
        var maxX = Math.min(this.__width-1, max[0] >> CELL_SHIFT);
        var maxY = Math.min(this.__height-1, max[1] >> CELL_SHIFT);
        var cells = this.__cells;

        for (var x = minX; x < maxX; x++) {
            for (var y = minY; y < maxY; y++) {
                var cell = cells[x][y];
                if (cell.occupied) {
                    callback(cells[x][y], self);
                }
            }
        }
    }

}

Map.CELL_SIZE = CELL_SHIFT;
Map.CELL_SHIFT = CELL_SHIFT;

function create(id, data) {
    var tiles = ResourceManager.getResource('tile');
    var map = new WorldMap(id, data.width, data.height);
    map.entities = data.entities;
    var cellData = data.cells;
    for (var i = 0, l = cellData.length; i < l; i++) {
        var c = cellData[i];
        var cell = map.getCell(c[0], c[1]);
        if (cell && c[2]) {
            cell.tile0 = tiles.get(c[2]);
            cell.occupied = true;
        }
        if (cell && c[3]) {
            cell.tile1 = tiles.get(c[3]);
            cell.occupied = true;
        }
    }
    return map;
}

module.exports = {
    create: create
};
