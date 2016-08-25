const GameClock = require('../../src/core/GameClock');
const Viewport = require('../../src/graphics/Viewport.js');
const LineBuilder = require('../../src/graphics/LineBuilder.js');
const LineBuffer = require('../../src/graphics/MeshBuffer.js');
const SpriteBuffer = require('../../src/graphics/SpriteBuffer');
const Glyphic = require('../../src/graphics/Glyphic');
const GlyphRenderer = require('./../../src/graphics/GlyphRenderer');
const Color = require('../../src/graphics/Color');

const GRID_SHIFT = 6;

var spatialGrid;
var lineBuffer;
var spriteBuffer;
var debugText;
var fpsText;
var lastFps = 0;
var red;

function onSceneLoad(scene) {
    scene.getCompositor().addLayer(100, drawDebugLayer);
    red = new Color(1, 0, 0, 1);
    lineBuffer = LineBuffer.createBuffer(0);
    spriteBuffer = SpriteBuffer.createBuffer(0);
    debugText = Glyphic.parseString('0123456789_0123456789_012');
    fpsText = new Glyphic(2);
}

function onSceneUnload() {
    spatialGrid = null;
    lineBuffer = null;
    spriteBuffer = null;
    debugText = null;
    fpsText = null;
    lastFps = 0;
    red = null;
}

function onMapLoaded(map) {
    spatialGrid = LineBuilder.buildGrid(0, 0,
        map.boundsX >> GRID_SHIFT,
        map.boundsY >> GRID_SHIFT,
        Math.pow(2, GRID_SHIFT)
    );
}

function drawDebugLayer() {

    if (spatialGrid) {
        lineBuffer.enable(
            Viewport.getModelViewMatrix(),
            Viewport.getProjectionMatrix()
        );

        lineBuffer.drawLines(spatialGrid);
        lineBuffer.flush();
    }


    spriteBuffer.enable(
        Viewport.getModelViewMatrix(),
        Viewport.getProjectionMatrix()
    );

    var fps = GameClock.fps();
    if (fps !== lastFps) {
        fpsText.setString(GameClock.fps().toString());
        lastFps = fps
    }

    GlyphRenderer.setGlyphMap(1);
    //GlyphRenderer.setColor(red);
    GlyphRenderer.render(spriteBuffer, 80, 180, debugText);
    GlyphRenderer.render(spriteBuffer, 20, 20, fpsText);

    spriteBuffer.flush();
}

module.exports = {
    name: 'Debuggers',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    MapLoaded: onMapLoaded
};
