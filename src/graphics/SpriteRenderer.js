var ResourceManager = require('../core/ResourceManager');
var EntityManager = require('../core/EntityManager');
var EntityFilter = require('../core/EntityFilter');
var SpriteBuffer = require('./SpriteBuffer');
var Renderer = require('./Renderer');

class SpriteRenderer extends Renderer {

    constructor(camera) {
        super();
        this.__camera = camera;
        this.__tiles = ResourceManager.getResource('tile');
        this.__spriteBuffer = SpriteBuffer.createBuffer(0);
        this.__filter = EntityManager.createFilter('SpriteRenderer', function(entity) {
            return entity.components.sprite;
        });
    }

    draw() {
        var camera = this.__camera;
        var buffer = this.__spriteBuffer;

        buffer.enable(
            camera.worldMatrix,
            camera.projectionMatrix
        );

        this.__filter.each(this.__drawSprite, this);

        buffer.flush();
    }

    __drawSprite(entity, self) {
        var sprite = entity.components.sprite;
        var tile = self.__tiles.get(sprite.tid);
        self.__spriteBuffer.draw(
            entity.position,
            sprite.width,
            sprite.height,
            tile,
            sprite.color
        );
    }

    dispose() {
        EntityManager.removeFilter(this.__filter);
        this.__tiles = null;
        this.__spriteBuffer = null;
        this.__camera = null;
    }

}

module.exports = SpriteRenderer;
