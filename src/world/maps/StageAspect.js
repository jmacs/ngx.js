import Aspect from '../../core/Aspect';
import SpriteBuffer from '../../graphics/SpriteBuffer';
import Viewport from '../../graphics/Viewport';

var aspect = Aspect.create('world.stage');

var _spriteBuffer = null;
var _stage = null;

aspect.onInitialize = function() {
    _spriteBuffer = SpriteBuffer.createBuffer(0);
};

aspect.onStageEnter = function(stage) {
    _stage = stage;
};

aspect.onUpdate = function() {
    if (!_stage) return;
    var i, l;

    _spriteBuffer.enable(
        Viewport.getModelViewMatrix(),
        Viewport.getProjectionMatrix()
    );

    for (i = 0, l = _stage.__layer0.length; i < l; i++) {
        var cell = _stage.__layer0[i];
        _spriteBuffer.draw(
            cell.position,
            _stage.cellSize,
            _stage.cellSize,
            cell.tile,
            _stage.__color
        );
    }
};