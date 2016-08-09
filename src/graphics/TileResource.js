var Tile = require('./Tile');
var Resource = require('../core/Resource');

class TileResource extends Resource {

    getMediaType() {
        return 'json';
    }

    getResourceType() {
        return 'tile';
    }

    onAssetDownloaded(options, asset) {
        var tex = options.tex;
        var height = options.height;
        var width = options.width;
        var length = options.tiles.length;

        for (var i = 0; i < length; i++) {
            var item = options.tiles[i];
            var tid = item.tid;
            var rect = item.rect;

            if (this.__cache[tid]) {
                console.error('duplicate tile id "%s" in "%s"', tid, options.name);
                continue;
            }

            if (!rect || rect.length !== 4) {
                console.error('invalid tile rect! "%s" in "%s"', tid, options.name);
                continue;
            }

            var tile = new Tile(tid, tex);
            tile.set = item.set;
            tile.mat = item.mat;

            tile.mapTexture(
                width,
                height,
                rect[0],
                rect[1],
                rect[2],
                rect[3]
            );

            this.__cache[tid] = tile;
        }
    }

}

module.exports = TileResource;