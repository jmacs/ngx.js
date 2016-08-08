var Assets = require('../core/Assets');
var Tileset = require('../graphics/Tileset');

const SOLID = 1;
const SOLID_ANIMATED = 2;

var walls = Assets.createCache('walls');

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

function load(asset) {
    return Assets.httpGetJSON(asset.url).then(add);
}

module.exports = {
    id: 'walls',
    load: load,
    add: add,
    get: get
};