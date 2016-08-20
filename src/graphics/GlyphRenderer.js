var SpriteBuffer = require('./SpriteBuffer');
var ResourceManager = require('../core/ResourceManager');
var Color = require('./Color');

const NULL_CHAR = 0;
const NEW_LINE = 10;

var glyphMap;
var color = new Color();
var marginPx = 4;
var lineHeightPx = 2;
var glyphHeightPx = 16;
var glyphWidthPx = 16;


function setGlyphMap(id) {
    glyphMap = ResourceManager.get('glyph', id);
}

function setColor(glyphColor) {
    color = glyphColor;
}

function setGlyphSize(glyphWidth, glyphHeight) {
    glyphWidthPx = glyphWidth;
    glyphHeightPx = glyphHeight;
}

function setSpacing(margin, lineHeight) {
    marginPx = margin;
    lineHeightPx = lineHeight;
}

function render(spriteBuffer, x, y, glyphic) {
    if (!glyphMap) return;

    var pos = [x, y];
    var line = 0;
    for (var i = 0, l = glyphic.length; i < l; i++) {
        var code = glyphic.indexOf(i);
        if (code === NULL_CHAR) break;

        if (code === NEW_LINE) {
            line++;
            pos[1] = (line * lineHeightPx) + marginPx;
            continue;
        }

        var tile = glyphMap.tiles(code);
        if (tile === null) continue;

        pos[0] = i * glyphWidthPx + marginPx + x;
        spriteBuffer.draw(pos, glyphWidthPx, glyphHeightPx, tile, color);
    }
}

module.exports = {
    setColor: setColor,
    setGlyphMap: setGlyphMap,
    setGlyphSize: setGlyphSize,
    setSpacing: setSpacing,
    render: render
};
