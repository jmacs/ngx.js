import SpriteBuffer from '../../graphics/SpriteBuffer.js';
import Graphics from '../../graphics/Graphics.js';
import Viewport from '../../graphics/Viewport.js';
import Tileset from '../../graphics/Tileset.js';
import Color from '../../graphics/Color.js';
import System from '../../core/System.js';
import Entity from '../../core/Entity.js';
import Arrays from '../../core/Arrays.js';

const RENDER_ID = 'sprite';
const gl = Graphics.getContext();
const CLEAR_BIT = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
const clearColor = Color.fromHex(0x75ffff);

var context = 0;
var entities = [];
var spriteBuffer = null;

function onInitialize() {
    spriteBuffer = SpriteBuffer.createBuffer(0);
    Graphics.setClearColor(clearColor);
    gl.enable(gl.BLEND);
}

function render() {
    gl.clear(CLEAR_BIT);

    Viewport.transform();

    spriteBuffer.enable(
        Viewport.getModelViewMatrix(),
        Viewport.getProjectionMatrix()
    );

    for (var i = 0, len = entities.length; i < len; i++) {
        var entity = entities[i];
        var sprite = entity.sprite;
        var position = entity.position;
        var tile = Tileset.get(sprite.tileId);
        spriteBuffer.draw(
            position.xy,
            sprite.width,
            sprite.height,
            tile,
            sprite.color
        );
    }

    spriteBuffer.flush();
}

function onComponentAttach(entity) {
    if(entity.context !== context) return;
    if(entity.position && entity.sprite) {
        entities[entities.length] = entity;
    }
}

function onComponentDetach(entity) {
    Arrays.removeValue(entities, entity);
}

function onVoidTransition(cx) {
    System.activateRenderer(RENDER_ID);
    entities.length = 0;
    context = cx;
}

function onWorldTransition(cx) {
    entities.length = 0;
    context = cx;
    Entity.forEach(onComponentAttach);
}

System.onInitialize(onInitialize);
System.registerRenderer(RENDER_ID, render, 0);

System.onTransition(NGX.CX_VOID, onVoidTransition);
System.onTransition(NGX.CX_WORLD, onWorldTransition);

Entity.linkEvents('sprite', onComponentAttach, onComponentDetach);
Entity.linkEvents('position', onComponentAttach, onComponentDetach);