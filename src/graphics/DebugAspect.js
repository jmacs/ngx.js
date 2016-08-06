import Aspect from '../core/Aspect';
import GameClock from '../core/GameClock';
import Viewport from './Viewport.js';
import LineBuilder from './LineBuilder.js';
import LineBuffer from './LineBuffer.js';
import SpriteBuffer from './SpriteBuffer';
import Varchar from './Varchar';
import GlyphRenderer from './GlyphRenderer';
import Color from './Color';

var spatialGrid;
var lineBuffer;
var spriteBuffer;
var debugText;
var fpsText;
var lastFps = 0;
var red = new Color(1, 0, 0, 1);
const GRID_SHIFT = 6;

function onStart() {
    lineBuffer = LineBuffer.createBuffer(0);
    spriteBuffer = SpriteBuffer.createBuffer(0);
    debugText = Varchar.parseString('0123456789_0123456789_012');
    fpsText = new Varchar(2);
}

function onStageEnter(stage) {
    var gridWidth = ~~(stage.pixelWidth / GRID_SHIFT) + 1;
    var gridHeight = ~~(stage.pixelHeight / GRID_SHIFT) + 1;
    spatialGrid = LineBuilder.buildGrid(0, 0, 8, 8, Math.pow(2, GRID_SHIFT));
}

function onDraw() {

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

export default Aspect.create({
    id: 'graphics.debugger',
    onStart: onStart,
    onStageEnter: onStageEnter,
    onDraw: onDraw
});

