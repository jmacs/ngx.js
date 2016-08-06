import EntityStore from '../core/EntityStore';
import SpriteBuffer from './SpriteBuffer';
import Viewport from './Viewport';
import Tileset from './Tileset';
import Aspect from '../core/Aspect';

const ASPECT_ID = 'graphics.sprites';

var spriteBuffer = null;

function onStart() {
    spriteBuffer = SpriteBuffer.createBuffer(0);
    EntityStore.addFilter(ASPECT_ID, filterEntity);
}

function onStop() {
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
}

export default Aspect.create({
    id: ASPECT_ID,
    onStart: onStart,
    onStop: onStop,
    onDraw: onDraw
});
