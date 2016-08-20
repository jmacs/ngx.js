var EntityManager = require('../core/EntityManager');
var SpriteBuffer = require('./SpriteBuffer');
var Viewport = require('./Viewport2D');
var ResourceManager = require('../core/ResourceManager');

const FILTER = 'graphics.sprites';

var spriteBuffer = null;
var tiles = null;

function onSceneLoad() {
    tiles = ResourceManager.getResource('tile');
    spriteBuffer = SpriteBuffer.createBuffer(0);
    EntityManager.addFilter(FILTER, filterEntity);
}

function onSceneUnload() {
    tiles = null;
    spriteBuffer = null;
    EntityManager.removeFilter(FILTER);
}

function filterEntity(entity) {
    return entity.components.sprite;
}

function onSceneDraw() {
    spriteBuffer.enable(
        Viewport.getModelViewMatrix(),
        Viewport.getProjectionMatrix()
    );

    EntityManager.forEach(FILTER, renderSprite);

    spriteBuffer.flush();
}

function renderSprite(entity) {
    var sprite = entity.components.sprite;
    var tile = tiles.get(sprite.tid);
    spriteBuffer.draw(
        entity.position,
        sprite.width,
        sprite.height,
        tile,
        sprite.color
    );
}

module.exports = {
    name: 'Sprites',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    SceneDraw: onSceneDraw
};
