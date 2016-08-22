var EntityManager = require('../../core/EntityManager');
var SpriteBuffer = require('./../../graphics/SpriteBuffer');
var Viewport = require('./../../graphics/Viewport');
var ResourceManager = require('../../core/ResourceManager');

var filter = null;
var spriteBuffer = null;
var tiles = null;

function onSceneLoad(scene) {
    scene.getCompositor().addLayer(200, drawSpriteLayer);
    tiles = ResourceManager.getResource('tile');
    spriteBuffer = SpriteBuffer.createBuffer(0);
    filter = EntityManager.createFilter('graphics.sprites', function(entity) {
        return entity.components.sprite;
    });
}

function onSceneUnload() {
    tiles = null;
    spriteBuffer = null;
    EntityManager.removeFilter(filter);
}

function drawSpriteLayer() {
    spriteBuffer.enable(
        Viewport.getModelViewMatrix(),
        Viewport.getProjectionMatrix()
    );

    filter.each(drawSprite);

    spriteBuffer.flush();
}

function drawSprite(entity) {
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
    SceneStop: onSceneUnload
};
