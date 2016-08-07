var Tileset = require('../graphics/Tileset');

var walls = Object.create(null);

class Wall {
    constructor(options) {
        this.id = options.id;
        this.material = options.material;
        this.tiles = [];
        this.time = options.time || 0;
        this.frames = options.tiles.length;

        for (var i = 0, l = options.tiles; i < l; i++) {
            var tid = options.tiles[i];
            this.tiles.push(Tileset.get(tid));
        }
    }
}

function add(options) {
    for (var i = 0, l = options.length; i < l; i++) {
        var wall = new Wall(options[i]);
        walls[wall.id] = wall;
    }
}

function get(id) {
    return walls[id] || null;
}

module.exports = {
    add: add,
    get: get
};