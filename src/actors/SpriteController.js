var ResourceManager = require('../core/ResourceManager');
var EntityManager = require('../composition/EntityManager');
var TileBuffer = require('../graphics/TileBuffer');
var Color = require('../graphics/Color');

module.exports = function SpriteController(runtime) {
    runtime.addEventListener('SceneUnload', onSceneLoad);
    runtime.addEventListener('SceneUnload', onSceneUnload);
    runtime.addLifecycleHook('Draw', onDraw);

    var _tiles = null;
    var _color = null;
    var _tileBuffer = null;
    var _filter = null;

    function onSceneLoad() {
        _tiles = ResourceManager.getResource('tile');
        _color = Color.create();
        _tileBuffer = TileBuffer.createBuffer(0);
        _filter = EntityManager.createFilter('SpriteRenderer', function(entity) {
            return entity.components.sprite;
        });
    }

    function onDraw(state) {

        _tileBuffer.enable(
            state.model,
            state.projection
        );

        _filter.each(drawSprite);

        _tileBuffer.flush();
    }

    function drawSprite(entity) {
        var sprite = entity.components.sprite;
        var tile = _tiles.get(sprite.tid);
        _tileBuffer.draw(
            entity.position,
            sprite.width,
            sprite.height,
            tile,
            sprite.color
        );
    }

    function onSceneUnload() {
        EntityManager.removeFilter(this.__filter);
    }

};
