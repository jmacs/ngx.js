var TextureMap = require('../../src/graphics/TextureMap');

describe('graphics/TextureMap', function() {

    it('should ', function() {
        var texmap = new TextureMap();
        texmap.map(1024, 512, 0, 0, 1024, 512);
        assert.equal(0, texmap.x1);
    });

});