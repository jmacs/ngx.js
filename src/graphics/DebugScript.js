const GameClock = require('../core/GameClock');
const Viewport = require('./Viewport.js');
const LineBuilder = require('./LineBuilder.js');
const LineBuffer = require('./LineBuffer.js');
const SpriteBuffer = require('./SpriteBuffer');
const Varchar = require('./Varchar');
const GlyphRenderer = require('./GlyphRenderer');
const Color = require('./Color');
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

function onStageEnter(stage) {
    var gridWidth = ~~(stage.pixelWidth / GRID_SHIFT) + 1;
    var gridHeight = ~~(stage.pixelHeight / GRID_SHIFT) + 1;
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

module.exports = function Debuggers(scene) {
    scene.addEventListener('SceneLoad', onSceneLoad);
    scene.addEventListener('SceneStop', onSceneUnload);
    scene.addEventListener('SceneDraw', onSceneDraw);
};
