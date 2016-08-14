var EntityManager = require('../core/EntityManager');
var SpriteBuffer = require('./SpriteBuffer');
var Viewport = require('./Viewport');
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
    return entity.sprite;
}

function onSceneDraw() {

    spriteBuffer.enable(
        Viewport.getModelViewMatrix(),
        Viewport.getProjectionMatrix()
    );

    var entities = EntityManager.getCache(FILTER);

    for (var i = 0, len = entities.length; i < len; i++) {
        var entity = entities[i];
        var sprite = entity.sprite;
        var tile = tiles.get(sprite.tid);
        spriteBuffer.draw(
            entity.position,
            sprite.width,
            sprite.height,
            tile,
            sprite.color
        );
    }

    spriteBuffer.flush();
}

module.exports = {
    name: 'Sprites',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    SceneDraw: onSceneDraw
};
