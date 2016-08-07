class Tile {

    constructor(tid, tex) {
        this.tid = tid || 0;
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

module.exports = Tile;