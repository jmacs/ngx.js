import Graphics from './Graphics.js';

var tiles = Object.create(null);

function load(options) {
    var tex = options.tex;
    var height = options.height;
    var width = options.width;

    var length = options.tiles.length;
    for(var i = 0; i < length; i++) {
        var item = options.tiles[i];
        var tid = item.tid;

        if(tiles[tid]) {
            console.warn('duplicate tile tid "%s" in "%s"', id, src);
            continue;
        }

        var tile = new Tile(tid, tex);
        tile.type = item.type;
        tile.prop = item.prop;
        tile.mapTexture(
            width, height,
            item.x, item.y,
            item.w, item.h
        );

        tiles[tid] = tile;
    }
}

function get(tid) {
    return tiles[tid] || tiles[0];
}

class Tile {

    constructor(id, tex) {
        this.id = id || 0;
        this.type = 0;
        this.prop = 0;

        this.tex = tex || 0;
        // BL 0,0 -> TR 0,1
        this.x1 = 0.0;
        this.y1 = 1.0;
        // TR 0,1 -> BL 0,0
        this.x2 = 0.0;
        this.y2 = 0.0;
        // BR 1,0 -> TR 1,1
        this.x3 = 1.0;
        this.y3 = 1.0;
        // TR 1,1 -> BR 1,0
        this.x4 = 1.0;
        this.y4 = 0.0;
    }

    mapTexture(texWidth, texHeight, destX, destY, destWidth, destHeight) {
        var x0 = destX / texWidth;
        var y0 = destY / texHeight;
        var x1 = (destX + destWidth) / texWidth;
        var y1 = (destY + destHeight) / texHeight;

        // BL 0,0 -> TL 0,1
        this.x1 = x0;
        this.y1 = y1;

        // TL 0,1 -> BL 0,0
        this.x2 = x0;
        this.y2 = y0;

        // BR 1,0 -> TR 1,1
        this.x3 = x1;
        this.y3 = y1;

        // TR 1,1 -> BR 1,0
        this.x4 = x1;
        this.y4 = y0;
    }

}

export default {
    get: get,
    load: load
};