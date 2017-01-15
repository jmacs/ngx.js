const ResourceManager = require('../resources/ResourceManager');
const EntityManager = require('../composition/EntityManager');
const TileBuffer = require('../graphics/TileBuffer');

module.exports = function SpriteRenderer(camera) {
    var _tiles = ResourceManager.getResource('tile');
    var _buffer = TileBuffer.createBuffer(0);
    var _filter = EntityManager.createFilter('Sprites', function(entity) {
        return entity.components.sprite;
    });

    camera.onDrawLayer1(function () {
        _buffer.enable(
            camera.__worldMatrix,
            camera.__projectionMatrix
        );

        _filter.each(drawSprite);

        _buffer.flush();
    });

    function drawSprite(entity) {
        var sprite = entity.components.sprite;
        var tile = _tiles.get(sprite.tid);
        _buffer.draw(
            entity.position,
            sprite.width,
            sprite.height,
            tile,
            sprite.color
        );
    }

    camera.onDestroy(function () {
        EntityManager.removeFilter(this.__filter);
    });

};
