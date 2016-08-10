var GameClock = require('../core/GameClock');
var ResourceManager = require('../core/ResourceManager');
var Scene = require('../core/Scene');
var Entity = require('../core/Entity');
var Graphics = require('./Graphics');
var Viewport = require('./Viewport');

// resources
var ShaderResource = require('./ShaderResource');
var TextureResource = require('./TextureResource');
var AnimationResource = require('./AnimationResource');
var TileResource = require('./TileResource');
var GlyphResource = require('./GlyphResource');

GameClock.addEventListener('GameClockLoaded', function() {
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

    Entity.registerComponents([
        require('./SpriteComponent'),
        require('./AnimationComponent')
    ]);

    Scene.registerAspects([
        require('./AnimationAspect'),
        require('./SpriteAspect'),
        require('./DebugAspect'),
        require('./../world/camera/CameraAspect')
    ]);

    Scene.setViewport(Viewport);
});
