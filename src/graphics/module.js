var GameClock = require('../core/GameClock');
var Scene = require('../core/Scene');
var Entity = require('../core/Entity');
var Assets = require('../core/Assets');
var Graphics = require('./Graphics');
var Viewport = require('./Viewport');

// shaders
var SpriteVert = require('./shaders/sprite.vert.glsl');
var SpriteFrag = require('./shaders/sprite.frag.glsl');
var MeshVert = require('./shaders/mesh.vert.glsl');
var MeshFrag = require('./shaders/mesh.frag.glsl');

// resources
var ImageLoader = require('./ImageLoader');
var GlyphLoader = require('./GlyphLoader');

GameClock.addEventListener('GameClockLoaded', function() {
    Graphics.createProgram(0, SpriteVert, SpriteFrag);
    Graphics.createProgram(1, MeshVert, MeshFrag);

    Viewport.initialize({width: 1280, height: 720});

    Entity.registerComponents([
        require('./SpriteComponent'),
        require('./AnimationComponent')
    ]);

    Assets.registerResources([
        ImageLoader,
        require('./Tileset'),
        require('./Animation'),
        GlyphLoader
    ]);

    Scene.registerAspects([
        require('./AnimationAspect'),
        require('./SpriteAspect'),
        require('./DebugAspect'),
        require('./../world/CameraAspect')
    ]);

    Scene.setViewport(Viewport);
});