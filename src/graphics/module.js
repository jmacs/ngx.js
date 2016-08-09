var GameClock = require('../core/GameClock');
var ResourceManager = require('../core/ResourceManager');
var Scene = require('../core/Scene');
var Entity = require('../core/Entity');
var Graphics = require('./Graphics');
var Viewport = require('./Viewport');

// resources
var ProgramResource = require('./ProgramResource');
var ShaderResource = require('./ShaderResource');
var TextureResource = require('./TextureResource');
var AnimationResource = require('./AnimationResource');
var TileResource = require('./TileResource');
var GlyphResource = require('./GlyphResource');

GameClock.addEventListener('GameClockLoaded', function() {
    Graphics.createContext('webgl');

    Viewport.initialize({width: 1280, height: 720});

    ResourceManager.registerResources([
        new ShaderResource(),
        new TextureResource(),
        new AnimationResource(),
        new TileResource(),
        new GlyphResource()
    ]);

    Entity.registerComponents([
        require('./SpriteComponent'),
        require('./AnimationComponent')
    ]);

    Scene.registerAspects([
        require('./AnimationAspect'),
        require('./SpriteAspect'),
        require('./DebugAspect'),
        require('./../world/CameraAspect')
    ]);

    Scene.setViewport(Viewport);
});
