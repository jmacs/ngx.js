var EntityStore = require('../core/EntityStore');
var SpriteBuffer = require('./SpriteBuffer');
var Viewport = require('./Viewport');
var ResourceManager = require('../core/ResourceManager');
var Aspect = require('../core/Aspect');

const ASPECT_ID = 'graphics.sprites';

var spriteBuffer = null;
var tiles = null;

function onStart() {
    tiles = ResourceManager.getResource('tile');
    spriteBuffer = SpriteBuffer.createBuffer(0);
    EntityStore.addFilter(ASPECT_ID, filterEntity);
}

function onStop() {
    tiles = null;
    spriteBuffer = null;
    EntityStore.removeFilter(ASPECT_ID);
}

function filterEntity(entity) {
    return entity.sprite;
}

function onDraw() {

    spriteBuffer.enable(
        Viewport.getModelViewMatrix(),
        Viewport.getProjectionMatrix()
    );

    var entities = EntityStore.getCache(ASPECT_ID);

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

module.exports = Aspect.create({
    id: ASPECT_ID,
    onStart: onStart,
    onStop: onStop,
    onDraw: onDraw
});
