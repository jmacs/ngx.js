var ResourceManager = require('../core/ResourceManager');
var SceneManager = require('../core/SceneManager');
var Graphics = require('./Graphics');
var Viewport = require('./Viewport');
var Compositor = require('./Compositor');

// resources
var ShaderResource = require('./ShaderResource');
var TextureResource = require('./TextureResource');
var AnimationResource = require('./AnimationResource');
var TileResource = require('./TileResource');
var GlyphResource = require('./GlyphResource');

function initialize() {
    Graphics.createContext('webgl');

    SceneManager.setCompositor(Compositor);

    Viewport.initialize({width: 1280, height: 720});

    ResourceManager.registerMediaLoaders([
        require('./ShaderLoader')
    ]);

    ResourceManager.registerResources([
        new TextureResource(),
        new AnimationResource(),
        new TileResource(),
        new GlyphResource(),
        new ShaderResource()
    ]);

    ResourceManager.getResource('component').register([
        require('./SpriteComponent'),
        require('./AnimationComponent')
    ]);

    ResourceManager.getResource('script').register([
        require('./../game/scripts/AnimationScript'),
        require('./../game/scripts/SpriteScript'),
        require('./../game/scripts/DebugScript')
    ]);

}

module.exports = {
    initialize: initialize
};
