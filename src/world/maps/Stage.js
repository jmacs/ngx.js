import Walls from './Walls';
import Cell from './Cell';
import Color from '../../graphics/Color';

const CELL_SHIFT = 4; // 16x16
const CELL_SIZE = Math.pow(2, CELL_SHIFT);

class Stage {

    constructor(id) {
        this.__id = id;
        this.__width = 0;
        this.__height = 0;
        this.__color = new Color();
        this.__collisionMap = [];
        this.__layer0 = [];
        this.__manifest = null;
    }

    get id() {
        return this.__id;
    }

    get manifest() {
        return this.__manifest;
    }

    get pixelWidth() {
        return this.__width * CELL_SIZE;
    }

    get pixelHeight() {
        return this.__height * CELL_SIZE;
    }

    get cellSize() {
        return CELL_SIZE;
    }

    get shift() {
        return CELL_SHIFT;
    }

    build(data) {
        this.__width = data.width;
        this.__height = data.height;
        this.__collisionMap = [];
        this.__layer0 = [];
        this.__manifest = data.manifest;

        // collision map
        for (var x = 0; x < this.__width; x++) {
            var column = [];
            for (var y = 0; y < this.__height; y++) {
                column.push(0);
            }
            this.__collisionMap[x] = column;
        }

        var layer0 = data.layer0;
        for (var i = 0, l = layer0.length; i < l; i++) {
            var cell = layer0[i];
            this.createTileInLayer0(cell[0], cell[1], cell[2]);
        }
    }

    createTileInLayer0(x, y, wallId) {
        var wall = Walls.get(wallId);
        if (!wall)  return;

        this.__collisionMap[x][y] = wall.material;

        var cell = new Cell();
        cell.position[0] = x * CELL_SIZE;
        cell.position[1] = y * CELL_SIZE;
        cell.tile = wall.tiles[0];
        cell.x = x;
        cell.y = y;

        this.__layer0.push(cell);
    }

}

export default Stage;