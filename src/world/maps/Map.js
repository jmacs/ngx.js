var ResourceManager = require('../../core/ResourceManager');
var Cell = require('./Cell');

const CELL_SIZE = 16;
const CELL_SHIFT = 4; // Math.pow(2, 4)

class Map {

    constructor(id, width, height) {
        this.entities = null;
        this.scripts = null;
        this.backgroundColor = 0x0;
        this.__id = id;
        this.__width = width;
        this.__height = height;
        this.__boundsX = width * CELL_SIZE;
        this.__boundsY = height * CELL_SIZE;
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

    getCell(x, y) {
        return this.__cells[x][y];
    }

    setCell(x, y, tile0, tile1) {
        var cell = this.__cells[x][y];
        cell.tile0 = tile0 || null;
        cell.tile1 = tile1 || null;
        cell.nil = false;
    }

    selectCells(min, max, callback) {
        var minX = min[0] >> CELL_SHIFT;
        var minY = min[1] >> CELL_SHIFT;
        var maxX = Math.min(this.__boundsX, max[0] >> CELL_SHIFT);
        var maxY = Math.min(this.__boundsY, max[1] >> CELL_SHIFT);
        var cells = this.__cells;

        for (var x = minX; x < maxX; x++) {
            for (var y = minY; y < maxY; y++) {
                var cell = cells[x][y];
                if (cell.nil === false) {
                    callback(cells[x][y]);
                }
            }
        }
    }

}

Map.CELL_SIZE = CELL_SHIFT;
Map.CELL_SHIFT = CELL_SHIFT;

function create(id, data) {
    var tiles = ResourceManager.getResource('tile');
    var map = new Map(id, data.width, data.height);
    map.entities = data.entities;
    var cellData = data.cells;
    for (var i = 0, l = cellData.length; i < l; i++) {
        var c = cellData[i];
        var tile0 = tiles.get(c[2]);
        var tile1 = tiles.get(c[3]);
        map.setCell(c[0], c[1], tile0, tile1);
    }
    return map;
}

module.exports = {
    create: create
};
