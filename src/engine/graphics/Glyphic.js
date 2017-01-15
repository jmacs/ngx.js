var ResourceManager = require('../resources/ResourceManager');
var GlyphString = require('./GlyphString');
var Color = require('./Color');

class Glyphic {

    constructor(glyphMapName, length) {
        this.__x = 0;
        this.__y = 0;
        this.__lineHeight = 2;
        // todo: font kerning and font size
        this.__characterSpace = 4;
        this.__characterHeight = 16;
        this.__characterWidth = 16;
        this.__color = Color.create();
        this.__glyphmap = ResourceManager.get('glyphmap', glyphMapName);
        this.__length = length;
        this.__string = GlyphString.create(length);
        this.__dirty = true;
        this.__cache = [];
        this.__length = length;
        for (var i = 0; i < length; i++) {
            this.__cache.push({
                position: [0.0,0.0],
                tile: null,
                draw: false
            });
        }
    }

    get characterWidth() {
        return this.__characterWidth;
    }

    set characterWidth(value) {
        this.__characterWidth = value;
        this.__dirty = true;
    }

    get characterHeight() {
        return this.__characterHeight;
    }

    set characterHeight(value) {
        this.__characterHeight = value;
        this.__dirty = true;
    }

    get characterSpace() {
        return this.__characterSpace;
    }

    set characterSpace(value) {
        this.__characterSpace = value;
        this.__dirty = true;
    }

    get lineHeight() {
        return this.__lineHeight;
    }

    set lineHeight(value) {
        this.__lineHeight = value;
        this.__dirty = true;
    }

    setPosition(x, y) {
        this.__x = ~~x;
        this.__y = ~~y;
        this.__dirty = true;
    }
    setGlyphMap(glyphMapName) {
        this.__glyphmap = ResourceManager.get('glyphmap', glyphMapName);
        this.__dirty = true;
    }

    setColor(r, g, b, a) {
        this.__color[0] = r;
        this.__color[1] = g;
        this.__color[2] = b;
        this.__color[3] = a;
        this.__dirty = true;
    }

    insertString(index, value) {
        GlyphString.insertString(this.__string, index, value);
        this.__dirty = true;
    }

    setString(value) {
        GlyphString.setString(this.__string, value);
        this.__dirty = true;
    }

    clear() {
        GlyphString.clear(this.__string);
        this.__dirty = true;
    }

    toString() {
        return GlyphString.toString(this.__string);
    }

    build() {
        const NULL_CHAR = 0;
        const NEW_LINE = 10;

        var lineNumber = 0;
        var charX = this.__x;
        var charY = this.__y;

        for (var i = 0, l = this.__length; i < l; i++) {
            var cached = this.__cache[i];
            var code = this.__string[i];
            var tile = this.__glyphmap.tiles(code);

            if (tile === null)  {
                cached.draw = false;
                continue;
            }

            if (code === NULL_CHAR) {
                cached.draw = false;
                break;
            }

            if (code === NEW_LINE) {
                lineNumber++;
                charY = (lineNumber * this.__lineHeight) + this.__characterSpace;
                this.__cache[i].draw = false;
                continue;
            }

            charX = i * this.__characterWidth + this.__characterSpace + this.__x;

            cached.position[0] = charX;
            cached.position[1] = charY;
            cached.tile = tile;
            cached.draw = true;
        }

        this.__dirty = false;
    }

    draw(spriteBuffer) {
        if (this.__dirty) {
            this.build();
        }
        for (var i = 0, l = this.__length; i < l; i++) {
            var item = this.__cache[i];
            spriteBuffer.draw(
                item.position,
                this.__characterWidth,
                this.__characterHeight,
                item.tile,
                this.__color
            );
        }
    }

}

module.exports = Glyphic;