const GameClock = require('../../core/GameClock');
const SceneManager = require('../../core/SceneManager');
const Viewport = require('../../graphics/Viewport2D.js');
const LineBuilder = require('../../graphics/LineBuilder.js');
const LineBuffer = require('../../graphics/LineBuffer.js');
const SpriteBuffer = require('../../graphics/SpriteBuffer');
const Glyphic = require('../../graphics/Glyphic');
const GlyphRenderer = require('./../../graphics/GlyphRenderer');
const Color = require('../../graphics/Color');

const GRID_SHIFT = 6;

var spatialGrid;
var lineBuffer;
var spriteBuffer;
var debugText;
var fpsText;
var lastFps = 0;
var red;

function onSceneLoad() {
    SceneManager.addEventListener('MapLoaded', onMapLoaded);
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

function onSceneDraw() {

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
    SceneDraw: onSceneDraw,
    MapLoaded: onMapLoaded
};
