import Tile from './Tile';

var cache = Object.create(null);

class GlyphMap {

    constructor(options) {
        this.__id = options.id;
        this.__tex = options.tex;
        this.__tiles = Object.create(null);

        var imageWidth = options.width;
        var imageHeight = options.height;
        var glyphWidth = options.glyphWidth;
        var glyphHeight = options.glyphHeight;
        var map = options.map;
        var codes = Object.keys(map);

        for (var i = 0, l = codes.length; i < l; i++) {
            var code = parseInt(codes[i]);
            var cell = map[code];
            var tile = new Tile(code, this.__tex);
            var x = cell[0] * glyphWidth;
            var y = cell[1] * glyphHeight;
            tile.mapTexture(
                imageWidth,
                imageHeight,
                x,
                y,
                glyphWidth,
                glyphHeight
            );
            this.__tiles[code] = tile;
        }
    }

    get id() {
        return this.__id;
    }

    get tex() {
        return this.__tex;
    }

    tiles(id) {
        return this.__tiles[id] || null;
    }
}

function create(options) {
    var map = new GlyphMap(options);
    cache[map.id] = map;
    return map;
}

function get(id) {
    return cache[id] || null;
}

export default {
    create: create,
    get: get
}
