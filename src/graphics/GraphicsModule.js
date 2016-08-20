var GameClock = require('../core/GameClock');
var ResourceManager = require('../core/ResourceManager');
var SceneManager = require('../core/SceneManager');
var Graphics = require('./Graphics');
var Viewport = require('./Viewport2D');

// resources
var ShaderResource = require('./ShaderResource');
var TextureResource = require('./TextureResource');
var AnimationResource = require('./AnimationResource');
var TileResource = require('./TileResource');
var GlyphResource = require('./GlyphResource');

function initialize() {
    Graphics.createContext('webgl');

    SceneManager.onClearScreen(Graphics.clear);

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
        require('./AnimationScript'),
        require('./SpriteScript'),
        require('./../game/scripts/DebugScript')
    ]);

}

module.exports = {
    initialize: initialize
};
