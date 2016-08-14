const GameClock = require('../../core/GameClock');
const Viewport = require('../../graphics/Viewport.js');
const LineBuilder = require('../../graphics/LineBuilder.js');
const LineBuffer = require('../../graphics/LineBuffer.js');
const SpriteBuffer = require('../../graphics/SpriteBuffer');
const Varchar = require('../../graphics/Varchar');
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
    red = new Color(1, 0, 0, 1);
    lineBuffer = LineBuffer.createBuffer(0);
    spriteBuffer = SpriteBuffer.createBuffer(0);
    debugText = Varchar.parseString('0123456789_0123456789_012');
    fpsText = new Varchar(2);
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
    var gridWidth = ~~(map.boundsX / GRID_SHIFT) + 1;
    var gridHeight = ~~(map.boundsY / GRID_SHIFT) + 1;
    spatialGrid = LineBuilder.buildGrid(0, 0, 8, 8, Math.pow(2, GRID_SHIFT));
}

function onSceneDraw() {

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
    GlyphRenderer.render(spriteBuffer, 0, 0, fpsText);

    spriteBuffer.flush();
}

module.exports = {
    name: 'Debuggers',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    SceneDraw: onSceneDraw,
    MapLoaded: onMapLoaded
};
