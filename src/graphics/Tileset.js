var Tile = require('./Tile');

var tiles = Object.create(null);

function add(options) {
    var tex = options.tex;
    var height = options.height;
    var width = options.width;
    var length = options.tiles.length;

    for (var i = 0; i < length; i++) {
        var item = options.tiles[i];
        var tid = item.tid;
        var rect = item.rect;

        if (tiles[tid]) {
            console.error('duplicate tile id "%s" in "%s"', tid, options.name);
            continue;
        }

        if (!rect || rect.length !== 4) {
            console.error('invalid tile rect! "%s" in "%s"', tid, options.name);
            continue;
        }

        var tile = new Tile(tid, tex);
        tile.mapTexture(
            width,
            height,
            rect[0],
            rect[1],
            rect[2],
            rect[3]
        );

        tiles[tid] = tile;
    }
}

function get(id) {
    return tiles[id] || tiles[0];
}

module.exports = {
    get: get,
    add: add
};