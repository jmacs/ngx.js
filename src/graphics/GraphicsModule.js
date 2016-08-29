var ResourceManager = require('../core/ResourceManager');
var GraphicsManager = require('./GraphicsManager');

// resources
var ShaderResource = require('./ShaderResource');
var TextureResource = require('./TextureResource');
var AnimationResource = require('./AnimationResource');
var TileResource = require('./TileResource');
var GlyphResource = require('./GlyphMapResource');
var RendererResource = require('./RendererResource');

function initialize() {

    GraphicsManager.initialize();

    ResourceManager.registerMediaLoaders([
        require('./ShaderLoader')
    ]);

    ResourceManager.registerResources([
        new TextureResource(),
        new AnimationResource(),
        new TileResource(),
        new GlyphResource(),
        new ShaderResource(),
        new RendererResource()
    ]);

    ResourceManager.getResource('component').register([
        require('./SpriteComponent'),
        require('./AnimationComponent')
    ]);

    ResourceManager.getResource('script').register([
        require('./../game/scripts/Animations')
    ]);

    ResourceManager.getResource('renderer').register([
        require('./CameraRenderer'),
        require('./SpriteRenderer')
    ]);

}

module.exports = {
    initialize: initialize
};
