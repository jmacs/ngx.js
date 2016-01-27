import SpriteBuffer from './SpriteBuffer';
import Viewport from './Viewport';
import Tileset from './Tileset';
import Aspect from '../core/Aspect';
import Arrays from '../core/Arrays';

var aspect = Aspect.create('ngx.sprites');

var entities = [];
var spriteBuffer = null;

aspect.onInitialize = function() {
    spriteBuffer = SpriteBuffer.createBuffer(0);
};

aspect.onStageExit = function() {
    entities.length = 0;
};

aspect.onEntityEnter = function(entity) {
    if (entity.sprite) {
        entities.push(entity);
    }
};

aspect.onEntityExit = function(entity) {
    if (entity.sprite) {
        Arrays.removeValue(entities, entity);
    }
};

aspect.onUpdate = function() {

    spriteBuffer.enable(
        Viewport.getModelViewMatrix(),
        Viewport.getProjectionMatrix()
    );

    for (var i = 0, len = entities.length; i < len; i++) {
        var entity = entities[i];
        var sprite = entity.sprite;
        var tile = Tileset.get(sprite.tid);
        spriteBuffer.draw(
            entity.position,
            sprite.width,
            sprite.height,
            tile,
            sprite.color
        );
    }

    spriteBuffer.flush();
};